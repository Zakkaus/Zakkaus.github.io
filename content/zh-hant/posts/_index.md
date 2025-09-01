---
draft: false
title: "文章"
---

## SSH 遠端安裝 / Remote Installation via SSH

### 為什麼要用 SSH？
- 在另一台桌機 / 筆電上操作，可直接複製貼上長指令，減少輸入錯誤  
- 可以同時開瀏覽器查 Gentoo Wiki / Handbook  
- 連線斷線風險小（可再搭配 tmux/screen）  
- 便於記錄完整安裝操作（shell history / 文字複製）  

### 何時可以啟用？
完成網路設定（有 IP、能 ping gentoo.org）後即可在 Live 環境啟用；或進入 chroot 後也可再啟用一次。

---

### 在 Live 環境啟用 (Minimal ISO, OpenRC)

已內建 OpenSSH（通常不必再安裝）：
```bash
# 設定 root 密碼（必要，不然無法登入）
passwd

# 啟動 sshd
/etc/init.d/sshd start

#（可選）設定開機自動：安裝階段一般不需要
rc-update add sshd default

# 查 IP（擇一）
ip a
ip -4 addr show dev eno1
ip route get 1.1.1.1
```

### 在 chroot 內（如需再啟用一次）
若尚未安裝 OpenSSH：
```bash
emerge --ask net-misc/openssh
rc-update add sshd default
/etc/init.d/sshd start
```

Systemd（若你用 systemd profile）：
```bash
emerge --ask net-misc/openssh
systemctl enable --now sshd
```

---

### 從另一台機器連線

Linux / macOS / Windows 10+ PowerShell：
```bash
ssh root@<機器IP>
```
第一次會提示 fingerprint，輸入 yes 然後輸入 root 密碼。

Windows 舊版可用 PuTTY：Host 填 `root@IP` 或在 PuTTY 內填 IP、User 改 root。

---

### 複製貼上小技巧
- Linux/macOS 終端機：一般直接貼上即可（Ctrl+Shift+V 或 Cmd+V）。  
- PuTTY：滑鼠右鍵即貼上；選取即複製。  
- 建議先貼到編輯器檢查再送出，避免不可見字元。  

---

### 推薦使用 tmux（避免網路閃斷）
```bash
emerge --ask app-misc/tmux   # 在 chroot 內
tmux new -s gentoo
# 之後若斷線：ssh 回來後 tmux attach -t gentoo
```

---

### 安全注意
- 僅在可信任 LAN 中使用；不要對未加防火牆的公網裸露 root SSH（若必要請改用金鑰登入並禁止密碼登入）。  
- 安裝完成後可選擇建立一般使用者並用 sudo，之後停用 root 遠端密碼登入：修改 `/etc/ssh/sshd_config` 裡的 `PermitRootLogin no` 再重啟 sshd。  

---

### 與完整安裝教學對應
- 英文版 SSH 章節：`/posts/gentoo-install/#17-ssh-optional`
- 繁體中文版 SSH 章節：`/zh-hant/posts/gentoo-install/#17-ssh可選`

以上步驟只新增「如何在有網路後使用 SSH 遠端操作」，不影響既有安裝流程，可直接套用。
