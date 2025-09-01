---
slug: gentoo-install
title: "Gentoo 安裝指南（新手）"
date: 2025-09-01
tags: ["Gentoo","Linux","OpenRC","systemd","KDE","GNOME","SSH","Wayland","Btrfs","UEFI","NVIDIA","AMD","Intel","iwd","wpa_supplicant"]
categories: ["Linux 筆記"]
draft: false
toc: true
---

<style>
/* TOC */
.gentoo-toc{border:1px solid var(--gtoc-border,#ddd);background:rgba(0,0,0,0.03);padding:.75rem 1rem;margin:1rem 0 1.5rem;border-radius:12px;font-size:.9rem;line-height:1.35;}
body.dark .gentoo-toc{background:rgba(255,255,255,0.05);border-color:#444;}
.gentoo-toc summary{cursor:pointer;font-weight:600;list-style:none;}
.gentoo-toc summary::-webkit-details-marker{display:none;}
.gentoo-toc ol{margin:0;padding:0;list-style:decimal;margin-left:1.1rem;display:grid;gap:.15rem;}
@media(min-width:760px){.gentoo-toc ol{grid-template-columns:repeat(auto-fill,minmax(250px,1fr));}}
.gentoo-toc a{text-decoration:none;color:inherit;}
.gentoo-toc a:hover{text-decoration:underline;color:#e1306c;}
body.dark .gentoo-toc a:hover{color:#ff6f9d;}

/* Article base + code (與英文一致) */
.gentoo-article{--g-accent:#e1306c;--g-code-bg:#2b2f36;--g-code-border:#3a4048;--g-border:#e1e1e3;--g-table-head:#f7f7f7;line-height:1.55;font-size:.97rem;}
body.dark .gentoo-article{--g-code-bg:#16181c;--g-code-border:#2b3036;--g-table-head:#262626;}
.gentoo-article h2{margin:2.25rem 0 1.1rem;padding:.55rem .9rem .55rem 1rem;border-left:6px solid var(--g-accent);background:linear-gradient(90deg,rgba(225,48,108,.08),rgba(0,0,0,0));border-radius:6px;font-size:1.26rem;}
.gentoo-article h3{margin:1.8rem 0 .85rem;padding:.4rem .65rem .4rem .75rem;border-left:4px solid var(--g-accent);background:linear-gradient(90deg,rgba(225,48,108,.05),rgba(0,0,0,0));border-radius:5px;font-size:1.08rem;}
.gentoo-article pre{background:var(--g-code-bg)!important;color:#f3f5f7!important;border:1px solid var(--g-code-border);padding:.85rem 1rem;margin:1.15rem 0;border-radius:10px;font-size:.84rem;line-height:1.45;overflow:auto;}
body.dark .gentoo-article pre{color:#e9ecef!important;}
.gentoo-article pre code{background:transparent!important;padding:0;border:none;font-size:inherit;color:inherit;}
.gentoo-article code:not(pre code){background:#343a40;color:#f8f9fa;padding:.18em .5em;border:1px solid #454d55;border-radius:6px;font-size:.78rem;}
body.dark .gentoo-article code:not(pre code){background:#22272e;border-color:#313a44;color:#e6e8ea;}
.gentoo-article blockquote{margin:1.2rem 0;padding:.75rem 1rem;border-left:4px solid var(--g-accent);background:rgba(0,0,0,0.04);border-radius:6px;}
body.dark .gentoo-article blockquote{background:rgba(255,255,255,0.05);}
.gentoo-article table{border-collapse:collapse;margin:1rem 0;font-size:.85rem;width:100%;border:1px solid var(--g-border);border-radius:10px;overflow:hidden;}
.gentoo-article table th,
.gentoo-article table td{padding:.55rem .7rem;border:1px solid var(--g-border);}
.gentoo-article table thead th{background:var(--g-table-head);}
.gentoo-article hr{margin:2.2rem 0;border:none;height:1px;background:linear-gradient(90deg,rgba(0,0,0,.08),rgba(0,0,0,0));}
body.dark .gentoo-article hr{background:linear-gradient(90deg,rgba(255,255,255,.18),rgba(255,255,255,0));}
.gentoo-article a:not(.cb-btn){color:var(--g-accent);text-decoration:none;}
.gentoo-article a:not(.cb-btn):hover{text-decoration:underline;}
body.dark .gentoo-article a:not(.cb-btn){color:#ff6f9d;}
</style>

<div class="gentoo-toc">
<details open>
  <summary>📚 目錄</summary>
  <ol>
    <li><a href="#my-hardware-example-zh">我的硬體（範例）</a></li>
    <li><a href="#0-下載與建立安裝媒體">0. 下載與建立安裝媒體</a></li>
    <li><a href="#1-開機與網路">1. 開機與網路</a></li>
    <li><a href="#2-分割區-lsblk-與-cfdisk">2. 分割區（lsblk 與 cfdisk）</a></li>
    <li><a href="#3-檔案系統格式化與掛載">3. 檔案系統格式化與掛載</a></li>
    <li><a href="#4-stage3-掛載與-chroot">4. Stage3、掛載與 chroot</a></li>
    <li><a href="#5-portage-與鏡像">5. Portage 與鏡像</a></li>
    <li><a href="#6-use-旗標與授權">6. USE 旗標與授權</a></li>
    <li><a href="#7-profile-選擇">7. Profile 選擇</a></li>
    <li><a href="#8-本地化語言與時區">8. 本地化（語言與時區）</a></li>
    <li><a href="#9-kernel-編譯">9. Kernel 編譯</a></li>
    <li><a href="#10-產生-fstab">10. 產生 fstab</a></li>
    <li><a href="#11-安裝-grub">11. 安裝 GRUB</a></li>
    <li><a href="#12-啟用網路">12. 啟用網路</a></li>
    <li><a href="#13-wayland-x11">13. Wayland / X11</a></li>
    <li><a href="#14-gpu-與微碼">14. GPU 與微碼</a></li>
    <li><a href="#15-桌面環境">15. 桌面環境</a></li>
    <li><a href="#16-使用者與-sudo">16. 使用者與 sudo</a></li>
    <li><a href="#17-ssh">17. SSH</a></li>
    <li><a href="#18-重新開機">18. 重新開機</a></li>
    <li><a href="#常見問題">常見問題</a></li>
    <li><a href="#參考資源">參考資源</a></li>
  </ol>
</details>
</div>

<div class="gentoo-article">

# 💻 我的硬體（範例） {#my-hardware-example-zh}
- **CPU**: AMD Ryzen 9 7950X3D (16C/32T)  
- **主機板**: ASUS ROG STRIX X670E-A GAMING WIFI  
- **記憶體**: 64GB DDR5  
- **顯示卡**: NVIDIA RTX 4080 SUPER + AMD iGPU  
- **儲存**: NVMe SSD  
- **雙系統**: Windows 11 + Gentoo  

> 此為示例，步驟適用於大多數 x86_64 平台。

---

## 0. 下載與建立安裝媒體 {#0-下載與建立安裝媒體}

官方鏡像列表：<https://www.gentoo.org/downloads/mirrors/>  
選離你最近的鏡像（例：台灣 NCHC、澳洲 AARNET、Kernel.org）。

### 0.1 下載 ISO
```bash
wget https://free.nchc.org.tw/gentoo/releases/amd64/autobuilds/current-install-amd64-minimal/install-amd64-minimal.iso
```

### 0.2 製作 USB 開機碟
Linux：
```bash
sudo dd if=install-amd64-minimal.iso of=/dev/sdX bs=4M status=progress oflag=sync
```
將 sdX 換成實際 USB 裝置。  
Windows（Rufus）：選 USB、ISO，建議 dd 模式寫入。

---

## 1. 開機與網路 {#1-開機與網路}

### 1.1 確認是否為 UEFI
```bash
ls /sys/firmware/efi
```
有輸出 → UEFI；否則 Legacy BIOS。

### 1.2 有線網路
```bash
ip a
dhcpcd eno1
ping -c 3 gentoo.org
```

### 1.3 Wi‑Fi

wpa_supplicant：
```bash
iw dev
wpa_passphrase "SSID" "PASSWORD" | tee /etc/wpa_supplicant/wpa_supplicant.conf
wpa_supplicant -B -i wlp9s0 -c /etc/wpa_supplicant/wpa_supplicant.conf
dhcpcd wlp9s0
ping -c 3 gentoo.org
```

iwd（推薦）：
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

## 2. 分割區（lsblk 與 cfdisk） {#2-分割區-lsblk-與-cfdisk}

列出磁碟：
```bash
lsblk -o NAME,SIZE,TYPE,MOUNTPOINT
```
範例：
```
nvme0n1    476G disk
├─nvme0n1p1 512M part
├─nvme0n1p2   1G part
├─nvme0n1p3 100G part
└─nvme0n1p4 375G part
```
互動式分割：
```bash
cfdisk /dev/nvme0n1
```

建議 UEFI 佈局：
| 大小 | FS | 掛載 | 用途 |
|------|----|------|------|
| 512M | FAT32 | /efi  | ESP |
| 1G   | ext4  | /boot | 核心 / initramfs |
| 100G+| ext4/XFS/Btrfs | / | Root |
| 餘下 | ext4/XFS/Btrfs | /home | 使用者資料 |

---

## 3. 檔案系統格式化與掛載 (ext4 / XFS / Btrfs) {#3-檔案系統格式化與掛載}

### 3.1 格式化

ext4：
```bash
mkfs.ext4 -L root /dev/nvme0n1p3
mkfs.ext4 -L home /dev/nvme0n1p4
```

XFS：
```bash
mkfs.xfs -L root /dev/nvme0n1p3
mkfs.xfs -L home /dev/nvme0n1p4
```

Btrfs：
```bash
mkfs.btrfs -L rootfs /dev/nvme0n1p3
mkfs.btrfs -L home   /dev/nvme0n1p4
# 若需覆蓋：加 -f
```

### 3.2 掛載

ext4 / XFS：
```bash
mount /dev/nvme0n1p3 /mnt/gentoo
mkdir -p /mnt/gentoo/{boot,home,efi}
mount /dev/nvme0n1p4 /mnt/gentoo/home
mount /dev/nvme0n1p2 /mnt/gentoo/boot
mount /dev/nvme0n1p1 /mnt/gentoo/efi
```

Btrfs（子卷）：
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

---

## 4. Stage3、掛載與 chroot {#4-stage3-掛載與-chroot}

### 4.1 選擇 Stage3
使用標準 glibc（OpenRC 或 systemd 版本皆可）。桌面變體可略。

### 4.2 下載與解壓
```bash
cd /mnt/gentoo
links https://www.gentoo.org/downloads/mirrors/
tar xpvf stage3-*.tar.xz --xattrs-include='*.*' --numeric-owner
```

### 4.3 掛載系統目錄

OpenRC：
```bash
mount -t proc /proc /mnt/gentoo/proc
mount --rbind /sys /mnt/gentoo/sys
mount --rbind /dev /mnt/gentoo/dev
```

systemd：
```bash
mount -t proc /proc /mnt/gentoo/proc
mount --rbind /sys /mnt/gentoo/sys && mount --make-rslave /mnt/gentoo/sys
mount --rbind /dev /mnt/gentoo/dev && mount --make-rslave /mnt/gentoo/dev
mount --rbind /run /mnt/gentoo/run && mount --make-rslave /mnt/gentoo/run
```

### 4.4 進入 chroot
```bash
chroot /mnt/gentoo /bin/bash
source /etc/profile
export PS1="(chroot) $PS1"
```

---

## 5. Portage 與鏡像 {#5-portage-與鏡像}

### 5.1 同步
```bash
emerge-webrsync
emerge --sync
```

### 5.2 鏡像選擇
互動：
```bash
emerge --ask app-portage/mirrorselect
mirrorselect -i -o >> /etc/portage/make.conf
```
手動：
```bash
echo 'GENTOO_MIRRORS="https://free.nchc.org.tw/gentoo/"' >> /etc/portage/make.conf
```

### 5.3 make.conf 範例
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

## 6. USE 旗標與授權 {#6-use-旗標與授權}

### 6.1 檢視
```bash
emerge -pv firefox
```

### 6.2 新增 USE
```bash
echo "media-video/ffmpeg X wayland" >> /etc/portage/package.use/ffmpeg
```

### 6.3 增加授權
```bash
echo "www-client/google-chrome google-chrome" >> /etc/portage/package.license
```

### 6.4 關鍵字（解鎖較新）
```bash
echo "www-client/google-chrome ~amd64" >> /etc/portage/package.accept_keywords
```

---

## 7. Profile 選擇 {#7-profile-選擇}

列出：
```bash
eselect profile list
```
範例：
- KDE + systemd → `default/linux/amd64/23.0/desktop/plasma/systemd`
- GNOME + systemd → `default/linux/amd64/23.0/desktop/gnome/systemd`
- Desktop + OpenRC → `default/linux/amd64/23.0/desktop`
- Server → `default/linux/amd64/23.0`

套用：
```bash
eselect profile set <id>
emerge -avuDN @world
```

---

## 8. 本地化（語言與時區） {#8-本地化語言與時區}

Locales：
```conf
en_US.UTF-8 UTF-8
en_AU.UTF-8 UTF-8
```
```bash
locale-gen
eselect locale set en_US.utf8
```

時區：
```bash
ls /usr/share/zoneinfo
echo "Australia/Melbourne" > /etc/timezone
emerge --config sys-libs/timezone-data
```

---

## 9. Kernel 編譯 {#9-kernel-編譯}

預建：
```bash
emerge sys-kernel/gentoo-kernel-bin
```

手動：
```bash
emerge sys-kernel/gentoo-sources
cd /usr/src/linux
make menuconfig
make -j"$(nproc)"
make modules_install
make install
```

Initramfs：
Dracut：
```bash
emerge sys-kernel/dracut
dracut --kver "$(ls /lib/modules | sort -V | tail -1)"
```
Genkernel：
```bash
emerge sys-kernel/genkernel
genkernel initramfs
```

---

## 10. 產生 fstab {#10-產生-fstab}

查 UUID：
```bash
blkid
lsblk -f
```

ext4：
```fstab
UUID=<UUID-ESP>  /efi   vfat  noatime,umask=0077 0 2
UUID=<UUID-BOOT> /boot  ext4  noatime            0 2
UUID=<UUID-ROOT> /      ext4  noatime            0 1
UUID=<UUID-HOME> /home  ext4  noatime            0 2
```
Btrfs：
```fstab
UUID=<UUID-ESP>  /efi   vfat   noatime,umask=0077 0 2
UUID=<UUID-ROOT> /      btrfs  noatime,compress=zstd,subvol=@     0 1
UUID=<UUID-ROOT> /home  btrfs  noatime,compress=zstd,subvol=@home 0 2
```

---

## 11. 安裝 GRUB {#11-安裝-grub}
```bash
emerge grub efibootmgr
grub-install --target=x86_64-efi --efi-directory=/efi --bootloader-id=Gentoo
emerge --ask sys-boot/os-prober
echo 'GRUB_DISABLE_OS_PROBER=false' >> /etc/default/grub
grub-mkconfig -o /boot/grub/grub.cfg
```
Btrfs：
```bash
emerge --ask sys-fs/btrfs-progs
```

---

## 12. 啟用網路 {#12-啟用網路}

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

## 13. Wayland / X11 {#13-wayland-x11}

Wayland：
```conf
USE="wayland egl pipewire vulkan"
```
X11：
```conf
USE="X xwayland egl pipewire vulkan"
```

---

## 14. GPU 與微碼 {#14-gpu-與微碼}

NVIDIA：
```conf
VIDEO_CARDS="nvidia"
```
```bash
emerge x11-drivers/nvidia-drivers
```

Nouveau：
```conf
VIDEO_CARDS="nouveau"
```
```bash
emerge x11-base/xorg-drivers
```

AMD：
```conf
VIDEO_CARDS="amdgpu radeonsi"
```
```bash
emerge mesa vulkan-loader
```

Intel：
```conf
VIDEO_CARDS="intel i965 iris"
```
```bash
emerge mesa vulkan-loader
```

CPU 微碼：
```bash
emerge sys-firmware/intel-microcode
emerge sys-firmware/amd-ucode
```

---

## 15. 桌面環境 {#15-桌面環境}

KDE Plasma：
```bash
emerge kde-plasma/plasma-meta x11-misc/sddm x11-base/xwayland
systemctl enable sddm
```
GNOME：
```bash
emerge gnome-base/gnome gnome-base/gdm
systemctl enable gdm
```

---

## 16. 使用者與 sudo {#16-使用者與-sudo}
```bash
passwd
useradd -m -G wheel,audio,video,usb -s /bin/bash zakk
passwd zakk
emerge app-admin/sudo
echo "%wheel ALL=(ALL) ALL" >> /etc/sudoers
```
> 將 zakk 換成你的使用者名稱。

---

## 17. SSH {#17-ssh}
```bash
emerge net-misc/openssh
systemctl enable sshd && systemctl start sshd
```

---

## 18. 重新開機 {#18-重新開機}
```bash
exit
umount -R /mnt/gentoo
reboot
```

---

# 常見問題 {#常見問題}
- 下載慢 → 換近鏡像  
- Wi‑Fi WPA3 不穩 → 改 WPA2  
- Wayland vs X11 → AMD/Intel 優先 Wayland；需要最大相容性選 X11  
- NVIDIA → 新卡專有驅動；老卡可試 nouveau（效能較低）  
- USE 衝突 → 先 `emerge -pv` 分析並拆到 package.use  
- 授權阻擋 → 加入 package.license  
- 要新版 → package.accept_keywords  
- Btrfs + LUKS/RAID → 建議使用 initramfs  

---

# 參考資源 {#參考資源}
- Gentoo Handbook: <https://wiki.gentoo.org/wiki/Handbook:AMD64/Full/Installation>
- Bitbili: <https://bitbili.net/gentoo-linux-installation-and-usage-tutorial.html>
- Rufus: <https://rufus.ie/>
- 時區列表: <https://en.wikipedia.org/wiki/List_of_tz_database_time_zones>
</div>
