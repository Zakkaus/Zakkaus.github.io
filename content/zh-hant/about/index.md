---
title: "關於我"
slug: "about"
toc: false
date: 2025-09-01
lastmod: 2025-09-01
---
<style>
:root {
  --about-accent: var(--hb-active,#e1306c);
  --about-bg-light: #fafafa;
  --about-bg-dark: #242528;
  --about-border-light: #e2e3e6;
  --about-border-dark: #3a3d42;
  --about-text-light: #222;
  --about-text-dark: #e9e9eb;
  --about-pill-bg-light: rgba(225,48,108,.12);
  --about-pill-bg-dark: rgba(225,48,108,.30);
}

/* 移除原全域 strong 高亮，統一還原 */
.about-page strong{
  background:none!important;
  color:inherit!important;
  padding:0!important;
  margin:0!important;
  border-radius:0!important;
  font-weight:600;
}

/* 僅個人簡介內強調高亮 */
.about-page .about-hero strong{
  background:rgba(225,48,108,.16)!important;
  color:var(--about-accent)!important;
  padding:.18rem .55rem .22rem!important;
  margin:.12rem .25rem .12rem 0!important;
  border-radius:999px!important;
  line-height:1.15;
  display:inline-block;
  letter-spacing:.3px;
}
body.dark .about-page .about-hero strong{
  background:rgba(225,48,108,.32)!important;
  color:#ff8fb7!important;
}

/* === Hero 再次精簡：扁平、融入版面 === */
.about-page .about-hero{
  background:#f9fafb !important;
  border:1px solid #e5e6e9 !important;
  border-radius:14px !important;
  box-shadow:none !important;
  padding:1.05rem 1.2rem 1.15rem !important;
  font-size:1.08rem !important;
  line-height:1.7 !important;
  position:relative;
  margin:0 0 1.6rem !important; /* 原 2.1rem */
}
body.dark .about-page .about-hero{
  background:#1f2021 !important;
  border:1px solid #34363a !important;
}

/* 移除舊裝飾 */
.about-page .about-hero::before,
.about-page .about-hero::after{
  content:none !important;
}

/* 強調詞：改用半透明底線 + 主色文字（不再膠囊） */
.about-page .about-hero strong{
  background:
    linear-gradient(to top,rgba(225,48,108,.32),rgba(225,48,108,0) 65%) !important;
  color:var(--about-accent) !important;
  padding:0 .2rem 0 .2rem !important;
  margin:0 .15rem 0 0 !important;
  border-radius:4px !important;
  font-weight:600;
  line-height:1.25;
  display:inline-block;
  letter-spacing:.25px;
}
body.dark .about-page .about-hero strong{
  background:linear-gradient(to top,rgba(225,48,108,.45),rgba(225,48,108,0) 65%) !important;
  color:#ff8fb7 !important;
}

/* Hero 段落間距微調 */
.about-page .about-hero p{margin:.55rem 0 !important;}
.about-page .about-hero p:first-child{margin-top:0 !important;}
.about-page .about-hero p:last-child{margin-bottom:.2rem !important;}

/* 標題：更細緻左線，去除多餘 padding */
.about-page h3{
  padding:0 0 .3rem .75rem !important;
  margin:1.9rem 0 .55rem !important;
  font-size:.98rem !important;
  line-height:1.25;
  font-weight:600;
}
.about-page h3::before{
  width:2px !important;
  background:var(--about-accent) !important;
  bottom:.3rem !important;
}

/* 第一個標題（緊接 hero）再略縮 */
.about-page .about-hero + h3{
  margin-top:1.35rem !important;
}

/* 列表 */
.about-page h3 + ul {
  list-style: none;
  margin:.15rem 0 .2rem !important;
  padding: 0;
}
.about-page h3 + ul li {
  position: relative;
  padding:.4rem 0 .4rem 1.15rem !important;
  font-size: .9rem;
}
.about-page h3 + ul li::before {
  content: "";
  position: absolute;
  left: 0;
  top: .98rem;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--about-accent);
  opacity: .55;
}
body.dark .about-page h3 + ul li::before { opacity: .75; }

/* 連結（一般） */
.about-page a[href^="http"],
.about-page a[href^="mailto:"] {
  color: var(--about-accent);
  font-weight: 600;
  text-decoration: none;
  transition: color .18s;
}
.about-page a:hover { text-decoration: underline; }

/* 聯絡方式 Pills */
.about-page .about-contacts {
  list-style: none;
  margin: .55rem 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: .55rem .65rem;
}
.about-page .about-contacts li { margin: 0; padding: 0; }
.about-page .about-contacts li::before { display: none; }
.about-page .about-contacts a {
  background: var(--about-pill-bg-light);
  padding: .48rem .85rem .5rem;
  font-size: .7rem;
  letter-spacing: .45px;
  line-height: 1;
  border-radius: 9px;
  display: inline-block;
  text-decoration: none;
  color: var(--about-accent);
  transition: background .22s, color .22s;
}
body.dark .about-page .about-contacts a {
  background: var(--about-pill-bg-dark);
  color: #ff8fb7;
}
.about-page .about-contacts a:hover {
  background: var(--about-accent);
  color: #fff;
}

/* === 覆蓋：聯絡方式改為垂直列表，統一風格 === */
.about-page .about-contacts{
  display:block !important;
  flex-wrap:nowrap !important;
  gap:0 !important;
  margin:.2rem 0 0 !important;
  padding:0 !important;
  list-style:none;
}
.about-page .about-contacts li{
  display:block !important;
  position:relative;
  margin:0 0 .45rem !important;
  padding:.42rem 0 .42rem 1.15rem !important;
  background:transparent !important;
}
.about-page .about-contacts li:last-child{margin-bottom:0 !important;}
.about-page .about-contacts li::before{
  content:"";
  position:absolute;
  left:0;top:.95rem;
  width:6px;height:6px;
  background:var(--about-accent);
  border-radius:50%;
  opacity:.55;
}
body.dark .about-page .about-contacts li::before{opacity:.75;}
.about-page .about-contacts a{
  background:rgba(225,48,108,.14) !important;
  padding:.28rem .55rem .32rem !important;
  border-radius:6px !important;
  font-size:.72rem !important;
  letter-spacing:.3px;
  line-height:1;
  display:inline-block;
  text-decoration:none;
  color:var(--about-accent);
  transition:background .2s,color .2s;
}
body.dark .about-page .about-contacts a{
  background:rgba(225,48,108,.30) !important;
  color:#ff8fb7 !important;
}
.about-page .about-contacts a:hover{
  background:var(--about-accent) !important;
  color:#fff !important;
}

/* 頁面頂部與 Hero 間距（讓標題/日期與內容拉開） */
.about-page{
  padding-top:1.2rem !important;
}

/* 通用段落標題間距（縮短段落間空白） */
.about-page h3{
  margin:1.9rem 0 .55rem !important;
}

/* 列表與下一標題之間距離更緊湊 */
.about-page h3 + ul{
  margin:.15rem 0 .2rem !important;
}
.about-page h3 + ul li{
  padding:.4rem 0 .4rem 1.15rem !important;
}

/* 聯絡方式區塊頂部再收斂 */
.about-page h3:has(+ .about-contacts){
  margin-top:1.6rem !important;
}
.about-page .about-contacts{
  margin:.2rem 0 0 !important;
}

/* RWD */
@media (max-width: 640px) {
  .about-page { font-size: .97rem; }
  .about-page .about-hero { font-size: 1.05rem; padding: .85rem 1rem .95rem; }
  .about-page h3 { font-size: .95rem; margin: 2rem 0 .75rem; }
  .about-page h3 + ul li { font-size: .86rem; padding: .4rem 0 .4rem 1rem; }
  .about-page strong { padding: .16rem .5rem .2rem; }
}

/* 無動畫偏好 */
@media (prefers-reduced-motion: reduce) {
  .about-page * { transition: none !important; }
}
</style>

<div class="about-page">
  <div class="about-hero">
    <p>嗨，我是 <strong>Zakk</strong>，在 <strong>墨爾本</strong> 生活。</p>
    <p>我養了 <strong>🐹 天竺鼠</strong>（名字是 <strong>馬鈴薯</strong> 和 <strong>薯餅</strong> 🥔），喜歡 <strong>遊戲</strong>、<strong>Linux</strong> 與 <strong>金融</strong>。</p>
    <p>目前就讀 <strong>Business</strong>。</p>
    <p style="margin-top:.8rem;font-size:.82rem;opacity:.75;">下面是我的主要裝備配置與聯絡方式，歡迎認識或交流。</p>
  </div>

### 💻 桌機
- 主機板：ASUS ROG STRIX X670E-A GAMING WIFI  
- 處理器：AMD Ryzen 9 7950X3D（16C/32T）  
- 顯示卡：NVIDIA GeForce RTX 4080 SUPER  
- 記憶體：**64 GB DDR5 6400 MHz**  
- 網路：固定公网 IP（Aussie Telecom，1000/50 Mbps）  
- 路由器：BE9300 三頻 Wi-Fi 7  
- 作業系統：Windows 11 Pro 64-bit + **Gentoo Linux（KDE Plasma）**

### 💼 筆電
- Apple MacBook Air M2（16GB / 512GB）  
- ASUS ROG Zephyrus G16 Air  

### 📱 手機
- Samsung Galaxy Z Fold 7  
- Google Pixel 7 Pro  
- iPhone 14  
- iPhone 16 Pro  

### 🔗 聯絡方式
<ul class="about-contacts">
  <li>Instagram：<a href="https://www.instagram.com/zakk.au/" target="_blank" rel="noopener">@zakk.au</a></li>
  <li>GitHub：<a href="https://github.com/Zakkaus" target="_blank" rel="noopener">Zakkaus</a></li>
  <li>X：<a href="https://x.com/zakkauu" target="_blank" rel="noopener">@zakkauu</a></li>
  <li>Email：<a href="mailto:admin@zakk.au">admin@zakk.au</a></li>
</ul>
</div>