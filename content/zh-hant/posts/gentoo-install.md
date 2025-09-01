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
- [0. 開機與網路](#0-開機與網路)
- [1. 磁碟分割](#1-磁碟分割)
- [2. 檔案系統](#2-檔案系統)
- [3. Stage3 與 chroot](#3-stage3-與-chroot)
- [4. Portage 與軟體源](#4-portage-與軟體源)
- [5. Profile 與語言](#5-profile-與語言)
- [5.x 本地化（Localization）](#5x-本地化localization)
- [6. 內核](#6-內核)
- [7. fstab 與 UUID](#7-fstab-與-uuid)
- [8. Bootloader](#8-bootloader)
- [9. 網路服務](#9-網路服務)
- [10. 圖形化選擇（Wayland / X11）](#10-圖形化選擇wayland--x11)
- [11. 顯示卡與微碼](#11-顯示卡與微碼)
- [12. 桌面環境（可選）](#12-桌面環境可選)
- [13. 使用者與 sudo](#13-使用者與-sudo)
- [14. SSHD（可選）](#14-sshd可選)
- [15. 重開機](#15-重開機)
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

# 0. 開機與網路

## 0.1 確認 UEFI
```bash
ls /sys/firmware/efi
```
- 如果有輸出 → **UEFI 模式**  
- 如果沒有 → **Legacy BIOS**

💡 建議：現代電腦盡量使用 UEFI 模式。

## 0.2 有線網路
```bash
ip a
dhcpcd eno1
ping -c 3 gentoo.org
```

## 0.3 Wi-Fi
```bash
iw dev
wpa_passphrase "SSID" "PASSWORD" > /etc/wpa_supplicant/wpa_supplicant.conf
wpa_supplicant -B -i wlp9s0 -c /etc/wpa_supplicant/wpa_supplicant.conf
dhcpcd wlp9s0
ping -c 3 gentoo.org
```

## 0.4 LiveCD 開啟 SSH（可選）
```bash
passwd
echo "PermitRootLogin yes" >> /etc/ssh/sshd_config
echo "PasswordAuthentication yes" >> /etc/ssh/sshd_config
/etc/init.d/sshd start   # OpenRC
systemctl start sshd     # systemd
ssh root@<LiveCD IP>
```

---

# 1. 磁碟分割
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

💡 建議：  
- **ext4** → 最穩定、安全，適合新手。  
- **XFS** → 適合大檔案儲存，不建議用於 /boot。  
- **Btrfs** → 支援快照、壓縮與子卷，適合進階用戶。  

---

# 2. 檔案系統

## 2.1 格式化範例

### ext4
```bash
mkfs.ext4 -L root /dev/nvme0n1p3
mkfs.ext4 -L home /dev/nvme0n1p4
```

### XFS
```bash
mkfs.xfs -L root /dev/nvme0n1p3
mkfs.xfs -L home /dev/nvme0n1p4
```

### Btrfs
```bash
mkfs.btrfs -L rootfs /dev/nvme0n1p3
mkfs.btrfs -L home /dev/nvme0n1p4
```

💡 建議：Btrfs 可以進一步建立子卷（`@`、`@home` 等），而 ext4/XFS 直接掛載即可。

## 2.2 掛載
Btrfs 範例：
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

ext4/XFS 範例：
```bash
mount /dev/nvme0n1p3 /mnt/gentoo
mkdir -p /mnt/gentoo/{boot,home,efi}
mount /dev/nvme0n1p4 /mnt/gentoo/home
mount /dev/nvme0n1p2 /mnt/gentoo/boot
mount /dev/nvme0n1p1 /mnt/gentoo/efi
```

---

# 3. Stage3 與 chroot

## 3.1 下載 Stage3
```bash
cd /mnt/gentoo
links https://www.gentoo.org/downloads/mirrors/
tar xpvf stage3-*.tar.xz --xattrs-include='*.*' --numeric-owner
```

## 3.2 掛載系統目錄

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

## 3.3 進入 chroot
```bash
chroot /mnt/gentoo /bin/bash
source /etc/profile
export PS1="(chroot) $PS1"
```

---

# 4. Portage 與軟體源

同步 Portage：
```bash
emerge-webrsync
emerge --sync
```

## 4.1 選擇下載源
```bash
emerge --ask app-portage/mirrorselect
mirrorselect -i -o >> /etc/portage/make.conf
```

💡 建議：選擇離你最近的鏡像（台灣可選 NCHC，中國大陸可選 USTC、清華，澳洲可選 AARNET）。

## 4.2 make.conf 範例
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

# 5. Profile 與語言
```bash
eselect profile list
eselect profile set <編號>
emerge -avuDN @world
```

設定時區（以台北為例）：
```bash
ls /usr/share/zoneinfo
ls /usr/share/zoneinfo/Asia
echo "Asia/Taipei" > /etc/timezone
emerge --config sys-libs/timezone-data
```

設定語言：
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

# 5.x 本地化（Localization）

- **系統語言**：建議使用 `en_US.UTF-8`，避免部分軟體異常。  
- **中文支援**：可加入 `zh_TW.UTF-8`。  
- **字型**：
  ```bash
  emerge media-fonts/noto-cjk
  ```
- **輸入法**：
  ```bash
  emerge app-i18n/fcitx5 app-i18n/fcitx5-rime
  ```

---

# 6. 內核
快速：
```bash
emerge sys-kernel/gentoo-kernel-bin
```
自編譯：
```bash
emerge sys-kernel/gentoo-sources
cd /usr/src/linux
make menuconfig
make -j32
make modules_install
make install
```

---

# 7. fstab 與 UUID
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

💡 如果使用 Btrfs，請在選項中加入壓縮與子卷，例如：`noatime,compress=zstd,subvol=@`。

---

# 8. Bootloader
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

💡 如果使用 Btrfs，請安裝工具：
```bash
emerge --ask sys-fs/btrfs-progs
```

---

# 9. 網路服務
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

# 10. 圖形化選擇（Wayland / X11）

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

# 11. 顯示卡與微碼

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

# 12. 桌面環境（可選）

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

💡 如果只需伺服器，不必安裝桌面環境。

---

# 13. 使用者與 sudo
```bash
passwd
useradd -m -G wheel,audio,video,usb -s /bin/bash zakk
passwd zakk
emerge app-admin/sudo
echo "%wheel ALL=(ALL) ALL" >> /etc/sudoers
```

⚠️ 注意：`zakk` 是範例名稱，請換成自己的名稱。

---

# 14. SSHD（可選）
```bash
emerge net-misc/openssh
systemctl enable sshd && systemctl start sshd
```

---

# 15. 重開機
```bash
exit
umount -R /mnt/gentoo
reboot
```

---

# 💡 常見問題
- WPA3 有時不穩，建議用 WPA2  
- MAKEOPTS 要依照 CPU 執行緒數設定，例如 16C/32T → -j32  
- 檔案系統選擇：ext4（穩定）、XFS（大檔案）、Btrfs（快照）  
- os-prober 預設關閉，需手動開啟  
- 使用 Btrfs 請額外安裝 btrfs-progs  

---

# 📚 參考來源
- [Gentoo Handbook (官方)](https://wiki.gentoo.org/wiki/Handbook:AMD64/Full/Installation)  
- [Bitbili 教程](https://bitbili.net/gentoo-linux-installation-and-usage-tutorial.html)
