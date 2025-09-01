---
title: "Gentoo Installation Notes (English, Beginner-Friendly) — OpenRC / systemd, KDE / GNOME, SSH, Btrfs Subvolumes, os-prober"
date: 2025-09-01
tags: ["Gentoo","Linux","OpenRC","systemd","KDE","GNOME","SSH","Wayland","Btrfs","UEFI"]
categories: ["Linux Notes"]
draft: false
toc: true
---

> Powered by Hugo & PaperMod  
> Step-by-step guide from LiveCD to desktop. All commands are copy-paste ready. Each section ends with **💡 Notes**.

---

# 💻 My Hardware
- **CPU**: AMD Ryzen 9 7950X3D (16C/32T)
- **Motherboard**: ASUS ROG STRIX X670E-A GAMING WIFI
- **RAM**: 64GB DDR5 6400MHz
- **GPU**: NVIDIA GeForce RTX 4080 SUPER + AMD Radeon iGPU
- **Storage**: NVMe SSD
- **Monitor**: Samsung Odyssey G9 49" 5120×1440
- **Network**: Aussie Broadband 1000/50Mbps, Wi-Fi 7 Router BE9300, static public IP
- **Dual boot**: Windows 11 + Gentoo
- **Helper**: MacBook Air M2 (16GB / 512GB)

---

# 0. Boot & Networking

## 0.1 Check UEFI
```bash
test -d /sys/firmware/efi && echo "UEFI OK" || echo "Legacy BIOS"
```

## 0.2 Wired
```bash
ip a
dhcpcd eno1
ping -c 3 gentoo.org
```

## 0.3 Wi-Fi
```bash
iw dev
```
**iwctl**
```bash
iwctl
station wlp9s0 scan
station wlp9s0 get-networks
station wlp9s0 connect "SSID"
```
**wpa_supplicant**
```bash
wpa_passphrase "SSID" "PASSWORD" > /etc/wpa_supplicant/wpa_supplicant.conf
wpa_supplicant -B -i wlp9s0 -c /etc/wpa_supplicant/wpa_supplicant.conf
dhcpcd wlp9s0
```

## 0.4 Enable SSH on LiveCD (optional)
```bash
passwd
nano /etc/ssh/sshd_config
PermitRootLogin yes
PasswordAuthentication yes
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

Suggested:
- 512M /efi (FAT32)
- 1G /boot (ext4)
- 100G / (Btrfs)
- Rest /home (Btrfs)

---

# 2. Filesystems & Subvolumes

## 2.1 Format
```bash
mkfs.fat -F32 /dev/nvme0n1p1
mkfs.ext4 -L boot /dev/nvme0n1p2
mkfs.btrfs -L rootfs /dev/nvme0n1p3
mkfs.btrfs -L home /dev/nvme0n1p4
```

## 2.2 Install tools
```bash
emerge --ask sys-fs/btrfs-progs
```

## 2.3 Create subvolumes
```bash
mount /dev/nvme0n1p3 /mnt/gentoo
btrfs subvolume create /mnt/gentoo/@
btrfs subvolume create /mnt/gentoo/@home
btrfs subvolume create /mnt/gentoo/@log
btrfs subvolume create /mnt/gentoo/@tmp
umount /mnt/gentoo
```

## 2.4 Mount
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

# 4. Portage Setup
```bash
emerge-webrsync
emerge --sync
```

`/etc/portage/make.conf` example:
```conf
COMMON_FLAGS="-march=native -O2 -pipe"
MAKEOPTS="-j32"
GENTOO_MIRRORS="https://mirror.aarnet.edu.au/pub/gentoo/"
ACCEPT_LICENSE="*"
```

Quick config:
```bash
echo "*/* @FREE" >> /etc/portage/package.license
echo 'USE="wayland pipewire egl vulkan"' >> /etc/portage/make.conf
```

---

# 5. Profile & Locale
```bash
eselect profile list
eselect profile set <id>
emerge -avuDN @world
```

Timezone & locales:
```bash
echo "Australia/Melbourne" > /etc/timezone
emerge --config sys-libs/timezone-data
nano /etc/locale.gen
en_US.UTF-8 UTF-8
locale-gen
eselect locale set en_US.utf8
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
Check UUIDs:
```bash
blkid
lsblk -f
```

Example `/etc/fstab`:
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
```bash
emerge grub efibootmgr
grub-install --target=x86_64-efi --efi-directory=/efi --bootloader-id=Gentoo
grub-mkconfig -o /boot/grub/grub.cfg
```

## 8.1 Enable os-prober
```bash
emerge --ask sys-boot/os-prober
nano /etc/default/grub
GRUB_DISABLE_OS_PROBER=false
grub-mkconfig -o /boot/grub/grub.cfg
```

---

# 9. Networking
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

# 10. Desktop
KDE Plasma:
```bash
emerge kde-plasma/plasma-meta x11-misc/sddm x11-base/xwayland
systemctl enable sddm
```
GNOME:
```bash
emerge gnome-base/gnome gnome-base/gdm
systemctl enable gdm
```

---

# 11. User & sudo
```bash
passwd
useradd -m -G wheel,audio,video,usb -s /bin/bash zakk
passwd zakk
emerge app-admin/sudo
echo "%wheel ALL=(ALL) ALL" >> /etc/sudoers
```

---

# 12. (Optional) SSHD
```bash
emerge net-misc/openssh
systemctl enable sshd && systemctl start sshd
```

---

# 13. Reboot
```bash
exit
umount -R /mnt/gentoo
reboot
```

---

# 💡 FAQ
- WPA3 may fail → use WPA2-only during install  
- MAKEOPTS must be a number (e.g. -j32)  
- Btrfs: enable zstd compression, split subvolumes  
- os-prober is disabled by default, must be enabled
