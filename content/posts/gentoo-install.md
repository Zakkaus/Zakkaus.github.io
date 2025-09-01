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
- [3. Filesystems & Mounting](#3-filesystems--mounting)
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
- [16. USE flags & Licenses](#16-use-flags--licenses)
- [17. Reboot](#17-reboot)
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

(Same process as v7, use Rufus on Windows or dd on Linux)

---

# 1. Boot & Network

## 1.1 Wi-Fi (with iwd)
Instead of `wpa_supplicant`, `iwd` is simpler:
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

# 5. Portage & Mirrors

## 5.1 Example make.conf
```conf
# /etc/portage/make.conf

# Compiler flags
COMMON_FLAGS="-march=native -O2 -pipe"
MAKEOPTS="-j32"

# Portage options
EMERGE_DEFAULT_OPTS="--ask --verbose --with-bdeps=y --complete-graph=y"

# Mirror (⚠️ keep only one)
GENTOO_MIRRORS="https://mirror.aarnet.edu.au/pub/gentoo/"

# Audio & graphics
USE="X wayland pipewire vulkan egl"

# GPU (select based on your hardware)
VIDEO_CARDS="nvidia amdgpu radeonsi intel i965 iris"

# CPU microcode
ACCEPT_LICENSE="*"
```

---

# 7. Kernel Choices

## 7.2 gentoo-sources (manual)
During `make menuconfig`:  
- **Must enable**:  
  - `File systems → <*> Ext4`
  - `File systems → <*> Btrfs (if using Btrfs)`  
- **Tip**: enable NVMe, GPU, and other drivers specific to your system.

---

# 8. fstab & UUID

## 8.1 ext4 example
```fstab
UUID=<UUID-ESP>  /efi   vfat  noatime,umask=0077 0 2
UUID=<UUID-BOOT> /boot  ext4  noatime            0 2
UUID=<UUID-ROOT> /      ext4  noatime            0 1
UUID=<UUID-HOME> /home  ext4  noatime            0 2
```

## 8.2 Btrfs example
```fstab
UUID=<UUID-ESP>  /efi   vfat   noatime,umask=0077 0 2
UUID=<UUID-ROOT> /      btrfs  noatime,compress=zstd,subvol=@     0 1
UUID=<UUID-ROOT> /home  btrfs  noatime,compress=zstd,subvol=@home 0 2
```

---

# 12. GPU Drivers & Microcode

## NVIDIA proprietary driver
```conf
VIDEO_CARDS="nvidia"
```
```bash
emerge x11-drivers/nvidia-drivers
```

## NVIDIA open-source driver (nouveau)
```conf
VIDEO_CARDS="nouveau"
```
```bash
emerge x11-base/xorg-drivers
```

💡 Suggestion:  
- For RTX 4000+ series → use `nvidia-drivers`.  
- For older cards → `nouveau` is available but with limited performance.

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

---

# 16. USE flags & Licenses

## 16.1 USE flags
```bash
# Check package options
emerge -pv firefox

# Add USE flags per package
echo "media-video/ffmpeg X wayland" >> /etc/portage/package.use/ffmpeg
```

## 16.2 Licenses
```bash
# Accept Chrome license
echo "www-client/google-chrome google-chrome" >> /etc/portage/package.license
```

💡 Use `echo` to append instead of editing manually to avoid mistakes.

---

# 💡 FAQ
- **USE conflict** → run `emerge -pv package` and adjust `/etc/portage/package.use`.  
- **License block** → add to `/etc/portage/package.license`.  
- **NVIDIA** → new cards use proprietary driver, older cards may use nouveau.  

---

# 📚 References
- [Gentoo Handbook (Official)](https://wiki.gentoo.org/wiki/Handbook:AMD64/Full/Installation)  
- [Bitbili Tutorial](https://bitbili.net/gentoo-linux-installation-and-usage-tutorial.html)  
- [Rufus official website](https://rufus.ie/)  
- [List of tz database time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
