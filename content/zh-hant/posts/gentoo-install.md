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

> 此為示例，步驟適用於大多數 x86_64。

## 0. 下載與建立安裝媒體 {#0-下載與建立安裝媒體}
官方鏡像：<https://www.gentoo.org/downloads/mirrors/>
```bash
wget https://free.nchc.org.tw/gentoo/releases/amd64/autobuilds/current-install-amd64-minimal/install-amd64-minimal.iso
```
製作 USB：
```bash
sudo dd if=install-amd64-minimal.iso of=/dev/sdX bs=4M status=progress oflag=sync
```

## 1. 開機與網路 {#1-開機與網路}
```bash
ls /sys/firmware/efi
ip a
dhcpcd eno1
ping -c 3 gentoo.org
```
Wi‑Fi (wpa_supplicant / iwd 同英文)。

## 2. 分割區（lsblk 與 cfdisk） {#2-分割區-lsblk-與-cfdisk}
```bash
lsblk -o NAME,SIZE,TYPE,MOUNTPOINT
cfdisk /dev/nvme0n1
```
| 大小 | FS | 掛載 | 用途 |
|---|---|---|---|
| 512M | FAT32 | /efi | ESP |
| 1G | ext4 | /boot | Kernel |
| 100G+ | ext4/XFS/Btrfs | / | Root |
| 其餘 | ext4/XFS/Btrfs | /home | Data |

## 3. 檔案系統格式化與掛載 (ext4 / XFS / Btrfs) {#3-檔案系統格式化與掛載}
（此段請依備份原文完整替換；未改動現有簡述）
```bash
mkfs.ext4 -L root /dev/nvme0n1p3
# ...existing code...
```

## 4. Stage3、掛載與 chroot {#4-stage3-掛載與-chroot}
```bash
# ...existing code...
```

## 5. Portage 與鏡像 {#5-portage-與鏡像}
```bash
# ...existing code...
```

## 6. USE 旗標與授權 {#6-use-旗標與授權}
```bash
# ...existing code...
```

## 7. Profile 選擇 {#7-profile-選擇}
```bash
# ...existing code...
```

## 8. 本地化（語言與時區） {#8-本地化語言與時區}
```bash
# ...existing code...
```

## 9. Kernel 編譯 {#9-kernel-編譯}
```bash
# ...existing code...
```

## 10. 產生 fstab {#10-產生-fstab}
```bash
# ...existing code...
```

## 11. 安裝 GRUB {#11-安裝-grub}
```bash
# ...existing code...
```

## 12. 啟用網路 {#12-啟用網路}
```bash
# ...existing code...
```

## 13. Wayland / X11 {#13-wayland-x11}
```bash
# ...existing code...
```

## 14. GPU 與微碼 {#14-gpu-與微碼}
```bash
# ...existing code...
```

## 15. 桌面環境 {#15-桌面環境}
```bash
# ...existing code...
```

## 16. 使用者與 sudo {#16-使用者與-sudo}
```bash
# ...existing code...
```

## 17. SSH {#17-ssh}
```bash
# ...existing code...
```

## 18. 重新開機 {#18-重新開機}
```bash
exit
umount -R /mnt/gentoo
reboot
```

# 常見問題 {#常見問題}
- 下載慢 → 選近鏡像  
- Wi‑Fi WPA3 不穩 → 改 WPA2  
- Wayland vs X11 → AMD/Intel 選 Wayland；需相容性選 X11  
- NVIDIA → 新卡專有驅動；舊卡可 nouveau  
- USE 衝突 → `emerge -pv` 拆分 package.use  
- 授權阻擋 → package.license  
- 新版需求 → package.accept_keywords  
- Btrfs + LUKS/RAID → initramfs 推薦  

# 參考資源 {#參考資源}
- Gentoo Handbook: <https://wiki.gentoo.org/wiki/Handbook:AMD64/Full/Installation>
- Bitbili: <https://bitbili.net/gentoo-linux-installation-and-usage-tutorial.html>
- Rufus: <https://rufus.ie/>
- 時區：<https://en.wikipedia.org/wiki/List_of_tz_database_time_zones>
</div>
