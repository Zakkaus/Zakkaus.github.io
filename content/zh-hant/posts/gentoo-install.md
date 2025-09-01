---
title: "Gentoo 安裝指南（新手版 v9）"
date: 2025-09-01
tags: ["Gentoo","Linux","OpenRC","systemd","KDE","GNOME","SSH","Wayland","Btrfs","UEFI","NVIDIA","AMD","Intel","iwd","wpa_supplicant"]
categories: ["Linux筆記"]
draft: false
toc: true
---

# 📚 目錄
- [💻 我的電腦配置（示例）](#-我的電腦配置示例)
- [0. 下載與製作安裝媒體](#0-下載與製作安裝媒體)
- [1. 開機與網路](#1-開機與網路)
- [2. 磁碟分割](#2-磁碟分割)
- [3. 檔案系統與掛載](#3-檔案系統與掛載)
- [4. 下載 Stage3 與 chroot](#4-下載-stage3-與-chroot)
- [5. Portage 與鏡像源（含 makeconf 完整示例）](#5-portage-與鏡像源含-makeconf-完整示例)
- [6. 選擇 Profile（桌面／伺服器）](#6-選擇-profile桌面伺服器)
- [6.x 本地化 Localization（語言與時區）](#6x-本地化-localization語言與時區)
- [7. 內核選擇與編譯（完整指令）](#7-內核選擇與編譯完整指令)
- [8. 產生 fstab（含 Btrfs / ext4 範例）](#8-產生-fstab含-btrfs--ext4-範例)
- [9. 安裝開機器 GRUB（含 os-prober）](#9-安裝開機器-grub含-os-prober)
- [10. 網路服務啟用（OpenRC / systemd）](#10-網路服務啟用openrc--systemd)
- [11. Wayland / X11 選擇與 USE](#11-wayland--x11-選擇與-use)
- [12. 顯示卡與 CPU 微碼](#12-顯示卡與-cpu-微碼)
- [13. 桌面環境（可選）](#13-桌面環境可選)
- [14. 使用者與 sudo](#14-使用者與-sudo)
- [15. SSH（可選）](#15-ssh可選)
- [16. USE flags 與 License（新手解法）](#16-use-flags-與-license新手解法)
- [17. 重開機](#17-重開機)
- [💡 常見問題 FAQ](#-常見問題-faq)
- [📎 參考](#-參考)

---

# 💻 我的電腦配置（示例）
- **CPU**：AMD Ryzen 9 7950X3D（16C/32T）  
- **主機板**：ASUS ROG STRIX X670E-A GAMING WIFI  
- **RAM**：64GB DDR5  
- **GPU**：NVIDIA RTX 4080 SUPER + AMD iGPU  
- **儲存**：NVMe SSD  
- **雙系統**：Windows 11 + Gentoo  

> 以上僅為示例，安裝步驟對多數 x86_64 機器通用。

---

## 0. 下載與製作安裝媒體

**官方鏡像列表**：<https://www.gentoo.org/downloads/mirrors/>

- **中國大陸**：通常必須使用中國境內鏡像（中科大、清華、阿里雲等），否則速度與穩定性可能不足。  
- **台灣**：建議使用 **NCHC**。以下以 **NCHC** 為示例：

```bash
wget https://free.nchc.org.tw/gentoo/releases/amd64/autobuilds/current-install-amd64-minimal/install-amd64-minimal.iso
```

### 製作 USB 開機碟
**Linux（dd）**：
```bash
sudo dd if=install-amd64-minimal.iso of=/dev/sdX bs=4M status=progress oflag=sync
```
> 將 `sdX` 換成你的 USB 裝置名稱（如 `/dev/sdb`）。

**Windows（Rufus）**：<https://rufus.ie/>  
1. 選擇 USB 與 ISO → 2. 選擇 **dd 模式** → 3. Start。

---

## 1. 開機與網路

### 1.1 確認 UEFI 或 BIOS
```bash
ls /sys/firmware/efi
```
有輸出代表 **UEFI**；否則為 **Legacy BIOS**。

### 1.2 有線網路（Live 環境）
```bash
ip a
dhcpcd eno1           # 介面名稱依實際為準
ping -c 3 gentoo.org
```

### 1.3 Wi‑Fi（兩種工具擇一）

**wpa_supplicant**：
```bash
iw dev
wpa_passphrase "SSID" "PASSWORD" | tee /etc/wpa_supplicant/wpa_supplicant.conf
wpa_supplicant -B -i wlp9s0 -c /etc/wpa_supplicant/wpa_supplicant.conf
dhcpcd wlp9s0
ping -c 3 gentoo.org
```

**iwd（更簡單，推薦新手）**：
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

## 2. 磁碟分割
```bash
lsblk -o NAME,SIZE,TYPE,MOUNTPOINT
cfdisk /dev/nvme0n1
```
**建議分割**（UEFI）：

| 大小 | 檔案系統 | 掛載點 | 說明 |
|---|---|---|---|
| 512M | FAT32 | /efi | UEFI 系統分割區 |
| 1G | ext4 | /boot | Kernel / initramfs |
| 100G 起 | ext4 / XFS / Btrfs | / | Root |
| 其餘 | ext4 / XFS / Btrfs | /home | 使用者資料 |

---

## 3. 檔案系統與掛載

### 3.1 格式化
**ext4**：
```bash
mkfs.ext4 -L root /dev/nvme0n1p3
mkfs.ext4 -L home /dev/nvme0n1p4
```

**XFS**：
```bash
mkfs.xfs -L root /dev/nvme0n1p3
mkfs.xfs -L home /dev/nvme0n1p4
```

**Btrfs**：
```bash
mkfs.btrfs -L rootfs /dev/nvme0n1p3
mkfs.btrfs -L home   /dev/nvme0n1p4
```

### 3.2 掛載（完整示例）

**ext4 / XFS**：
```bash
mount /dev/nvme0n1p3 /mnt/gentoo
mkdir -p /mnt/gentoo/{boot,home,efi}
mount /dev/nvme0n1p4 /mnt/gentoo/home
mount /dev/nvme0n1p2 /mnt/gentoo/boot
mount /dev/nvme0n1p1 /mnt/gentoo/efi
```

**Btrfs 子卷**：
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

## 4. 下載 Stage3 與 chroot

> **下載哪個 Stage3？**  
> - 建議下載 **一般 Stage3（glibc）**，並依喜好選 **OpenRC** 或 **systemd**。  
> - 「stage3-desktop」若出現，僅是預設偏向桌面用途的基礎設定，**非必須**；新手使用一般 Stage3 + 之後選對 **Profile** 更靈活。

### 4.1 下載與解壓
```bash
cd /mnt/gentoo
links https://www.gentoo.org/downloads/mirrors/
tar xpvf stage3-*.tar.xz --xattrs-include='*.*' --numeric-owner
```

### 4.2 掛載系統目錄

**OpenRC**：
```bash
mount -t proc /proc /mnt/gentoo/proc
mount --rbind /sys /mnt/gentoo/sys
mount --rbind /dev /mnt/gentoo/dev
```

**systemd**：
```bash
mount -t proc /proc /mnt/gentoo/proc
mount --rbind /sys /mnt/gentoo/sys && mount --make-rslave /mnt/gentoo/sys
mount --rbind /dev /mnt/gentoo/dev && mount --make-rslave /mnt/gentoo/dev
mount --rbind /run /mnt/gentoo/run && mount --make-rslave /mnt/gentoo/run
```

### 4.3 進入 chroot
```bash
chroot /mnt/gentoo /bin/bash
source /etc/profile
export PS1="(chroot) $PS1"
```

---

## 5. Portage 與鏡像源（含 make.conf 完整示例）

### 5.1 同步 Portage
```bash
emerge-webrsync
emerge --sync
```

### 5.2 選擇鏡像源（二選一）
- **工具互動選擇**：
  ```bash
  emerge --ask app-portage/mirrorselect
  mirrorselect -i -o >> /etc/portage/make.conf
  ```
- **手動指定（建議僅保留一個）**：
  ```bash
  echo 'GENTOO_MIRRORS="https://free.nchc.org.tw/gentoo/"' >> /etc/portage/make.conf
  ```

> ⚠️ **避免衝突**：`mirrorselect` 會追加多個鏡像；若你手動寫了 `GENTOO_MIRRORS`，建議最終**保留一個**速度最快的鏡像。

### 5.3 `/etc/portage/make.conf` 完整示例（含註解）
```conf
# /etc/portage/make.conf

# 編譯器參數：O2 與 pipe 足夠，多數時候不需要 -Ofast
COMMON_FLAGS="-march=native -O2 -pipe"

# 編譯平行數：通常為 CPU 執行緒數
MAKEOPTS="-j32"

# Portage 預設行為：互動確認、顯示資訊、拉進建置依賴、完整圖
EMERGE_DEFAULT_OPTS="--ask --verbose --with-bdeps=y --complete-graph=y"

# 鏡像：建議僅保留一條（下例為台灣 NCHC）
GENTOO_MIRRORS="https://free.nchc.org.tw/gentoo/"

# 全域 USE：Wayland 或 X11 擇一，也可同時保留 xwayland
# （新手可先 Wayland；遊戲／相容性需求可加 X xwayland）
USE="wayland egl pipewire vulkan"
# USE="X xwayland egl pipewire vulkan"

# 顯示卡：依你的硬體選擇（不要全部抄，留下自己需要的）
# 例：NVIDIA 新卡
VIDEO_CARDS="nvidia"
# 例：AMD
# VIDEO_CARDS="amdgpu radeonsi"
# 例：Intel
# VIDEO_CARDS="intel i965 iris"
# 例：老 NVIDIA（或想用開源）
# VIDEO_CARDS="nouveau"

# 接受授權：新手可先開放全部，之後再細化到 package.license
ACCEPT_LICENSE="*"
```

---

## 6. 選擇 Profile（桌面／伺服器）

```bash
eselect profile list
```

常見選擇：
- **KDE + systemd**：`default/linux/amd64/23.0/desktop/plasma/systemd`  
- **GNOME + systemd**：`default/linux/amd64/23.0/desktop/gnome/systemd`  
- **桌面 + OpenRC**：`default/linux/amd64/23.0/desktop`（或對應 plasma/openrc 變體）  
- **伺服器**：`default/linux/amd64/23.0`（不含桌面化 USE）

設定：
```bash
eselect profile set <編號>
emerge -avuDN @world
```

> 💡 Profile 會預設一組 USE 與套件選擇方向。你仍可透過 `package.use` 做精細化調整。

---

## 6.x 本地化 Localization（語言與時區）

**語言（/etc/locale.gen）**：
```conf
en_US.UTF-8 UTF-8
zh_TW.UTF-8 UTF-8
```
產生與套用：
```bash
locale-gen
eselect locale set en_US.utf8
```

**時區**：
```bash
ls /usr/share/zoneinfo
echo "Asia/Taipei" > /etc/timezone
emerge --config sys-libs/timezone-data
```
（完整清單：<https://en.wikipedia.org/wiki/List_of_tz_database_time_zones>）

**中文字型與輸入法（可選）**：
```bash
emerge media-fonts/noto-cjk
emerge app-i18n/fcitx5 app-i18n/fcitx5-rime
```

---

## 7. 內核選擇與編譯（完整指令）

### 7.1 最簡：預編譯內核
```bash
emerge sys-kernel/gentoo-kernel-bin
```

### 7.2 進階：自編譯 gentoo-sources
```bash
emerge sys-kernel/gentoo-sources
cd /usr/src/linux
make menuconfig         # 依硬體啟用：NVMe、ext4、（需要則）Btrfs、GPU、USB、網卡等
make -j"$(nproc)"
make modules_install
make install
```

**（可選）建立 initramfs**  
- 用 **dracut**：
  ```bash
  emerge sys-kernel/dracut
  dracut --kver "$(ls /lib/modules | sort -V | tail -1)"
  ```
- 或用 **genkernel**：
  ```bash
  emerge sys-kernel/genkernel
  genkernel initramfs
  ```

> 提示：若 root 在 Btrfs / LUKS，使用 initramfs 較保險。

---

## 8. 產生 fstab（含 Btrfs / ext4 範例）

查詢 UUID：
```bash
blkid
lsblk -f
```

**ext4 範例**：
```fstab
UUID=<UUID-ESP>  /efi   vfat  noatime,umask=0077 0 2
UUID=<UUID-BOOT> /boot  ext4  noatime            0 2
UUID=<UUID-ROOT> /      ext4  noatime            0 1
UUID=<UUID-HOME> /home  ext4  noatime            0 2
```

**Btrfs（子卷）範例**：
```fstab
UUID=<UUID-ESP>  /efi   vfat   noatime,umask=0077 0 2
UUID=<UUID-ROOT> /      btrfs  noatime,compress=zstd,subvol=@     0 1
UUID=<UUID-ROOT> /home  btrfs  noatime,compress=zstd,subvol=@home 0 2
```

---

## 9. 安裝開機器 GRUB（含 os-prober）
```bash
emerge grub efibootmgr
grub-install --target=x86_64-efi --efi-directory=/efi --bootloader-id=Gentoo
emerge --ask sys-boot/os-prober
echo 'GRUB_DISABLE_OS_PROBER=false' >> /etc/default/grub
grub-mkconfig -o /boot/grub/grub.cfg
```

> 若使用 Btrfs，請安裝工具：  
```bash
emerge --ask sys-fs/btrfs-progs
```

---

## 10. 網路服務啟用（OpenRC / systemd）

**systemd（桌面常用）**：
```bash
emerge net-misc/networkmanager
systemctl enable NetworkManager
```

**OpenRC（傳統）**：
```bash
emerge net-misc/dhcpcd
rc-update add dhcpcd default
```

---

## 11. Wayland / X11 選擇與 USE

**建議（其一）**：
```conf
# Wayland 為主
USE="wayland egl pipewire vulkan"
```
或
```conf
# X11 相容性較佳（舊程式／部分遊戲）
USE="X xwayland egl pipewire vulkan"
```

---

## 12. 顯示卡與 CPU 微碼

**NVIDIA 專有驅動**：
```conf
VIDEO_CARDS="nvidia"
```
```bash
emerge x11-drivers/nvidia-drivers
```

**NVIDIA 開源 nouveau（功能較有限）**：
```conf
VIDEO_CARDS="nouveau"
```
```bash
emerge x11-base/xorg-drivers
```

**AMD**：
```conf
VIDEO_CARDS="amdgpu radeonsi"
```
```bash
emerge mesa vulkan-loader
```

**Intel**：
```conf
VIDEO_CARDS="intel i965 iris"
```
```bash
emerge mesa vulkan-loader
```

**CPU 微碼（請以代碼區塊執行）**：
```bash
# Intel
emerge sys-firmware/intel-microcode

# AMD
emerge sys-firmware/amd-ucode
```

---

## 13. 桌面環境（可選）

**KDE Plasma**：
```bash
emerge kde-plasma/plasma-meta x11-misc/sddm x11-base/xwayland
systemctl enable sddm
```

**GNOME**：
```bash
emerge gnome-base/gnome gnome-base/gdm
systemctl enable gdm
```

---

## 14. 使用者與 sudo
```bash
passwd
useradd -m -G wheel,audio,video,usb -s /bin/bash zakk
passwd zakk
emerge app-admin/sudo
echo "%wheel ALL=(ALL) ALL" >> /etc/sudoers
```

---

## 15. SSH（可選）
```bash
emerge net-misc/openssh
systemctl enable sshd && systemctl start sshd
```

---

## 16. USE flags 與 License（新手解法）

**查套件需要哪些 USE**：
```bash
emerge -pv firefox
```

**對特定套件新增 USE（用 echo，避免手動編輯出錯）**：
```bash
echo "media-video/ffmpeg X wayland" >> /etc/portage/package.use/ffmpeg
```

**同意授權（例如 Chrome）**：
```bash
echo "www-client/google-chrome google-chrome" >> /etc/portage/package.license
```

> 若遇到「衝突」或「遮罩」，閱讀 `emerge -pv` 的輸出，依指示在 `package.use` 或 `package.accept_keywords` 中調整。

---

## 17. 重開機
```bash
exit
umount -R /mnt/gentoo
reboot
```

---

# 💡 常見問題 FAQ
- **下載速度慢／超時**：中國大陸務必使用境內鏡像；其他地區選離你近的鏡像。  
- **WPA3 不穩**：先嘗試 WPA2。  
- **Wayland or X11？**：AMD/Intel 新平台可優先 Wayland；相容性需求選 X11 + xwayland。  
- **NVIDIA 選擇**：RTX 4000 建議 `nvidia-drivers`；舊卡或追求開源可試 `nouveau`（效能較低）。  
- **USE 衝突**：`emerge -pv <pkg>` 看提示，將建議的 USE 寫入 `/etc/portage/package.use/`。  
- **License 阻擋**：把授權加入 `/etc/portage/package.license`。  
- **Btrfs 要不要 initramfs？**：非必須，但若用 LUKS/RAID/模組化驅動，建議建立。  

---

# 📎 參考
- Gentoo Handbook：<https://wiki.gentoo.org/wiki/Handbook:AMD64/Full/Installation>  
- Bitbili：<https://bitbili.net/gentoo-linux-installation-and-usage-tutorial.html>  
- Rufus：<https://rufus.ie/>  
- 時區列表：<https://en.wikipedia.org/wiki/List_of_tz_database_time_zones>
