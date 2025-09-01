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
.gentoo-toc{border:1px solid var(--gtoc-border,#ddd);background:rgba(0,0,0,0.03);padding:.75rem 1rem;margin:1rem 0 1.5rem;border-radius:12px;font-size:.9rem;line-height:1.35;}
body.dark .gentoo-toc{background:rgba(255,255,255,0.05);border-color:#444;}
.gentoo-toc details[open]>summary{margin-bottom:.35rem;}
.gentoo-toc summary{cursor:pointer;font-weight:600;list-style:none;outline:none;}
.gentoo-toc summary::-webkit-details-marker{display:none;}
.gentoo-toc ol{margin:0;padding:0;list-style:decimal;margin-left:1.1rem;display:grid;gap:.15rem;}
@media(min-width:760px){.gentoo-toc ol{grid-template-columns:repeat(auto-fill,minmax(250px,1fr));}}
.gentoo-toc a{text-decoration:none;color:inherit;}
.gentoo-toc a:hover{text-decoration:underline;color:#e1306c;}
body.dark .gentoo-toc a:hover{color:#ff6f9d;}
</style>

<div class="gentoo-toc">
<details open>
  <summary>📚 目錄</summary>
  <ol>
    <li><a href="#-我的硬體範例">我的硬體（範例）</a></li>
    <li><a href="#0-下載與建立安裝媒體">0. 下載與建立安裝媒體</a></li>
    <li><a href="#1-開機與網路">1. 開機與網路</a></li>
    <li><a href="#2-分割區">2. 分割區</a></li>
    <li><a href="#3-檔案系統格式化與掛載">3. 檔案系統與掛載</a></li>
    <li><a href="#4-stage3-下載與-chroot">4. Stage3 與 chroot</a></li>
    <li><a href="#5-portage-與鏡像源">5. Portage 與鏡像</a></li>
    <li><a href="#6-use-旗標與授權">6. USE 與授權</a></li>
    <li><a href="#7-設定-profile">7. Profile 選擇</a></li>
    <li><a href="#8-在地化語言與時區">8. 在地化</a></li>
    <li><a href="#9-kernel-內核">9. Kernel</a></li>
    <li><a href="#10-fstab-生成">10. fstab</a></li>
    <li><a href="#11-grub-開機載入器">11. GRUB</a></li>
    <li><a href="#12-網路啟用">12. 網路啟用</a></li>
    <li><a href="#13-wayland--x11">13. Wayland / X11</a></li>
    <li><a href="#14-gpu-與-cpu-微碼">14. GPU / 微碼</a></li>
    <li><a href="#15-桌面環境可選">15. 桌面環境</a></li>
    <li><a href="#16-使用者與-sudo">16. 使用者與 sudo</a></li>
    <li><a href="#17-ssh-可選">17. SSH</a></li>
    <li><a href="#18-重新開機">18. 重新開機</a></li>
    <li><a href="#-常見問題">常見問題</a></li>
    <li><a href="#-參考資源">參考資源</a></li>
  </ol>
</details>
</div>

# 💻 我的硬體（範例）
- **CPU**: AMD Ryzen 9 7950X3D (16C/32T)  
- **主機板**: ASUS ROG STRIX X670E-A GAMING WIFI  
- **記憶體**: 64GB DDR5  
- **顯示卡**: NVIDIA RTX 4080 SUPER + AMD iGPU  
- **儲存**: NVMe SSD  
- **雙開機**: Windows 11 + Gentoo  

> 此為示例，多數 x86_64 硬體流程相同。

---

## 0. 下載與建立安裝媒體
官方鏡像列表：<https://www.gentoo.org/downloads/mirrors/>  
挑離你最近的鏡像（台灣 NCHC、澳洲 AARNET、Kernel.org 等）。

### 0.1 下載 ISO（例：NCHC）
```bash
wget https://free.nchc.org.tw/gentoo/releases/amd64/autobuilds/current-install-amd64-minimal/install-amd64-minimal.iso
```

### 0.2 建立 USB 安裝碟
Linux：
```bash
sudo dd if=install-amd64-minimal.iso of=/dev/sdX bs=4M status=progress oflag=sync
```
Windows（Rufus）：<https://rufus.ie/>

---

## 1. 開機與網路
### 1.1 確認 UEFI / BIOS
```bash
ls /sys/firmware/efi
```
存在表示 UEFI。

### 1.2 有線
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
```
iwd（推薦）：
```bash
emerge net-wireless/iwd
systemctl enable iwd
systemctl start iwd
iwctl
```

---

## 2. 分割區
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

啟動分割工具（可選）：
```bash
cfdisk /dev/nvme0n1
```

**建議分割（UEFI）**：  

| 大小 | 檔案系統 | 掛載點 | 說明 |
|---|---|---|---|
| 512M | FAT32 | /efi | ESP（UEFI 系統分割區） |
| 1G | ext4 | /boot | kernel、initramfs |
| 100G+ | ext4 / XFS / Btrfs | / | 根分割區 |
| 其餘 | ext4 / XFS / Btrfs | /home | 使用者家目錄 |

> 你也可以選擇只有 / 與 /efi 的簡化方案。

---

## 3. 檔案系統格式化與掛載（ext4 / XFS / Btrfs）

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

**Btrfs**（必要時可用 `-f` 強制覆蓋，⚠️ 會抹除該分割區資料）：
```bash
mkfs.btrfs -L rootfs /dev/nvme0n1p3
mkfs.btrfs -L home   /dev/nvme0n1p4
# 需要強制時：mkfs.btrfs -f -L rootfs /dev/nvme0n1p3
```

### 3.2 掛載（完整流程）

**ext4 / XFS**：
```bash
mount /dev/nvme0n1p3 /mnt/gentoo
mkdir -p /mnt/gentoo/{boot,home,efi}
mount /dev/nvme0n1p4 /mnt/gentoo/home
mount /dev/nvme0n1p2 /mnt/gentoo/boot
mount /dev/nvme0n1p1 /mnt/gentoo/efi
```

**Btrfs（子卷）**：
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

## 4. 下載 Stage3、掛載系統目錄與 chroot

### 4.1 選擇 Stage3
- 建議下載 **標準 Stage3（glibc）**，依需求選 **OpenRC** 或 **systemd**。  
- 「desktop」Stage3 只是預設桌面化 USE，**非必須**；用標準 Stage3 + 正確 **Profile** 更靈活。

### 4.2 下載與解壓
```bash
cd /mnt/gentoo
links https://www.gentoo.org/downloads/mirrors/
tar xpvf stage3-*.tar.xz --xattrs-include='*.*' --numeric-owner
```

> 同 ISO，一樣可選擇就近的鏡像源下載 Stage3。

### 4.3 掛載系統目錄（依 init 系統不同）
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

### 4.4 進入 chroot
```bash
chroot /mnt/gentoo /bin/bash
source /etc/profile
export PS1="(chroot) $PS1"
```

---

## 5. Portage 與鏡像源（含 makeconf 完整示例）

### 5.1 同步 Portage 樹
```bash
emerge-webrsync
emerge --sync
```

### 5.2 選擇鏡像源（擇一）
**互動工具**：
```bash
emerge --ask app-portage/mirrorselect
mirrorselect -i -o >> /etc/portage/make.conf
```
**手動指定（建議最終只保留一條）**：
```bash
echo 'GENTOO_MIRRORS="https://free.nchc.org.tw/gentoo/"' >> /etc/portage/make.conf
```

> ⚠️ 避免重複與衝突：`mirrorselect` 可能加入多條鏡像，建議最後僅保留速度最快的一條。

### 5.3 `/etc/portage/make.conf` 完整示例（含註解）
```conf
# 編譯器參數：O2 與 pipe 足夠，多數情況不需要 -Ofast
COMMON_FLAGS="-march=native -O2 -pipe"

# 平行編譯：通常設成 CPU 執行緒數
MAKEOPTS="-j32"

# Portage 預設行為：互動、詳細、拉進建置依賴、完整圖
EMERGE_DEFAULT_OPTS="--ask --verbose --with-bdeps=y --complete-graph=y"

# 鏡像：請最終僅保留一條（下例為台灣 NCHC）
GENTOO_MIRRORS="https://free.nchc.org.tw/gentoo/"

# 全域 USE（兩套典型選擇二擇一；也可同時保留 xwayland 做相容）
USE="wayland egl pipewire vulkan"
# USE="X xwayland egl pipewire vulkan"

# 顯示卡：請只填你的硬體（不要全抄）
# 例：NVIDIA 新卡
VIDEO_CARDS="nvidia"
# 例：AMD
# VIDEO_CARDS="amdgpu radeonsi"
# 例：Intel
# VIDEO_CARDS="intel i965 iris"
# 例：老 NVIDIA 或想用開源
# VIDEO_CARDS="nouveau"

# 接受授權：新手可暫時開放全部，之後細化至 package.license
ACCEPT_LICENSE="*"
```

---

## 6. USE flags 與 License（新手解法）

### 6.1 查詢與理解 USE
```bash
emerge -pv firefox
```
閱讀輸出中 `USE="..."` 與遮罩提示，了解需要啟用或停用哪些旗標。

### 6.2 對單一套件加入 USE（用 echo，避免手動編輯出錯）
```bash
echo "media-video/ffmpeg X wayland" >> /etc/portage/package.use/ffmpeg
```

### 6.3 同意授權（例：Chrome）
```bash
echo "www-client/google-chrome google-chrome" >> /etc/portage/package.license
```

### 6.4 關鍵詞（如需解鎖軟體版本）
```bash
echo "www-client/google-chrome ~amd64" >> /etc/portage/package.accept_keywords
```
> 僅在需要較新（測試）版本時使用。

---

## 7. 選擇 Profile（桌面／伺服器）

列出可用 Profile：
```bash
eselect profile list
```

常見選擇：
- **KDE + systemd**：`default/linux/amd64/23.0/desktop/plasma/systemd`  
- **GNOME + systemd**：`default/linux/amd64/23.0/desktop/gnome/systemd`  
- **桌面 + OpenRC**：`default/linux/amd64/23.0/desktop` 或對應 plasma/openrc 變體  
- **伺服器**：`default/linux/amd64/23.0`（較精簡）

套用並更新系統：
```bash
eselect profile set <編號>
emerge -avuDN @world
```

> Profile 會設定一組預設 USE 與方向；需要時可透過 `package.use` 做細部微調。

---

## 8. 本地化 Localization（語言與時區）

**語言（/etc/locale.gen）**：
```conf
en_US.UTF-8 UTF-8
zh_TW.UTF-8 UTF-8
```
產生並套用：
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
完整清單：<https://en.wikipedia.org/wiki/List_of_tz_database_time_zones>

**字型與輸入法（可選）**：
```bash
emerge media-fonts/noto-cjk
emerge app-i18n/fcitx5 app-i18n/fcitx5-rime
```

---

## 9. 內核選擇與編譯（完整指令）

### 9.1 最簡方案：預編譯內核（建議新手）
```bash
emerge sys-kernel/gentoo-kernel-bin
```

### 9.2 進階方案：自行編譯（gentoo-sources）
```bash
emerge sys-kernel/gentoo-sources
cd /usr/src/linux
make menuconfig   # 啟用你的硬體：NVMe、ext4、（需要則）Btrfs、GPU、USB、網卡等
make -j"$(nproc)"
make modules_install
make install
```

**可選：建立 initramfs（Btrfs、LUKS、RAID 或模組化驅動建議使用）**  
- 用 **dracut**：
  ```bash
  emerge sys-kernel/dracut
  dracut --kver "$(ls /lib/modules | sort -V | tail -1)"
  ```
- 用 **genkernel**：
  ```bash
  emerge sys-kernel/genkernel
  genkernel initramfs
  ```

---

## 10. 產生 fstab（含 Btrfs / ext4 範例）

查詢 UUID：
```bash
blkid
lsblk -f
```

**ext4**：
```fstab
UUID=<UUID-ESP>  /efi   vfat  noatime,umask=0077 0 2
UUID=<UUID-BOOT> /boot  ext4  noatime            0 2
UUID=<UUID-ROOT> /      ext4  noatime            0 1
UUID=<UUID-HOME> /home  ext4  noatime            0 2
```

**Btrfs（子卷）**：
```fstab
UUID=<UUID-ESP>  /efi   vfat   noatime,umask=0077 0 2
UUID=<UUID-ROOT> /      btrfs  noatime,compress=zstd,subvol=@     0 1
UUID=<UUID-ROOT> /home  btrfs  noatime,compress=zstd,subvol=@home 0 2
```

---

## 11. 安裝開機器 GRUB（含 os-prober）
```bash
emerge grub efibootmgr
grub-install --target=x86_64-efi --efi-directory=/efi --bootloader-id=Gentoo
emerge --ask sys-boot/os-prober
echo 'GRUB_DISABLE_OS_PROBER=false' >> /etc/default/grub
grub-mkconfig -o /boot/grub/grub.cfg
```

若 root 用 Btrfs，建議安裝工具：
```bash
emerge --ask sys-fs/btrfs-progs
```

---

## 12. 啟用網路服務（OpenRC / systemd）

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

## 13. Wayland / X11 選擇與 USE

**Wayland 為主**：
```conf
USE="wayland egl pipewire vulkan"
```
**X11 相容性較佳（舊程式／部分遊戲）**：
```conf
USE="X xwayland egl pipewire vulkan"
```

> 兩者都可用，但請依需求調整。

---

## 14. 顯示卡與 CPU 微碼

**NVIDIA 專有驅動**：
```conf
VIDEO_CARDS="nvidia"
```
```bash
emerge x11-drivers/nvidia-drivers
```

**NVIDIA 開源 nouveau（效能較低）**：
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

**CPU 微碼**：
```bash
# Intel
emerge sys-firmware/intel-microcode

# AMD
emerge sys-firmware/amd-ucode
```

---

## 15. 桌面環境（可選）

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

## 16. 使用者與 sudo
```bash
passwd
useradd -m -G wheel,audio,video,usb -s /bin/bash zakk
passwd zakk
emerge app-admin/sudo
echo "%wheel ALL=(ALL) ALL" >> /etc/sudoers
```
> ⚠️ **注意**：這裡的 `zakk` 只是範例，請替換為你自己的使用者名稱。

---

## 17. SSH（可選）
```bash
emerge net-misc/openssh
systemctl enable sshd && systemctl start sshd
```

---

## 18. 重開機
```bash
exit
umount -R /mnt/gentoo
reboot
```

---

# 💡 常見問題
- **下載慢／超時**：中國大陸請用境內鏡像；其他地區選最近鏡像。  
- **Wi‑Fi 連不上**：先檢查驅動與介面名稱，WPA3 不穩改 WPA2。  
- **Wayland / X11**：AMD/Intel 新平台可優先 Wayland；相容性需求選 X11 + xwayland。  
- **NVIDIA 選擇**：RTX 4000 建議 `nvidia-drivers`；舊卡或純開源取向可試 `nouveau`（效能較低）。  
- **USE 衝突**：`emerge -pv <套件>` 看提示，將建議的 USE 寫入 `/etc/portage/package.use/`。  
- **License 阻擋**：把授權加入 `/etc/portage/package.license`。  
- **需要新版**：用 `/etc/portage/package.accept_keywords` 解鎖。  
- **Btrfs + LUKS/RAID**：建議使用 initramfs（dracut 或 genkernel）。  

---

# 📎 參考資源
- Gentoo Handbook: <https://wiki.gentoo.org/wiki/Handbook:AMD64/Full/Installation>
- Bitbili: <https://bitbili.net/gentoo-linux-installation-and-usage-tutorial.html>
- Rufus: <https://rufus.ie/>
- 時區列表: <https://en.wikipedia.org/wiki/List_of_tz_database_time_zones>
- Gentoo Handbook：<https://wiki.gentoo.org/wiki/Handbook:AMD64/Full/Installation>  
- Bitbili：<https://bitbili.net/gentoo-linux-installation-and-usage-tutorial.html>  
- Rufus：<https://rufus.ie/>  
- 時區列表（tz database）：<https://en.wikipedia.org/wiki/List_of_tz_database_time_zones>
