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
- [0. Boot & Network](#0-boot--network)
- [1. Partitioning](#1-partitioning)
- [2. Filesystems](#2-filesystems)
- [3. Stage3 & chroot](#3-stage3--chroot)
- [4. Portage & Mirrors](#4-portage--mirrors)
- [5. Profile & Locale](#5-profile--locale)
- [5.x Localization](#5x-localization)
- [6. Kernel](#6-kernel)
- [7. fstab & UUID](#7-fstab--uuid)
- [8. Bootloader](#8-bootloader)
- [9. Network Services](#9-network-services)
- [10. Display Server Choice (Wayland / X11)](#10-display-server-choice-wayland--x11)
- [11. GPU Drivers & Microcode](#11-gpu-drivers--microcode)
- [12. Desktop Environments (Optional)](#12-desktop-environments-optional)
- [13. Users & sudo](#13-users--sudo)
- [14. SSHD (Optional)](#14-sshd-optional)
- [15. Reboot](#15-reboot)
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

# 0. Boot & Network

## 0.1 Check UEFI
```bash
ls /sys/firmware/efi
```
- If this directory exists → **UEFI mode**  
- If not → Legacy BIOS

💡 Tip: Always use UEFI for modern systems.

## 0.2 Wired
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

## 0.4 Enable SSH on LiveCD (optional)
```bash
passwd
echo "PermitRootLogin yes" >> /etc/ssh/sshd_config
echo "PasswordAuthentication yes" >> /etc/ssh/sshd_config
/etc/init.d/sshd start   # OpenRC
systemctl start sshd     # systemd
ssh root@<LiveCD IP>
```

---

# 1. Partitioning
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

💡 Tip:  
- **ext4** → Default, stable and widely used.  
- **XFS** → Good for large files, not ideal for /boot.  
- **Btrfs** → Supports snapshots, subvolumes, compression.  

---

# 2. Filesystems

## 2.1 Format examples

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

💡 Tip: If using **Btrfs**, you can later create subvolumes for `/`, `/home`, `/var/log`, `/var/tmp`.  
If using **ext4/XFS**, just mount directly.

## 2.2 Mount
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

# 3. Stage3 & chroot

## 3.1 Download Stage3
```bash
cd /mnt/gentoo
links https://www.gentoo.org/downloads/mirrors/
tar xpvf stage3-*.tar.xz --xattrs-include='*.*' --numeric-owner
```

## 3.2 Mount system dirs

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

## 3.3 Enter chroot
```bash
chroot /mnt/gentoo /bin/bash
source /etc/profile
export PS1="(chroot) $PS1"
```

---

# 4. Portage & Mirrors

Sync Portage:
```bash
emerge-webrsync
emerge --sync
```

## 4.1 Select mirrors (mirrorselect)
```bash
emerge --ask app-portage/mirrorselect
mirrorselect -i -o >> /etc/portage/make.conf
```

💡 Tip: Choose a mirror near you (Australia → AARNET, Swinburne).

## 4.2 make.conf example
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

# 5. Profile & Locale
```bash
eselect profile list
eselect profile set <id>
emerge -avuDN @world
```

Set timezone (example Melbourne):
```bash
ls /usr/share/zoneinfo
ls /usr/share/zoneinfo/Australia
echo "Australia/Melbourne" > /etc/timezone
emerge --config sys-libs/timezone-data
```

Locales:
```conf
# /etc/locale.gen
en_US.UTF-8 UTF-8
```
```bash
locale-gen
eselect locale set en_US.utf8
```

---

# 5.x Localization

- Keep `en_US.UTF-8` for system messages.  
- Add extra locales if needed (`en_AU.UTF-8`, `fr_FR.UTF-8`, etc).  
- Fonts:  
  ```bash
  emerge media-fonts/noto-cjk
  ```
- Input methods (optional):  
  ```bash
  emerge app-i18n/fcitx5 app-i18n/fcitx5-rime
  ```

---

# 6. Kernel
Binary:
```bash
emerge sys-kernel/gentoo-kernel-bin
```
Manual:
```bash
emerge sys-kernel/gentoo-sources
cd /usr/src/linux
make menuconfig
make -j32
make modules_install
make install
```

---

# 7. fstab & UUID
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

💡 Tip: Replace with xfs/btrfs options if you use them. For Btrfs, add compression and subvolumes.

---

# 8. Bootloader
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

💡 Tip: If you use Btrfs, install tools here too:
```bash
emerge --ask sys-fs/btrfs-progs
```

---

# 9. Network Services
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

# 10. Display Server Choice (Wayland / X11)

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

# 11. GPU Drivers & Microcode

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

# 12. Desktop Environments (Optional)

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

# 13. Users & sudo
```bash
passwd
useradd -m -G wheel,audio,video,usb -s /bin/bash zakk
passwd zakk
emerge app-admin/sudo
echo "%wheel ALL=(ALL) ALL" >> /etc/sudoers
```

⚠️ Note: Replace `zakk` with your own username.

---

# 14. SSHD (Optional)
```bash
emerge net-misc/openssh
systemctl enable sshd && systemctl start sshd
```

---

# 15. Reboot
```bash
exit
umount -R /mnt/gentoo
reboot
```

---

# 💡 FAQ
- WPA3 may fail → Use WPA2  
- MAKEOPTS must match CPU threads (e.g. -j32 for 16C/32T)  
- Filesystem choice: ext4 (safe), XFS (large files), Btrfs (snapshots)  
- os-prober is disabled by default, enable if dual-booting  
- Install btrfs-progs only if using Btrfs

---

# 📚 References
- [Gentoo Handbook (Official)](https://wiki.gentoo.org/wiki/Handbook:AMD64/Full/Installation)  
- [Bitbili Tutorial](https://bitbili.net/gentoo-linux-installation-and-usage-tutorial.html)
