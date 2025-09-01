---
title: "Gentoo 安裝完整筆記（繁體中文，新手友善）— OpenRC / systemd、KDE / GNOME、SSH 可選、Btrfs 子卷"
date: 2025-09-01
tags: ["Gentoo","Linux","OpenRC","systemd","KDE","GNOME","SSH","Wayland","Btrfs","UEFI"]
categories: ["Linux筆記"]
draft: false
toc: true
---

> Powered by Hugo & PaperMod  
> 本文一步步帶你從 LiveCD 到桌面，所有指令可直接複製使用。每節末尾附 **💡 對於**（常見問題 / 提示）。

---

# 💻 我的電腦配置（安裝背景）
- **CPU**：AMD Ryzen 9 7950X3D（16C/32T）
- **主機板**：ASUS ROG STRIX X670E-A GAMING WIFI
- **記憶體**：64GB DDR5 6400MHz
- **顯示卡**：NVIDIA GeForce RTX 4080 SUPER（主要）＋ AMD Radeon iGPU
- **儲存**：NVMe SSD
- **螢幕**：Samsung Odyssey G9 49" 5120×1440
- **網路**：Aussie Broadband 1000/50Mbps，Wi-Fi 7 Router BE9300（家用公網 IP）
- **雙系統**：Windows 11 ＋ Gentoo
- **輔助機**：MacBook Air M2（16GB / 512GB）

---

# 0. 開機與網路（LiveCD）

## 0.1 確認 UEFI
```bash
test -d /sys/firmware/efi && echo "UEFI OK" || echo "Not UEFI"
```

## 0.2 有線網路
```bash
ip a
dhcpcd eno1          # 如未自動拿到 IP，再執行
ping -c 3 gentoo.org # 測試連線
```

## 0.3 Wi-Fi（擇一）
先找無線卡名稱：
```bash
iw dev   # 例如顯示 wlp9s0
```

**方法 A：iwctl（如果 LiveCD 內建）**
```bash
iwctl
device list
station wlp9s0 scan
station wlp9s0 get-networks
station wlp9s0 connect "你的SSID"
```

**方法 B：wpa_supplicant（通用）**
```bash
wpa_passphrase "你的SSID" "你的密碼" > /etc/wpa_supplicant/wpa_supplicant.conf
wpa_supplicant -B -i wlp9s0 -c /etc/wpa_supplicant/wpa_supplicant.conf
dhcpcd wlp9s0
ping -c 3 gentoo.org
```

**0.4（可選）LiveCD 開啟 SSH（安裝過程遠端操作）**
LiveCD 內含 `sshd`。
```bash
passwd                          # 設定 root 密碼
nano /etc/ssh/sshd_config
# 加入或確認：
PermitRootLogin yes
PasswordAuthentication yes
# 啟動（依 LiveCD init 差異擇一）
/etc/init.d/sshd start          # OpenRC LiveCD
systemctl start sshd            # systemd LiveCD
# 他機連線
ssh root@<LiveCD 的 IP>
```

> 💡 **對於**  
> - 若 WPA3 連不上，將 AP 暫時改為 **WPA2-only**；裝好系統再升級 `wpa_supplicant` 後改回。  
> - LiveCD 多為 OpenRC；少數衍生 Live 僅供 systemd 參考啟動方式。

---

# 1. 磁碟分割（GPT）

## 1.1 檢視磁碟
```bash
lsblk -o NAME,SIZE,TYPE,MOUNTPOINT
```

## 1.2 以 `cfdisk` 建立分割（例：/dev/nvme0n1）
```bash
cfdisk /dev/nvme0n1
```
建議（可調整）：

| 分割區 | 建議大小 | 類型 / 檔案系統 | 掛載點 |
|---|---:|---|---|
| nvme0n1p1 | 512MB | EFI System（FAT32） | /efi |
| nvme0n1p2 | 1GB   | Linux filesystem（ext4） | /boot |
| nvme0n1p3 | 100GB | Linux filesystem（Btrfs） | / |
| nvme0n1p4 | 剩餘 | Linux filesystem（Btrfs） | /home |

> 💡 **對於**  
> - 若原有分割表需清空：`wipefs -a /dev/nvme0n1`（⚠️ 破壞性）。  
> - 雙系統請小心別動到 Windows/Recovery/ESP 分割。

---

# 2. 建檔案系統與子卷

## 2.1 格式化（⚠️ 會清空資料）
```bash
mkfs.fat -F32 /dev/nvme0n1p1
mkfs.ext4 -L boot /dev/nvme0n1p2
mkfs.btrfs -L rootfs /dev/nvme0n1p3
mkfs.btrfs -L home   /dev/nvme0n1p4
# 若需「強制覆蓋格式化」：mkfs.btrfs -f /dev/nvme0n1p3
```

## 2.2 安裝 Btrfs 工具
```bash
emerge --ask sys-fs/btrfs-progs
```

## 2.3 建立 Btrfs 子卷
```bash
mount /dev/nvme0n1p3 /mnt/gentoo
btrfs subvolume create /mnt/gentoo/@
btrfs subvolume create /mnt/gentoo/@home
btrfs subvolume create /mnt/gentoo/@log
btrfs subvolume create /mnt/gentoo/@tmp
umount /mnt/gentoo
```

## 2.4 掛載
```bash
mount -o noatime,compress=zstd,ssd,space_cache=v2,subvol=@ /dev/nvme0n1p3 /mnt/gentoo
mkdir -p /mnt/gentoo/{boot,home,var/log,var/tmp,efi}
mount -o noatime,compress=zstd,ssd,space_cache=v2,subvol=@home /dev/nvme0n1p3 /mnt/gentoo/home
mount -o noatime,subvol=@log /dev/nvme0n1p3 /mnt/gentoo/var/log
mount -o noatime,subvol=@tmp /dev/nvme0n1p3 /mnt/gentoo/var/tmp
mount /dev/nvme0n1p2 /mnt/gentoo/boot
mount /dev/nvme0n1p1 /mnt/gentoo/efi
```

---

# 7. 取得 UUID 並寫 fstab（**blkid**）

## 7.1 查詢 UUID
```bash
blkid
lsblk -f   # 亦可顯示 UUID 與掛載
```

## 7.2 編輯 `/etc/fstab`（以子卷為例；請替換你的 UUID）
```fstab
UUID=<UUID-ESP>    /efi      vfat   noatime,umask=0077                 0 2
UUID=<UUID-BOOT>   /boot     ext4   noatime                            0 2
UUID=<UUID-ROOT>   /         btrfs  noatime,compress=zstd,ssd,space_cache=v2,subvol=@      0 0
UUID=<UUID-ROOT>   /home     btrfs  noatime,compress=zstd,ssd,space_cache=v2,subvol=@home  0 0
UUID=<UUID-ROOT>   /var/log  btrfs  noatime,subvol=@log                                     0 0
UUID=<UUID-ROOT>   /var/tmp  btrfs  noatime,subvol=@tmp                                     0 0
```

---

# 8. 開機載入程式（UEFI GRUB）
```bash
emerge grub efibootmgr
grub-install --target=x86_64-efi --efi-directory=/efi --bootloader-id=Gentoo
grub-mkconfig -o /boot/grub/grub.cfg
```

## 8.1 掃描其他系統（Windows / 其他 Linux）— os-prober
```bash
emerge --ask sys-boot/os-prober
nano /etc/default/grub
# 加入或確保：
GRUB_DISABLE_OS_PROBER=false
grub-mkconfig -o /boot/grub/grub.cfg
```
