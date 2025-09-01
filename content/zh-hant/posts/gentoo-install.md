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
- [3. 檔案系統與掛載](#3-檔案系統與掛載)
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
- [16. USE flags 與 License](#16-use-flags-與-license)
- [17. 重開機](#17-重開機)
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

💡 建議：  
- **中國用戶**：使用中科大 (USTC)、清華、阿里雲。  
- **台灣**：NCHC。  
- **澳洲**：AARNET、Swinburne。  

下載範例：
```bash
wget https://mirrors.ustc.edu.cn/gentoo/releases/amd64/autobuilds/current-install-amd64-minimal/install-amd64-minimal.iso
```

## 0.2 製作 USB 開機碟

### Linux 下（dd 方法）
```bash
sudo dd if=install-amd64-minimal.iso of=/dev/sdX bs=4M status=progress oflag=sync
```
⚠️ `sdX` 請替換為 USB 裝置名稱。

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
- 有 → **UEFI**  
- 無 → **Legacy BIOS**  

## 1.2 有線網路
```bash
ip a
dhcpcd eno1
ping -c 3 gentoo.org
```

## 1.3 Wi-Fi

### 使用 wpa_supplicant
```bash
iw dev
wpa_passphrase "SSID" "PASSWORD" > /etc/wpa_supplicant/wpa_supplicant.conf
wpa_supplicant -B -i wlp9s0 -c /etc/wpa_supplicant/wpa_supplicant.conf
dhcpcd wlp9s0
ping -c 3 gentoo.org
```

### 使用 iwd（建議新手）
```bash
emerge net-wireless/iwd
systemctl enable iwd
systemctl start iwd
iwctl
[iwd]# device list
[iwd]# station wlp9s0 scan
[iwd]# station wlp9s0 get-networks
[iwd]# station wlp9s0 connect SSID
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

# 3. 檔案系統與掛載

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

## 3.2 掛載範例

ext4 / XFS：
```bash
mount /dev/nvme0n1p3 /mnt/gentoo
mkdir -p /mnt/gentoo/{boot,home,efi}
mount /dev/nvme0n1p4 /mnt/gentoo/home
mount /dev/nvme0n1p2 /mnt/gentoo/boot
mount /dev/nvme0n1p1 /mnt/gentoo/efi
```

Btrfs 子卷：
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

---

# 4. Stage3 與 chroot

下載 Stage3：
```bash
cd /mnt/gentoo
links https://www.gentoo.org/downloads/mirrors/
tar xpvf stage3-*.tar.xz --xattrs-include='*.*' --numeric-owner
```

掛載系統目錄（OpenRC）：
```bash
mount -t proc /proc /mnt/gentoo/proc
mount --rbind /sys /mnt/gentoo/sys
mount --rbind /dev /mnt/gentoo/dev
```

掛載系統目錄（systemd）：
```bash
mount -t proc /proc /mnt/gentoo/proc
mount --rbind /sys /mnt/gentoo/sys && mount --make-rslave /mnt/gentoo/sys
mount --rbind /dev /mnt/gentoo/dev && mount --make-rslave /mnt/gentoo/dev
mount --rbind /run /mnt/gentoo/run && mount --make-rslave /mnt/gentoo/run
```

進入 chroot：
```bash
chroot /mnt/gentoo /bin/bash
source /etc/profile
export PS1="(chroot) $PS1"
```

---

# 5. Portage 與軟體源

## 5.1 完整 make.conf 範例
```conf
# /etc/portage/make.conf

# 編譯選項
COMMON_FLAGS="-march=native -O2 -pipe"
MAKEOPTS="-j32"

# Portage 預設選項
EMERGE_DEFAULT_OPTS="--ask --verbose --with-bdeps=y --complete-graph=y"

# 使用的鏡像（⚠️ 請只保留一個，避免衝突）
GENTOO_MIRRORS="https://mirrors.ustc.edu.cn/gentoo/"

# 視覺與聲音支援
USE="X wayland pipewire vulkan egl"

# 顯示卡（依照自己的硬體選擇）
VIDEO_CARDS="nvidia amdgpu radeonsi intel i965 iris nouveau"

# CPU 微碼
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
echo "Asia/Taipei" > /etc/timezone
emerge --config sys-libs/timezone-data
```

完整列表：  
[tz database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

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
- 中文字型：`emerge media-fonts/noto-cjk`  
- 輸入法：`emerge app-i18n/fcitx5 app-i18n/fcitx5-rime`  

---

# 7. 內核選擇

## 7.1 gentoo-kernel-bin
```bash
emerge sys-kernel/gentoo-kernel-bin
```

## 7.2 gentoo-sources（自編譯）
在 `make menuconfig`：  
- 必選 → ext4、需要則啟用 Btrfs  
- 建議 → 啟用 NVMe、GPU、USB 等驅動  

---

# 8. fstab 與 UUID

ext4 範例：
```fstab
UUID=<UUID-ESP>  /efi   vfat  noatime,umask=0077 0 2
UUID=<UUID-BOOT> /boot  ext4  noatime            0 2
UUID=<UUID-ROOT> /      ext4  noatime            0 1
UUID=<UUID-HOME> /home  ext4  noatime            0 2
```

Btrfs 範例：
```fstab
UUID=<UUID-ESP>  /efi   vfat   noatime,umask=0077 0 2
UUID=<UUID-ROOT> /      btrfs  noatime,compress=zstd,subvol=@     0 1
UUID=<UUID-ROOT> /home  btrfs  noatime,compress=zstd,subvol=@home 0 2
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

Btrfs 工具：
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

```conf
USE="wayland egl pipewire vulkan"
# 或
USE="X xwayland egl pipewire vulkan"
```

---

# 12. 顯示卡與微碼

## NVIDIA 專有驅動
```conf
VIDEO_CARDS="nvidia"
```
```bash
emerge x11-drivers/nvidia-drivers
```

## NVIDIA 開源驅動（nouveau）
```conf
VIDEO_CARDS="nouveau"
```
```bash
emerge x11-base/xorg-drivers
```

💡 建議：RTX 4000 → `nvidia-drivers`；舊卡可試 `nouveau`。

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
Intel：`emerge sys-firmware/intel-microcode`  
AMD：`emerge sys-firmware/amd-ucode`  

---

# 13. 桌面環境（可選）

KDE Plasma：
```bash
emerge kde-plasma/plasma-meta x11-misc/sddm x11-base/xwayland
systemctl enable sddm
```

GNOME：
```bash
emerge gnome-base/gnome gnome-base/gdm
systemctl enable gdm
```

---

# 14. 使用者與 sudo
```bash
passwd
useradd -m -G wheel,audio,video,usb -s /bin/bash zakk
passwd zakk
emerge app-admin/sudo
echo "%wheel ALL=(ALL) ALL" >> /etc/sudoers
```

---

# 15. SSHD（可選）
```bash
emerge net-misc/openssh
systemctl enable sshd && systemctl start sshd
```

---

# 16. USE flags 與 License

## USE flags
```bash
emerge -pv firefox
echo "media-video/ffmpeg X wayland" >> /etc/portage/package.use/ffmpeg
```

## License
```bash
echo "www-client/google-chrome google-chrome" >> /etc/portage/package.license
```

---

# 17. 重開機
```bash
exit
umount -R /mnt/gentoo
reboot
```

---

# 💡 常見問題
- **USE 衝突**：用 `emerge -pv package` 檢查 → 修改 `/etc/portage/package.use`。  
- **License 阻擋**：寫入 `/etc/portage/package.license`。  
- **NVIDIA**：新卡用專有驅動，舊卡可試 nouveau。  
- **Wi-Fi**：建議 iwd，簡單直觀。  

---

# 📚 參考來源
- [Gentoo Handbook](https://wiki.gentoo.org/wiki/Handbook:AMD64/Full/Installation)  
- [Bitbili 教程](https://bitbili.net/gentoo-linux-installation-and-usage-tutorial.html)  
- [Rufus 官方網站](https://rufus.ie/)  
- [tz database 時區列表](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
