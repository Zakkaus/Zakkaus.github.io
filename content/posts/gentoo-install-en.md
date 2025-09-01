---
title: "Gentoo Installation Notes (English, Beginner-Friendly) — OpenRC / systemd, KDE / GNOME, SSH optional, Btrfs Subvolumes"
date: 2025-09-01
tags: ["Gentoo","Linux","OpenRC","systemd","KDE","GNOME","SSH","Wayland","Btrfs","UEFI"]
categories: ["Linux Notes"]
draft: false
toc: true
---

> Powered by Hugo & PaperMod  
> Step-by-step from LiveCD to desktop. Every section ends with **💡 Notes**.

---

# 💻 My Hardware (context)
- **CPU**: AMD Ryzen 9 7950X3D (16C/32T)  
- **Motherboard**: ASUS ROG STRIX X670E-A GAMING WIFI  
- **RAM**: 64GB DDR5 6400MHz  
- **GPU**: NVIDIA GeForce RTX 4080 SUPER (primary) + AMD Radeon iGPU  
- **Storage**: NVMe SSD  
- **Monitor**: Samsung Odyssey G9 49" 5120×1440  
- **Network**: Aussie Broadband 1000/50Mbps, Wi-Fi 7 BE9300, static public IP  
- **Dual boot**: Windows 11 + Gentoo  
- **Helper device**: MacBook Air M2 (16GB / 512GB)

---

# 2. Filesystems & Subvolumes

## 2.1 Make filesystems (⚠️ destructive)
```bash
mkfs.fat -F32 /dev/nvme0n1p1
mkfs.ext4 -L boot /dev/nvme0n1p2
mkfs.btrfs -L rootfs /dev/nvme0n1p3
mkfs.btrfs -L home   /dev/nvme0n1p4
```

## 2.2 Install Btrfs user-space tools
```bash
emerge --ask sys-fs/btrfs-progs
```

---

# 7. Get UUIDs & write fstab (**blkid**)

## 7.1 Get UUIDs
```bash
blkid
lsblk -f
```

## 7.2 Example `/etc/fstab`
```fstab
UUID=<UUID-ESP>    /efi      vfat   noatime,umask=0077 0 2
UUID=<UUID-BOOT>   /boot     ext4   noatime             0 2
UUID=<UUID-ROOT>   /         btrfs  noatime,compress=zstd,ssd,space_cache=v2,subvol=@      0 0
UUID=<UUID-ROOT>   /home     btrfs  noatime,compress=zstd,ssd,space_cache=v2,subvol=@home  0 0
UUID=<UUID-ROOT>   /var/log  btrfs  noatime,subvol=@log                                     0 0
UUID=<UUID-ROOT>   /var/tmp  btrfs  noatime,subvol=@tmp                                     0 0
```

---

# 8. Bootloader (UEFI GRUB)
```bash
emerge grub efibootmgr
grub-install --target=x86_64-efi --efi-directory=/efi --bootloader-id=Gentoo
grub-mkconfig -o /boot/grub/grub.cfg
```

## 8.1 Detect other OSes — os-prober
```bash
emerge --ask sys-boot/os-prober
nano /etc/default/grub
# Add or ensure:
GRUB_DISABLE_OS_PROBER=false
grub-mkconfig -o /boot/grub/grub.cfg
```
