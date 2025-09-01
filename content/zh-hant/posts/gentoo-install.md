---
title: "Gentoo 安裝指南"
date: 2025-09-01
tags: ["Gentoo","Linux","OpenRC","systemd","KDE","GNOME","SSH","Wayland","Btrfs","UEFI","NVIDIA","AMD","Intel"]
categories: ["Linux筆記"]
draft: false
toc: true
---

# 📑 目錄
- [💻 我的電腦配置](#-我的電腦配置)
- [0. 下載與製作安裝媒體](#0-下載與製作安裝媒體)
- [1. 開機與網路](#1-開機與網路)
- [2. 磁碟分割](#2-磁碟分割)
- [3. 檔案系統](#3-檔案系統)
- [4. Stage3 與 chroot](#4-stage3-與-chroot)
- [5. Portage 與軟體源](#5-portage-與軟體源)
- [6. Profile 與語言](#6-profile-與語言)
- [6.x 本地化（Localization）](#6x-本地化localization)
- [7. 內核選擇](#7-內核選擇)
- [8. fstab 與 UUID](#8-fstab-與-uuid)
- [9. Bootloader](#9-bootloader)
- [10. 網路服務](#10-網路服務)
- [11. 圖形化選擇（Wayland / X11）](#11-圖形化選擇wayland--x11)
- [12. 顯示卡與微碼](#12-顯示卡與微碼)
- [13. 桌面環境（可選）](#13-桌面環境可選)
- [14. 使用者與 sudo](#14-使用者與-sudo)
- [15. SSHD（可選）](#15-sshd可選)
- [16. 重開機](#16-重開機)
- [💡 常見問題](#-常見問題)
- [📚 參考來源](#-參考來源)

---

# 💻 我的電腦配置
- **CPU**：AMD Ryzen 9 7950X3D（16C/32T）
- **主機板**：ASUS ROG STRIX X670E-A GAMING WIFI
- **記憶體**：64GB DDR5 6400MHz
- **顯示卡**：NVIDIA GeForce RTX 4080 SUPER（主要）＋ AMD Radeon iGPU
- **儲存**：NVMe SSD
- **螢幕**：Samsung Odyssey G9 49" 5120×1440
- **網路**：Aussie Broadband 1000/50Mbps，Wi-Fi 7 Router BE9300（家用公網 IP）
- **雙系統**：Windows 11 ＋ Gentoo

---

# 0. 下載與製作安裝媒體

## 0.1 下載 ISO
官方下載頁：  
[Gentoo Downloads](https://www.gentoo.org/downloads/mirrors/)  

💡 建議：選擇離你最近的 mirror，例如：  
- 台灣：NCHC  
- 中國：USTC、清華  
- 澳洲：AARNET、Swinburne  

使用 `wget`：
```bash
wget https://mirror.aarnet.edu.au/pub/gentoo/releases/amd64/autobuilds/current-install-amd64-minimal/install-amd64-minimal.iso
```

## 0.2 製作 USB 開機碟

### Linux 下（dd 方法）
```bash
sudo dd if=install-amd64-minimal.iso of=/dev/sdX bs=4M status=progress oflag=sync
```
⚠️ `sdX` 請替換為你的 USB 裝置。

### Windows 下（Rufus）
下載 Rufus：[Rufus 官方網站](https://rufus.ie/)  

步驟：  
1. 打開 Rufus。  
2. 選擇 USB 裝置與 Gentoo ISO。  
3. 模式選擇 **dd 模式**（非 ISO 模式）。  
4. 點選「開始」。  

---

# 1. 開機與網路

## 1.1 確認 UEFI
```bash
ls /sys/firmware/efi
```
- 有輸出 → **UEFI 模式**  
- 無輸出 → **Legacy BIOS**  

💡 建議：現代電腦建議使用 UEFI。

## 1.2 有線網路
```bash
ip a
dhcpcd eno1
ping -c 3 gentoo.org
```

## 1.3 Wi-Fi
```bash
iw dev
wpa_passphrase "SSID" "PASSWORD" > /etc/wpa_supplicant/wpa_supplicant.conf
wpa_supplicant -B -i wlp9s0 -c /etc/wpa_supplicant/wpa_supplicant.conf
dhcpcd wlp9s0
ping -c 3 gentoo.org
```

---

# 2. 磁碟分割
```bash
lsblk -o NAME,SIZE,TYPE,MOUNTPOINT
cfdisk /dev/nvme0n1
```

建議分割：  
| 大小 | 檔案系統 | 掛載點 |
|---|---|---|
| 512M | FAT32 | /efi |
| 1G   | ext4  | /boot |
| 100G | ext4/XFS/Btrfs | / |
| 剩餘 | ext4/XFS/Btrfs | /home |

---

# 3. 檔案系統

## 3.1 格式化範例

ext4：
```bash
mkfs.ext4 -L root /dev/nvme0n1p3
mkfs.ext4 -L home /dev/nvme0n1p4
```

XFS：
```bash
mkfs.xfs -L root /dev/nvme0n1p3
mkfs.xfs -L home /dev/nvme0n1p4
```

Btrfs：
```bash
mkfs.btrfs -L rootfs /dev/nvme0n1p3
mkfs.btrfs -L home /dev/nvme0n1p4
```

💡 建議：  
- **ext4** → 最穩定，建議新手使用。  
- **XFS** → 適合大檔案。  
- **Btrfs** → 支援快照與子卷，但需額外工具（例如 btrfs-progs）。  

## 3.2 掛載
Btrfs 子卷範例：
```bash
mount /dev/nvme0n1p3 /mnt/gentoo
btrfs subvolume create /mnt/gentoo/@
btrfs subvolume create /mnt/gentoo/@home
umount /mnt/gentoo

mount -o compress=zstd,subvol=@ /dev/nvme0n1p3 /mnt/gentoo
mkdir -p /mnt/gentoo/{boot,home,efi}
mount -o subvol=@home /dev/nvme0n1p3 /mnt/gentoo/home
mount /dev/nvme0n1p2 /mnt/gentoo/boot
mount /dev/nvme0n1p1 /mnt/gentoo/efi
```

ext4 / XFS 範例：
```bash
mount /dev/nvme0n1p3 /mnt/gentoo
mkdir -p /mnt/gentoo/{boot,home,efi}
mount /dev/nvme0n1p4 /mnt/gentoo/home
mount /dev/nvme0n1p2 /mnt/gentoo/boot
mount /dev/nvme0n1p1 /mnt/gentoo/efi
```

---

# 4. Stage3 與 chroot

## 4.1 下載 Stage3
```bash
cd /mnt/gentoo
links https://www.gentoo.org/downloads/mirrors/
tar xpvf stage3-*.tar.xz --xattrs-include='*.*' --numeric-owner
```

## 4.2 掛載系統目錄

OpenRC：
```bash
mount -t proc /proc /mnt/gentoo/proc
mount --rbind /sys /mnt/gentoo/sys
mount --rbind /dev /mnt/gentoo/dev
```

systemd：
```bash
mount -t proc /proc /mnt/gentoo/proc
mount --rbind /sys /mnt/gentoo/sys && mount --make-rslave /mnt/gentoo/sys
mount --rbind /dev /mnt/gentoo/dev && mount --make-rslave /mnt/gentoo/dev
mount --rbind /run /mnt/gentoo/run && mount --make-rslave /mnt/gentoo/run
```

## 4.3 進入 chroot
```bash
chroot /mnt/gentoo /bin/bash
source /etc/profile
export PS1="(chroot) $PS1"
```

---

# 5. Portage 與軟體源

同步 Portage：
```bash
emerge-webrsync
emerge --sync
```

💡 如果失敗，可用 `wget` 手動下載 snapshot。

## 5.1 選擇鏡像
```bash
emerge --ask app-portage/mirrorselect
mirrorselect -i -o >> /etc/portage/make.conf
```

💡 建議：選擇離你最近的鏡像（澳洲 → AARNET, Swinburne）。

## 5.2 make.conf 範例
```bash
nano /etc/portage/make.conf
```

內容：
```conf
COMMON_FLAGS="-march=native -O2 -pipe"
MAKEOPTS="-j32"
GENTOO_MIRRORS="https://mirror.aarnet.edu.au/pub/gentoo/"
ACCEPT_LICENSE="*"
```

---

# 6. Profile 與語言
```bash
eselect profile list
eselect profile set <編號>
emerge -avuDN @world
```

## 6.1 設定時區
```bash
ls /usr/share/zoneinfo
ls /usr/share/zoneinfo/Asia
ls /usr/share/zoneinfo/Australia
echo "Asia/Taipei" > /etc/timezone
emerge --config sys-libs/timezone-data
```

💡 完整時區列表：  
[tz database 時區列表](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

範例：  
- 台北 → `Asia/Taipei`  
- 上海 → `Asia/Shanghai`  
- 東京 → `Asia/Tokyo`  
- 墨爾本 → `Australia/Melbourne`  
- 倫敦 → `Europe/London`  
- 紐約 → `America/New_York`  

## 6.2 語言
```conf
# /etc/locale.gen
en_US.UTF-8 UTF-8
zh_TW.UTF-8 UTF-8
```
```bash
locale-gen
eselect locale set en_US.utf8
```

---

# 6.x 本地化（Localization）

- 預設建議使用 `en_US.UTF-8`。  
- 可額外加 `zh_TW.UTF-8` 或其他語言。  
- 中文字型：
  ```bash
  emerge media-fonts/noto-cjk
  ```
- 中文輸入法：
  ```bash
  emerge app-i18n/fcitx5 app-i18n/fcitx5-rime
  ```

---

# 7. 內核選擇

## 7.1 gentoo-kernel-bin
最簡單，建議新手使用：
```bash
emerge sys-kernel/gentoo-kernel-bin
```

## 7.2 gentoo-sources（自編譯）
```bash
emerge sys-kernel/gentoo-sources
cd /usr/src/linux
make menuconfig
make -j32
make modules_install
make install
```

💡 建議：  
- **ext4** → 內核通常已啟用。  
- **Btrfs** → 需在內核手動啟用。  

---

# 8. fstab 與 UUID
查詢 UUID：
```bash
blkid
lsblk -f
```

編輯 `/etc/fstab`：
```fstab
UUID=<UUID-ESP>  /efi   vfat  noatime,umask=0077 0 2
UUID=<UUID-BOOT> /boot  ext4  noatime            0 2
UUID=<UUID-ROOT> /      ext4  noatime            0 1
UUID=<UUID-HOME> /home  ext4  noatime            0 2
```

---

# 9. Bootloader

安裝 GRUB：
```bash
emerge grub efibootmgr
grub-install --target=x86_64-efi --efi-directory=/efi --bootloader-id=Gentoo
grub-mkconfig -o /boot/grub/grub.cfg
```

啟用 os-prober：
```bash
emerge --ask sys-boot/os-prober
echo 'GRUB_DISABLE_OS_PROBER=false' >> /etc/default/grub
grub-mkconfig -o /boot/grub/grub.cfg
```

如果使用 Btrfs，請安裝：
```bash
emerge --ask sys-fs/btrfs-progs
```

---

# 10. 網路服務

systemd：
```bash
emerge net-misc/networkmanager
systemctl enable NetworkManager
```

OpenRC：
```bash
emerge net-misc/dhcpcd
rc-update add dhcpcd default
```

---

# 11. 圖形化選擇（Wayland / X11）

- **Wayland**：新技術，適合 KDE Plasma 與 GNOME，尤其 AMD/Intel GPU。  
- **X11**：相容性更好，適合舊軟體與遊戲。  

設定（寫入 `/etc/portage/make.conf`）：
```conf
# Wayland
USE="wayland egl pipewire vulkan"

# 或 X11
USE="X xwayland egl pipewire vulkan"
```

---

# 12. 顯示卡與微碼

## NVIDIA
```conf
VIDEO_CARDS="nvidia"
```
```bash
emerge x11-drivers/nvidia-drivers
```

## AMD
```conf
VIDEO_CARDS="amdgpu radeonsi"
```
```bash
emerge mesa vulkan-loader
```

## Intel
```conf
VIDEO_CARDS="intel i965 iris"
```
```bash
emerge mesa vulkan-loader
```

## CPU 微碼
Intel：
```bash
emerge sys-firmware/intel-microcode
```
AMD：
```bash
emerge sys-firmware/amd-ucode
```

---

# 13. 桌面環境（可選）

## KDE Plasma
```bash
emerge kde-plasma/plasma-meta x11-misc/sddm x11-base/xwayland
systemctl enable sddm
```

## GNOME
```bash
emerge gnome-base/gnome gnome-base/gdm
systemctl enable gdm
```

💡 如果只需伺服器，請跳過此步驟。

---

# 14. 使用者與 sudo
```bash
passwd
useradd -m -G wheel,audio,video,usb -s /bin/bash zakk
passwd zakk
emerge app-admin/sudo
echo "%wheel ALL=(ALL) ALL" >> /etc/sudoers
```

⚠️ 注意：`zakk` 是範例名稱，請換成自己的名稱。

---

# 15. SSHD（可選）
```bash
emerge net-misc/openssh
systemctl enable sshd && systemctl start sshd
```

---

# 16. 重開機
```bash
exit
umount -R /mnt/gentoo
reboot
```

---

# 💡 常見問題
- ISO 無法開機 → 請確保使用 **dd 或 Rufus (dd 模式)** 燒錄。  
- WPA3 不穩定 → 建議使用 WPA2。  
- 檔案系統選擇：ext4（穩定）、XFS（大檔案）、Btrfs（快照）。  
- os-prober 預設關閉，需要手動開啟。  
- 使用 Btrfs 請安裝 btrfs-progs。  

---

# 📚 參考來源
- [Gentoo Handbook (官方)](https://wiki.gentoo.org/wiki/Handbook:AMD64/Full/Installation)  
- [Bitbili 教程](https://bitbili.net/gentoo-linux-installation-and-usage-tutorial.html)  
- [Rufus 官方網站](https://rufus.ie/)  
- [tz database 時區列表](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
