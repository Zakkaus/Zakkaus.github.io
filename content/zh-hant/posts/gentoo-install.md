---
title: "Gentoo 安裝筆記"
date: 2025-09-01
tags: ["Gentoo","Linux","OpenRC","systemd","KDE","GNOME","SSH","Wayland","Btrfs","UEFI"]
categories: ["Linux筆記"]
draft: false
toc: true
---

# 📑 目錄
- [💻 我的電腦配置](#-我的電腦配置)
- [0. 開機與網路](#0-開機與網路)
- [1. 磁碟分割](#1-磁碟分割)
- [2. 檔案系統與子卷](#2-檔案系統與子卷)
- [3. Stage3 與 chroot](#3-stage3-與-chroot)
- [4. Portage 與 make.conf](#4-portage-與-makeconf)
- [5. Profile 與語言](#5-profile-與語言)
- [6. 內核](#6-內核)
- [7. fstab 與 UUID](#7-fstab-與-uuid)
- [8. Bootloader](#8-bootloader)
- [9. 網路服務](#9-網路服務)
- [10. 桌面環境](#10-桌面環境)
- [11. 使用者與 sudo](#11-使用者與-sudo)
- [12. SSHD（可選）](#12-sshd可選)
- [13. 重開機](#13-重開機)
- [💡 常見問題](#-常見問題)

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
- **輔助機**：MacBook Air M2（16GB / 512GB）

> ⚠️ **提示**：以下指令中的 `zakk` 是你的使用者名稱，請自行更改成你的名字。

---

# 0. 開機與網路

## 0.1 確認 UEFI
```bash
test -d /sys/firmware/efi && echo "UEFI OK" || echo "Not UEFI"
```

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
- 512M /efi (FAT32)  
- 1G /boot (ext4)  
- 100G / (Btrfs)  
- 剩餘 /home (Btrfs)

---

# 2. 檔案系統與子卷

## 2.1 格式化
```bash
mkfs.fat -F32 /dev/nvme0n1p1
mkfs.ext4 -L boot /dev/nvme0n1p2
mkfs.btrfs -L rootfs /dev/nvme0n1p3
mkfs.btrfs -L home /dev/nvme0n1p4
```

## 2.2 安裝工具
```bash
emerge --ask sys-fs/btrfs-progs
```

## 2.3 建立子卷
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
mount -o compress=zstd,subvol=@ /dev/nvme0n1p3 /mnt/gentoo
mkdir -p /mnt/gentoo/{boot,home,var/log,var/tmp,efi}
mount -o subvol=@home /dev/nvme0n1p3 /mnt/gentoo/home
mount -o subvol=@log  /dev/nvme0n1p3 /mnt/gentoo/var/log
mount -o subvol=@tmp  /dev/nvme0n1p3 /mnt/gentoo/var/tmp
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
systemd 推薦：
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

# 4. Portage 與 make.conf

同步 Portage：
```bash
emerge-webrsync
emerge --sync
```

編輯 `/etc/portage/make.conf`：
```bash
nano /etc/portage/make.conf
```
推薦內容：
```conf
# 編譯選項
COMMON_FLAGS="-march=native -O2 -pipe"
MAKEOPTS="-j32"

# Portage 與套件源
GENTOO_MIRRORS="https://mirror.aarnet.edu.au/pub/gentoo/"
ACCEPT_LICENSE="*"

# 全域 USE 標誌
USE="wayland pipewire egl vulkan"
```

快速設定 license：
```bash
echo "*/* @FREE" >> /etc/portage/package.license
```

---

# 5. Profile 與語言
```bash
eselect profile list
eselect profile set <編號>
emerge -avuDN @world
```

設定時區與語言：
```bash
echo "Asia/Taipei" > /etc/timezone
emerge --config sys-libs/timezone-data
echo 'en_US.UTF-8 UTF-8' >> /etc/locale.gen
echo 'zh_TW.UTF-8 UTF-8' >> /etc/locale.gen
locale-gen
eselect locale set zh_TW.utf8
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
UUID=<UUID-ROOT> /      btrfs noatime,compress=zstd,subvol=@      0 0
UUID=<UUID-ROOT> /home  btrfs noatime,subvol=@home                0 0
UUID=<UUID-ROOT> /var/log btrfs noatime,subvol=@log               0 0
UUID=<UUID-ROOT> /var/tmp btrfs noatime,subvol=@tmp               0 0
```

---

# 8. Bootloader

安裝與設定：
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

# 10. 桌面環境

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

## 中文字型
```bash
emerge media-fonts/noto-cjk
```

---

# 11. 使用者與 sudo
```bash
passwd
useradd -m -G wheel,audio,video,usb -s /bin/bash zakk
passwd zakk
emerge app-admin/sudo
echo "%wheel ALL=(ALL) ALL" >> /etc/sudoers
```

---

# 12. SSHD（可選）
```bash
emerge net-misc/openssh
systemctl enable sshd && systemctl start sshd
```

---

# 13. 重開機
```bash
exit
umount -R /mnt/gentoo
reboot
```

---

# 💡 常見問題
- WPA3 無法 → 請改 WPA2  
- MAKEOPTS 請用數字，例如 -j32  
- 建議 Btrfs 壓縮 zstd、子卷拆分  
- os-prober 預設關閉需手動啟用  
- 中文桌面請安裝 noto-cjk 字型
