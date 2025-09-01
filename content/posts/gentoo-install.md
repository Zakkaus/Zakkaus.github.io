---
title: "Gentoo Installation Guide (Beginner v10)"
date: 2025-09-02
tags: ["Gentoo","Linux","OpenRC","systemd","KDE","GNOME","SSH","Wayland","Btrfs","UEFI","NVIDIA","AMD","Intel","iwd","wpa_supplicant"]
categories: ["Linux Notes"]
draft: false
toc: true
---

# 📚 Table of Contents
- [💻 My Hardware (Example)](#-my-hardware-example)
- [0. Download & Create Installation Media](#0-download--create-installation-media)
- [1. Boot & Network](#1-boot--network)
- [2. Partitioning (lsblk usage)](#2-partitioning-lsblk-usage)
- [3. Filesystems & Mounting](#3-filesystems--mounting)
- [4. Download Stage3 & chroot](#4-download-stage3--chroot)
- [5. Portage & Mirrors (with full makeconf)](#5-portage--mirrors-with-full-makeconf)
- [6. USE flags & Licenses (Beginner Solutions)](#6-use-flags--licenses-beginner-solutions)
- [7. Profile Selection (Desktop / Server)](#7-profile-selection-desktop--server)
- [7.x Localization (Language & Timezone)](#7x-localization-language--timezone)
- [8. Kernel Selection & Compilation (Full Commands)](#8-kernel-selection--compilation-full-commands)
- [9. Generate fstab (ext4 / Btrfs Examples)](#9-generate-fstab-ext4--btrfs-examples)
- [10. Install Bootloader (with os-prober)](#10-install-bootloader-with-os-prober)
- [11. Enable Networking (OpenRC / systemd)](#11-enable-networking-openrc--systemd)
- [12. Wayland / X11 Choice & USE](#12-wayland--x11-choice--use)
- [13. GPU Drivers & CPU Microcode](#13-gpu-drivers--cpu-microcode)
- [14. Desktop Environments (Optional)](#14-desktop-environments-optional)
- [15. Users & sudo](#15-users--sudo)
- [16. SSH (Optional)](#16-ssh-optional)
- [17. Reboot](#17-reboot)
- [💡 FAQ](#-faq)
- [📎 References](#-references)

---

# 💻 My Hardware (Example)
- **CPU**: AMD Ryzen 9 7950X3D (16C/32T)  
- **Motherboard**: ASUS ROG STRIX X670E-A GAMING WIFI  
- **RAM**: 64GB DDR5  
- **GPU**: NVIDIA RTX 4080 SUPER + AMD iGPU  
- **Storage**: NVMe SSD  
- **Dual boot**: Windows 11 + Gentoo  

> Example only. Steps apply to most x86_64 hardware.

---

## 0. Download & Create Installation Media

Official mirrors: <https://www.gentoo.org/downloads/mirrors/>

- **China**: must use domestic mirrors (USTC, TUNA, Aliyun).  
- **Taiwan**: Example: **NCHC**  
```bash
wget https://free.nchc.org.tw/gentoo/releases/amd64/autobuilds/current-install-amd64-minimal/install-amd64-minimal.iso
```

### Create USB Install Disk

**Linux (dd)**:  
```bash
sudo dd if=install-amd64-minimal.iso of=/dev/sdX bs=4M status=progress oflag=sync
```
Replace `sdX` with your USB device.

**Windows (Rufus)**: <https://rufus.ie/>  
1. Select USB + ISO  
2. Choose **dd mode**  
3. Start  

---

## 1. Boot & Network

### 1.1 UEFI or BIOS
```bash
ls /sys/firmware/efi
```
Exists → UEFI; else → Legacy BIOS

### 1.2 Wired
```bash
ip a
dhcpcd eno1
ping -c 3 gentoo.org
```

### 1.3 Wi‑Fi

**wpa_supplicant**:  
```bash
iw dev
wpa_passphrase "SSID" "PASSWORD" | tee /etc/wpa_supplicant/wpa_supplicant.conf
wpa_supplicant -B -i wlp9s0 -c /etc/wpa_supplicant/wpa_supplicant.conf
dhcpcd wlp9s0
ping -c 3 gentoo.org
```

**iwd (recommended for beginners)**:  
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

## 2. Partitioning (lsblk usage)

Check disk:  
```bash
lsblk -o NAME,SIZE,TYPE,MOUNTPOINT
```

Example output:  
```
nvme0n1    476G disk
├─nvme0n1p1 512M part
├─nvme0n1p2   1G part
├─nvme0n1p3 100G part
└─nvme0n1p4 375G part
```

Suggested layout:  
| Size | FS | Mount |
|---|---|---|
| 512M | FAT32 | /efi |
| 1G | ext4 | /boot |
| 100G+ | ext4/XFS/Btrfs | / |
| Rest | ext4/XFS/Btrfs | /home |

> Advanced users may use `cfdisk` or `gdisk` to edit partitions.

---

## 3. Filesystems & Mounting
*(same as v9, includes ext4/XFS/Btrfs formatting & mounting commands)*

---

## 4. Download Stage3 & chroot

### 4.1 Which Stage3?
- Use **standard Stage3 (glibc)**, choose **OpenRC** or **systemd**.  
- “desktop” builds exist but not required; use Profile later.

### 4.2 Download & Extract
```bash
cd /mnt/gentoo
links https://www.gentoo.org/downloads/mirrors/
tar xpvf stage3-*.tar.xz --xattrs-include='*.*' --numeric-owner
```

(Stage3 can also be downloaded from mirrors, same principle as ISO.)

---

## 5. Portage & Mirrors (with full makeconf)

### Sync Portage
```bash
emerge-webrsync
emerge --sync
```

### Choose mirrors
Interactive:  
```bash
emerge --ask app-portage/mirrorselect
mirrorselect -i -o >> /etc/portage/make.conf
```
Manual:  
```bash
echo 'GENTOO_MIRRORS="https://free.nchc.org.tw/gentoo/"' >> /etc/portage/make.conf
```

### Full make.conf example
```conf
COMMON_FLAGS="-march=native -O2 -pipe"
MAKEOPTS="-j32"
EMERGE_DEFAULT_OPTS="--ask --verbose --with-bdeps=y --complete-graph=y"
GENTOO_MIRRORS="https://free.nchc.org.tw/gentoo/"
USE="wayland egl pipewire vulkan"
# USE="X xwayland egl pipewire vulkan"
VIDEO_CARDS="nvidia"
# VIDEO_CARDS="amdgpu radeonsi"
# VIDEO_CARDS="intel i965 iris"
# VIDEO_CARDS="nouveau"
ACCEPT_LICENSE="*"
```

---

## 6. USE flags & Licenses (Beginner Solutions)

Check USE:  
```bash
emerge -pv firefox
```

Add USE safely:  
```bash
echo "media-video/ffmpeg X wayland" >> /etc/portage/package.use/ffmpeg
```

Add license:  
```bash
echo "www-client/google-chrome google-chrome" >> /etc/portage/package.license
```

> Tip: Always check with `emerge -pv` and follow hints.

---

## 7. Profile Selection (Desktop / Server)
```bash
eselect profile list
```

Examples:  
- KDE + systemd → `desktop/plasma/systemd`  
- GNOME + systemd → `desktop/gnome/systemd`  
- Desktop + OpenRC → `desktop` or `plasma/openrc`  
- Server → `default/linux/amd64/23.0`  

```bash
eselect profile set <id>
emerge -avuDN @world
```

---

## 7.x Localization (Language & Timezone)

Locales (`/etc/locale.gen`):  
```conf
en_US.UTF-8 UTF-8
en_AU.UTF-8 UTF-8
```
```bash
locale-gen
eselect locale set en_US.utf8
```

Timezone:  
```bash
ls /usr/share/zoneinfo
echo "Australia/Melbourne" > /etc/timezone
emerge --config sys-libs/timezone-data
```
[List of timezones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

---

## 8. Kernel Selection & Compilation (Full Commands)
*(same as v9: includes gentoo-kernel-bin and gentoo-sources with full commands, dracut/genkernel)*

---

## 9 ~ 14
*(same as v9: fstab, GRUB, networking, Wayland/X11, GPU, microcode, DEs)*

---

## 15. Users & sudo
```bash
passwd
useradd -m -G wheel,audio,video,usb -s /bin/bash zakk
passwd zakk
emerge app-admin/sudo
echo "%wheel ALL=(ALL) ALL" >> /etc/sudoers
```
> ⚠️ Replace `zakk` with your own username.

---

## 16. SSH (Optional)
```bash
emerge net-misc/openssh
systemctl enable sshd && systemctl start sshd
```

---

## 17. Reboot
```bash
exit
umount -R /mnt/gentoo
reboot
```

---

# 💡 FAQ
- Slow downloads → use nearest mirror, China requires domestic.  
- WPA3 unstable → try WPA2.  
- Wayland vs X11 → AMD/Intel: Wayland; Compatibility: X11.  
- NVIDIA → new cards proprietary, old → nouveau.  
- USE conflicts → fix with package.use.  
- License block → fix with package.license.  
- Btrfs/LUKS → initramfs recommended.  

---

# 📎 References
- Gentoo Handbook: <https://wiki.gentoo.org/wiki/Handbook:AMD64/Full/Installation>  
- Bitbili: <https://bitbili.net/gentoo-linux-installation-and-usage-tutorial.html>  
- Rufus: <https://rufus.ie/>  
- Timezones: <https://en.wikipedia.org/wiki/List_of_tz_database_time_zones>
