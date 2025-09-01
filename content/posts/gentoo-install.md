---
title: "Gentoo Installation Guide (Beginner v9)"
date: 2025-09-01
tags: ["Gentoo","Linux","OpenRC","systemd","KDE","GNOME","SSH","Wayland","Btrfs","UEFI","NVIDIA","AMD","Intel","iwd","wpa_supplicant"]
categories: ["Linux Notes"]
draft: false
toc: true
---

# 📚 Table of Contents
- [💻 My Hardware (Example)](#-my-hardware-example)
- [0. Download & Create Installation Media](#0-download--create-installation-media)
- [1. Boot & Network](#1-boot--network)
- [2. Partitioning](#2-partitioning)
- [3. Filesystems & Mounting](#3-filesystems--mounting)
- [4. Download Stage3 & chroot](#4-download-stage3--chroot)
- [5. Portage & Mirrors (with full makeconf)](#5-portage--mirrors-with-full-makeconf)
- [6. Profile Selection (Desktop / Server)](#6-profile-selection-desktop--server)
- [6.x Localization (Language & Timezone)](#6x-localization-language--timezone)
- [7. Kernel Selection & Compilation (Full Commands)](#7-kernel-selection--compilation-full-commands)
- [8. Generate fstab (ext4 / Btrfs Examples)](#8-generate-fstab-ext4--btrfs-examples)
- [9. Install Bootloader (with os-prober)](#9-install-bootloader-with-os-prober)
- [10. Enable Networking (OpenRC / systemd)](#10-enable-networking-openrc--systemd)
- [11. Wayland / X11 Choice & USE](#11-wayland--x11-choice--use)
- [12. GPU Drivers & CPU Microcode](#12-gpu-drivers--cpu-microcode)
- [13. Desktop Environments (Optional)](#13-desktop-environments-optional)
- [14. Users & sudo](#14-users--sudo)
- [15. SSH (Optional)](#15-ssh-optional)
- [16. USE flags & Licenses (Beginner Solutions)](#16-use-flags--licenses-beginner-solutions)
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

> Example only. Steps apply broadly to x86_64 hardware.

---

## 0. Download & Create Installation Media

**Official mirror list**: <https://www.gentoo.org/downloads/mirrors/>

- **China**: Must use domestic mirrors (USTC, TUNA, Aliyun).  
- **Taiwan**: Example: **NCHC**  
```bash
wget https://free.nchc.org.tw/gentoo/releases/amd64/autobuilds/current-install-amd64-minimal/install-amd64-minimal.iso
```

### Create Bootable USB

**Linux (dd)**:  
```bash
sudo dd if=install-amd64-minimal.iso of=/dev/sdX bs=4M status=progress oflag=sync
```
Replace `sdX` with your USB device (e.g., `/dev/sdb`).

**Windows (Rufus)**: <https://rufus.ie/>  
1. Select USB & ISO  
2. Choose **dd mode**  
3. Start  

---

## 1. Boot & Network

### 1.1 Check UEFI or BIOS
```bash
ls /sys/firmware/efi
```
Exists = **UEFI**; otherwise Legacy BIOS.

### 1.2 Wired (Live environment)
```bash
ip a
dhcpcd eno1
ping -c 3 gentoo.org
```

### 1.3 Wi‑Fi (two options)

**wpa_supplicant**:  
```bash
iw dev
wpa_passphrase "SSID" "PASSWORD" | tee /etc/wpa_supplicant/wpa_supplicant.conf
wpa_supplicant -B -i wlp9s0 -c /etc/wpa_supplicant/wpa_supplicant.conf
dhcpcd wlp9s0
ping -c 3 gentoo.org
```

**iwd (simpler, recommended)**:  
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

## 2. Partitioning
```bash
lsblk -o NAME,SIZE,TYPE,MOUNTPOINT
cfdisk /dev/nvme0n1
```

**Suggested Layout** (UEFI):  
| Size | FS | Mount | Purpose |
|---|---|---|---|
| 512M | FAT32 | /efi | UEFI ESP |
| 1G | ext4 | /boot | Kernel/initramfs |
| 100G+ | ext4/XFS/Btrfs | / | Root |
| Rest | ext4/XFS/Btrfs | /home | User data |

---

## 3. Filesystems & Mounting

### 3.1 Format
**ext4**:  
```bash
mkfs.ext4 -L root /dev/nvme0n1p3
mkfs.ext4 -L home /dev/nvme0n1p4
```

**XFS**:  
```bash
mkfs.xfs -L root /dev/nvme0n1p3
mkfs.xfs -L home /dev/nvme0n1p4
```

**Btrfs**:  
```bash
mkfs.btrfs -L rootfs /dev/nvme0n1p3
mkfs.btrfs -L home   /dev/nvme0n1p4
```

### 3.2 Mount

**ext4 / XFS**:  
```bash
mount /dev/nvme0n1p3 /mnt/gentoo
mkdir -p /mnt/gentoo/{boot,home,efi}
mount /dev/nvme0n1p4 /mnt/gentoo/home
mount /dev/nvme0n1p2 /mnt/gentoo/boot
mount /dev/nvme0n1p1 /mnt/gentoo/efi
```

**Btrfs with subvolumes**:  
```bash
mount /dev/nvme0n1p3 /mnt/gentoo
btrfs subvolume create /mnt/gentoo/@
btrfs subvolume create /mnt/gentoo/@home
umount /mnt/gentoo

mount -o compress=zstd,subvol=@    /dev/nvme0n1p3 /mnt/gentoo
mkdir -p /mnt/gentoo/{boot,home,efi}
mount -o subvol=@home              /dev/nvme0n1p3 /mnt/gentoo/home
mount /dev/nvme0n1p2 /mnt/gentoo/boot
mount /dev/nvme0n1p1 /mnt/gentoo/efi
```

---

## 4. Download Stage3 & chroot

> **Which Stage3?**  
> - Use **standard Stage3 (glibc)**, with **OpenRC** or **systemd**.  
> - “Desktop” Stage3 exists but is not required. Better to pick standard Stage3 + correct Profile later.

### 4.1 Download & Extract
```bash
cd /mnt/gentoo
links https://www.gentoo.org/downloads/mirrors/
tar xpvf stage3-*.tar.xz --xattrs-include='*.*' --numeric-owner
```

### 4.2 Mount system dirs

**OpenRC**:  
```bash
mount -t proc /proc /mnt/gentoo/proc
mount --rbind /sys /mnt/gentoo/sys
mount --rbind /dev /mnt/gentoo/dev
```

**systemd**:  
```bash
mount -t proc /proc /mnt/gentoo/proc
mount --rbind /sys /mnt/gentoo/sys && mount --make-rslave /mnt/gentoo/sys
mount --rbind /dev /mnt/gentoo/dev && mount --make-rslave /mnt/gentoo/dev
mount --rbind /run /mnt/gentoo/run && mount --make-rslave /mnt/gentoo/run
```

### 4.3 Enter chroot
```bash
chroot /mnt/gentoo /bin/bash
source /etc/profile
export PS1="(chroot) $PS1"
```

---

## 5. Portage & Mirrors (with full make.conf)

### 5.1 Sync Portage
```bash
emerge-webrsync
emerge --sync
```

### 5.2 Choose Mirrors
**Interactive**:  
```bash
emerge --ask app-portage/mirrorselect
mirrorselect -i -o >> /etc/portage/make.conf
```
**Manual (keep only one)**:  
```bash
echo 'GENTOO_MIRRORS="https://free.nchc.org.tw/gentoo/"' >> /etc/portage/make.conf
```

### 5.3 Full `/etc/portage/make.conf` Example
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

## 6. Profile Selection (Desktop / Server)
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

## 6.x Localization (Language & Timezone)

**Locales**:  
```conf
en_US.UTF-8 UTF-8
en_AU.UTF-8 UTF-8
```
```bash
locale-gen
eselect locale set en_US.utf8
```

**Timezone**:  
```bash
ls /usr/share/zoneinfo
echo "Australia/Melbourne" > /etc/timezone
emerge --config sys-libs/timezone-data
```
[List of timezones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

**Fonts/Input (optional)**:  
```bash
emerge media-fonts/noto-cjk
emerge app-i18n/fcitx5 app-i18n/fcitx5-rime
```

---

## 7. Kernel Selection & Compilation (Full Commands)

**Prebuilt**:  
```bash
emerge sys-kernel/gentoo-kernel-bin
```

**Manual**:  
```bash
emerge sys-kernel/gentoo-sources
cd /usr/src/linux
make menuconfig
make -j"$(nproc)"
make modules_install
make install
```

**Initramfs**:  
```bash
# Dracut
emerge sys-kernel/dracut
dracut --kver "$(ls /lib/modules | sort -V | tail -1)"

# Genkernel
emerge sys-kernel/genkernel
genkernel initramfs
```

---

## 8. Generate fstab (ext4 / Btrfs Examples)
```bash
blkid
lsblk -f
```

**ext4**:  
```fstab
UUID=<UUID-ESP>  /efi   vfat  noatime,umask=0077 0 2
UUID=<UUID-BOOT> /boot  ext4  noatime            0 2
UUID=<UUID-ROOT> /      ext4  noatime            0 1
UUID=<UUID-HOME> /home  ext4  noatime            0 2
```

**Btrfs**:  
```fstab
UUID=<UUID-ESP>  /efi   vfat   noatime,umask=0077 0 2
UUID=<UUID-ROOT> /      btrfs  noatime,compress=zstd,subvol=@     0 1
UUID=<UUID-ROOT> /home  btrfs  noatime,compress=zstd,subvol=@home 0 2
```

---

## 9. Install Bootloader (with os-prober)
```bash
emerge grub efibootmgr
grub-install --target=x86_64-efi --efi-directory=/efi --bootloader-id=Gentoo
emerge --ask sys-boot/os-prober
echo 'GRUB_DISABLE_OS_PROBER=false' >> /etc/default/grub
grub-mkconfig -o /boot/grub/grub.cfg
emerge --ask sys-fs/btrfs-progs
```

---

## 10. Enable Networking (OpenRC / systemd)

**systemd**:  
```bash
emerge net-misc/networkmanager
systemctl enable NetworkManager
```

**OpenRC**:  
```bash
emerge net-misc/dhcpcd
rc-update add dhcpcd default
```

---

## 11. Wayland / X11 Choice & USE
```conf
USE="wayland egl pipewire vulkan"
# or
USE="X xwayland egl pipewire vulkan"
```

---

## 12. GPU Drivers & CPU Microcode

**NVIDIA Proprietary**:  
```conf
VIDEO_CARDS="nvidia"
```
```bash
emerge x11-drivers/nvidia-drivers
```

**Nouveau**:  
```conf
VIDEO_CARDS="nouveau"
```
```bash
emerge x11-base/xorg-drivers
```

**AMD**:  
```conf
VIDEO_CARDS="amdgpu radeonsi"
```
```bash
emerge mesa vulkan-loader
```

**Intel**:  
```conf
VIDEO_CARDS="intel i965 iris"
```
```bash
emerge mesa vulkan-loader
```

**CPU Microcode**:  
```bash
emerge sys-firmware/intel-microcode
emerge sys-firmware/amd-ucode
```

---

## 13. Desktop Environments (Optional)

**KDE Plasma**:  
```bash
emerge kde-plasma/plasma-meta x11-misc/sddm x11-base/xwayland
systemctl enable sddm
```

**GNOME**:  
```bash
emerge gnome-base/gnome gnome-base/gdm
systemctl enable gdm
```

---

## 14. Users & sudo
```bash
passwd
useradd -m -G wheel,audio,video,usb -s /bin/bash zakk
passwd zakk
emerge app-admin/sudo
echo "%wheel ALL=(ALL) ALL" >> /etc/sudoers
```

---

## 15. SSH (Optional)
```bash
emerge net-misc/openssh
systemctl enable sshd && systemctl start sshd
```

---

## 16. USE flags & Licenses (Beginner Solutions)

```bash
emerge -pv firefox
echo "media-video/ffmpeg X wayland" >> /etc/portage/package.use/ffmpeg
echo "www-client/google-chrome google-chrome" >> /etc/portage/package.license
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
- **Slow downloads**: use nearest mirror. China → domestic.  
- **Wi-Fi WPA3 unstable**: try WPA2.  
- **Wayland or X11**: AMD/Intel → Wayland; compatibility → X11.  
- **NVIDIA**: new cards proprietary; old → nouveau.  
- **USE conflicts**: `emerge -pv` → adjust `package.use`.  
- **License block**: add to `package.license`.  
- **Btrfs/LUKS**: initramfs recommended.  

---

# 📎 References
- Gentoo Handbook: <https://wiki.gentoo.org/wiki/Handbook:AMD64/Full/Installation>  
- Bitbili: <https://bitbili.net/gentoo-linux-installation-and-usage-tutorial.html>  
- Rufus: <https://rufus.ie/>  
- Timezones: <https://en.wikipedia.org/wiki/List_of_tz_database_time_zones>
