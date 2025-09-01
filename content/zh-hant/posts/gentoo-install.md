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

（同 v7，省略，附 Rufus 連結）

---

# 1. 開機與網路

## 1.1 Wi-Fi（補充 iwd 方法）
比起 `wpa_supplicant`，`iwd` 更簡單：
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

# 5. Portage 與軟體源

## 5.1 完整 make.conf 範例
```conf
# /etc/portage/make.conf

# 編譯選項
COMMON_FLAGS="-march=native -O2 -pipe"
MAKEOPTS="-j32"

# Portage 選項
EMERGE_DEFAULT_OPTS="--ask --verbose --with-bdeps=y --complete-graph=y"

# 使用的鏡像（⚠️ 請只保留一個，避免衝突）
GENTOO_MIRRORS="https://mirror.aarnet.edu.au/pub/gentoo/"

# 視覺與聲音支援
USE="X wayland pipewire vulkan egl"

# 顯示卡（請依照自己的硬體選）
VIDEO_CARDS="nvidia amdgpu radeonsi intel i965 iris"

# CPU 微碼
ACCEPT_LICENSE="*"
```

---

# 7. 內核選擇

## 7.2 gentoo-sources（自編譯）
在 `make menuconfig` 時：  
- **必選**：
  - `File systems → <*> Ext4`
  - `File systems → <*> Btrfs (需要時啟用)`
- **建議**：依照硬體啟用相應驅動（例如 NVMe、GPU）。

---

# 8. fstab 與 UUID

## 8.1 ext4 範例
```fstab
UUID=<UUID-ESP>  /efi   vfat  noatime,umask=0077 0 2
UUID=<UUID-BOOT> /boot  ext4  noatime            0 2
UUID=<UUID-ROOT> /      ext4  noatime            0 1
UUID=<UUID-HOME> /home  ext4  noatime            0 2
```

## 8.2 Btrfs 範例
```fstab
UUID=<UUID-ESP>  /efi   vfat   noatime,umask=0077 0 2
UUID=<UUID-ROOT> /      btrfs  noatime,compress=zstd,subvol=@     0 1
UUID=<UUID-ROOT> /home  btrfs  noatime,compress=zstd,subvol=@home 0 2
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

💡 建議：  
- **RTX 4000 系列建議用官方 nvidia-drivers**。  
- **舊款卡片可用 nouveau，但功能與效能較弱**。

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

# 16. USE flags 與 License

## 16.1 USE flags
```bash
# 查看套件可用 USE
emerge -pv firefox

# 為特定套件新增 USE
echo "media-video/ffmpeg X wayland" >> /etc/portage/package.use/ffmpeg
```

## 16.2 License
```bash
# 同意 Chrome 的授權
echo "www-client/google-chrome google-chrome" >> /etc/portage/package.license
```

💡 建議：使用 `echo` 而不是手動開檔編輯，避免新手錯誤。

---

# 💡 常見問題
- **USE 衝突**：執行 `emerge -pv package` → 根據輸出修改 `/etc/portage/package.use`。  
- **License 阻擋**：將授權寫入 `/etc/portage/package.license`。  
- **NVIDIA**：新卡 → `nvidia-drivers`；舊卡 → `nouveau`。  

---

# 📚 參考來源
- [Gentoo Handbook (官方)](https://wiki.gentoo.org/wiki/Handbook:AMD64/Full/Installation)  
- [Bitbili 教程](https://bitbili.net/gentoo-linux-installation-and-usage-tutorial.html)  
- [Rufus 官方網站](https://rufus.ie/)  
- [tz database 時區列表](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
