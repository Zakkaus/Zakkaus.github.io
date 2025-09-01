---
title: "Gentoo Installation Guide"
date: 2025-09-01
tags: ["Gentoo","Linux","OpenRC","systemd","KDE","GNOME","SSH","Wayland","Btrfs","UEFI","NVIDIA","AMD","Intel"]
categories: ["Linux Notes"]
draft: false
toc: true
---

# 📑 Table of Contents
- [💻 My Hardware](#-my-hardware)
- [0. Download & Create Installation Media](#0-download--create-installation-media)
- [1. Boot & Network](#1-boot--network)
- [2. Partitioning](#2-partitioning)
- [3. Filesystems](#3-filesystems)
- [4. Stage3 & chroot](#4-stage3--chroot)
- [5. Portage & Mirrors](#5-portage--mirrors)
- [6. Profile & Locale](#6-profile--locale)
- [6.x Localization](#6x-localization)
- [7. Kernel Choices](#7-kernel-choices)
- [8. fstab & UUID](#8-fstab--uuid)
- [9. Bootloader](#9-bootloader)
- [10. Network Services](#10-network-services)
- [11. Display Server Choice (Wayland / X11)](#11-display-server-choice-wayland--x11)
- [12. GPU Drivers & Microcode](#12-gpu-drivers--microcode)
- [13. Desktop Environments (Optional)](#13-desktop-environments-optional)
- [14. Users & sudo](#14-users--sudo)
- [15. SSHD (Optional)](#15-sshd-optional)
- [16. Reboot](#16-reboot)
- [💡 FAQ](#-faq)
- [📚 References](#-references)

---

# 💻 My Hardware
- **CPU**: AMD Ryzen 9 7950X3D (16C/32T)
- **Motherboard**: ASUS ROG STRIX X670E-A GAMING WIFI
- **RAM**: 64GB DDR5 6400MHz
- **GPU**: NVIDIA GeForce RTX 4080 SUPER + AMD Radeon iGPU
- **Storage**: NVMe SSD
- **Monitor**: Samsung Odyssey G9 49" 5120×1440
- **Network**: Aussie Broadband 1000/50Mbps, Wi-Fi 7 Router BE9300 (static public IP)
- **Dual boot**: Windows 11 + Gentoo

---

# 0. Download & Create Installation Media

## 0.1 Download ISO
Official mirrors:  
[Gentoo Downloads](https://www.gentoo.org/downloads/mirrors/)  

💡 Tip: Choose a mirror close to you. For Australia, try **AARNET** or **Swinburne**.

Using `wget`:
```bash
wget https://mirror.aarnet.edu.au/pub/gentoo/releases/amd64/autobuilds/current-install-amd64-minimal/install-amd64-minimal.iso
```

## 0.2 Create bootable USB

### Linux (dd method)
```bash
sudo dd if=install-amd64-minimal.iso of=/dev/sdX bs=4M status=progress oflag=sync
```
⚠️ Replace `sdX` with your USB device.

### Windows (Rufus)
Download Rufus: [Rufus official website](https://rufus.ie/)  

Steps:  
1. Open Rufus.  
2. Select your USB device and Gentoo ISO.  
3. Choose **dd mode** (not ISO mode).  
4. Click "Start".  

---

# 1. Boot & Network

## 1.1 Check UEFI
```bash
ls /sys/firmware/efi
```
- Exists → UEFI  
- Not exists → Legacy BIOS  

💡 Tip: Prefer UEFI for modern hardware.

## 1.2 Wired
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

# 2. Partitioning
```bash
lsblk -o NAME,SIZE,TYPE,MOUNTPOINT
cfdisk /dev/nvme0n1
```

Suggested layout:  
| Size | Filesystem | Mount |
|---|---|---|
| 512M | FAT32 | /efi |
| 1G   | ext4  | /boot |
| 100G | ext4/XFS/Btrfs | / |
| Rest | ext4/XFS/Btrfs | /home |

---

# 3. Filesystems

## 3.1 Format examples

ext4:
```bash
mkfs.ext4 -L root /dev/nvme0n1p3
mkfs.ext4 -L home /dev/nvme0n1p4
```

XFS:
```bash
mkfs.xfs -L root /dev/nvme0n1p3
mkfs.xfs -L home /dev/nvme0n1p4
```

Btrfs:
```bash
mkfs.btrfs -L rootfs /dev/nvme0n1p3
mkfs.btrfs -L home /dev/nvme0n1p4
```

💡 Tips:  
- **ext4** → Stable and simple, recommended for beginners.  
- **XFS** → Great for large files.  
- **Btrfs** → Supports snapshots and subvolumes, but requires `btrfs-progs`.  

## 3.2 Mount
Example for Btrfs with subvolumes:
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

For ext4/XFS:
```bash
mount /dev/nvme0n1p3 /mnt/gentoo
mkdir -p /mnt/gentoo/{boot,home,efi}
mount /dev/nvme0n1p4 /mnt/gentoo/home
mount /dev/nvme0n1p2 /mnt/gentoo/boot
mount /dev/nvme0n1p1 /mnt/gentoo/efi
```

---

# 4. Stage3 & chroot

## 4.1 Download Stage3
```bash
cd /mnt/gentoo
links https://www.gentoo.org/downloads/mirrors/
tar xpvf stage3-*.tar.xz --xattrs-include='*.*' --numeric-owner
```

## 4.2 Mount system dirs

OpenRC:
```bash
mount -t proc /proc /mnt/gentoo/proc
mount --rbind /sys /mnt/gentoo/sys
mount --rbind /dev /mnt/gentoo/dev
```

systemd:
```bash
mount -t proc /proc /mnt/gentoo/proc
mount --rbind /sys /mnt/gentoo/sys && mount --make-rslave /mnt/gentoo/sys
mount --rbind /dev /mnt/gentoo/dev && mount --make-rslave /mnt/gentoo/dev
mount --rbind /run /mnt/gentoo/run && mount --make-rslave /mnt/gentoo/run
```

## 4.3 Enter chroot
```bash
chroot /mnt/gentoo /bin/bash
source /etc/profile
export PS1="(chroot) $PS1"
```

---

# 5. Portage & Mirrors

Sync Portage:
```bash
emerge-webrsync
emerge --sync
```

💡 If sync fails, use `wget` to manually fetch snapshot.

## 5.1 Select mirrors
```bash
emerge --ask app-portage/mirrorselect
mirrorselect -i -o >> /etc/portage/make.conf
```

💡 Choose a mirror near you (Australia → AARNET, Swinburne).

## 5.2 make.conf example
```bash
nano /etc/portage/make.conf
```

Example content:
```conf
COMMON_FLAGS="-march=native -O2 -pipe"
MAKEOPTS="-j32"
GENTOO_MIRRORS="https://mirror.aarnet.edu.au/pub/gentoo/"
ACCEPT_LICENSE="*"
```

---

# 6. Profile & Locale
```bash
eselect profile list
eselect profile set <id>
emerge -avuDN @world
```

## 6.1 Timezone
```bash
ls /usr/share/zoneinfo
ls /usr/share/zoneinfo/Australia
echo "Australia/Melbourne" > /etc/timezone
emerge --config sys-libs/timezone-data
```

💡 Full timezone list:  
[List of tz database time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

Examples:  
- Melbourne → `Australia/Melbourne`  
- Tokyo → `Asia/Tokyo`  
- London → `Europe/London`  
- New York → `America/New_York`  

## 6.2 Locale
```conf
# /etc/locale.gen
en_US.UTF-8 UTF-8
```
```bash
locale-gen
eselect locale set en_US.utf8
```

---

# 6.x Localization

- Keep `en_US.UTF-8` as default.  
- Add others if needed (`en_AU.UTF-8`, `fr_FR.UTF-8`).  
- Fonts for Asian languages:  
  ```bash
  emerge media-fonts/noto-cjk
  ```

---

# 7. Kernel Choices

## 7.1 gentoo-kernel-bin
Easiest option, recommended for beginners:
```bash
emerge sys-kernel/gentoo-kernel-bin
```

## 7.2 gentoo-sources (manual compile)
```bash
emerge sys-kernel/gentoo-sources
cd /usr/src/linux
make menuconfig
make -j32
make modules_install
make install
```

💡 Notes:  
- **ext4** → Usually enabled by default.  
- **Btrfs** → Must enable manually in kernel.  

---

# 8. fstab & UUID
Get UUIDs:
```bash
blkid
lsblk -f
```

Edit `/etc/fstab`:
```fstab
UUID=<UUID-ESP>  /efi   vfat  noatime,umask=0077 0 2
UUID=<UUID-BOOT> /boot  ext4  noatime            0 2
UUID=<UUID-ROOT> /      ext4  noatime            0 1
UUID=<UUID-HOME> /home  ext4  noatime            0 2
```

---

# 9. Bootloader

Install GRUB:
```bash
emerge grub efibootmgr
grub-install --target=x86_64-efi --efi-directory=/efi --bootloader-id=Gentoo
grub-mkconfig -o /boot/grub/grub.cfg
```

Enable os-prober:
```bash
emerge --ask sys-boot/os-prober
echo 'GRUB_DISABLE_OS_PROBER=false' >> /etc/default/grub
grub-mkconfig -o /boot/grub/grub.cfg
```

If using Btrfs, install tools:
```bash
emerge --ask sys-fs/btrfs-progs
```

---

# 10. Network Services

systemd:
```bash
emerge net-misc/networkmanager
systemctl enable NetworkManager
```

OpenRC:
```bash
emerge net-misc/dhcpcd
rc-update add dhcpcd default
```

---

# 11. Display Server Choice (Wayland / X11)

- **Wayland**: Modern, recommended for KDE/ GNOME on AMD/Intel GPUs.  
- **X11**: Better compatibility for older software and some games.  

Set in `/etc/portage/make.conf`:
```conf
# Wayland
USE="wayland egl pipewire vulkan"

# Or X11
USE="X xwayland egl pipewire vulkan"
```

---

# 12. GPU Drivers & Microcode

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

## CPU Microcode
Intel:
```bash
emerge sys-firmware/intel-microcode
```
AMD:
```bash
emerge sys-firmware/amd-ucode
```

---

# 13. Desktop Environments (Optional)

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

💡 Tip: Skip this if you only want a server.

---

# 14. Users & sudo
```bash
passwd
useradd -m -G wheel,audio,video,usb -s /bin/bash zakk
passwd zakk
emerge app-admin/sudo
echo "%wheel ALL=(ALL) ALL" >> /etc/sudoers
```

⚠️ Replace `zakk` with your username.

---

# 15. SSHD (Optional)
```bash
emerge net-misc/openssh
systemctl enable sshd && systemctl start sshd
```

---

# 16. Reboot
```bash
exit
umount -R /mnt/gentoo
reboot
```

---

# 💡 FAQ
- ISO doesn’t boot → ensure you used dd mode (Linux `dd` or Rufus dd mode).  
- WPA3 may fail → use WPA2.  
- Filesystem choice: ext4 (safe), XFS (large files), Btrfs (snapshots).  
- os-prober disabled by default, enable if dual-booting.  
- Install btrfs-progs only if you use Btrfs.  

---

# 📚 References
- [Gentoo Handbook (Official)](https://wiki.gentoo.org/wiki/Handbook:AMD64/Full/Installation)  
- [Bitbili Tutorial](https://bitbili.net/gentoo-linux-installation-and-usage-tutorial.html)  
- [Rufus official website](https://rufus.ie/)  
- [List of tz database time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
