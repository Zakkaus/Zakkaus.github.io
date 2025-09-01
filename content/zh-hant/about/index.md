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

/* === Hero 改版（精簡現代卡片） === */
.about-page .about-hero{
  font-size:1.14rem;
  line-height:1.72;
  margin:0 0 2.1rem;
  padding:1.1rem 1.35rem 1.2rem 1.35rem;
  background:#ffffff;
  border:1px solid #e6e7ea;
  border-radius:18px;
  position:relative;
  box-shadow:0 2px 4px -2px rgba(0,0,0,.06),0 8px 28px -12px rgba(0,0,0,.06);
  overflow:hidden;
}
body.dark .about-page .about-hero{
  background:#1f2022;
  border:1px solid #35373a;
  box-shadow:0 2px 6px -2px rgba(0,0,0,.55),0 10px 34px -16px rgba(0,0,0,.55);
}

/* 細色條（取代原粗左條） */
.about-page .about-hero::before{
  content:"";
  position:absolute;
  left:0;top:0;bottom:0;
  width:4px;
  background:linear-gradient(to bottom,var(--about-accent),rgba(225,48,108,.25));
  border-radius:4px 0 0 4px;
  opacity:.9;
}
body.dark .about-page .about-hero::before{
  background:linear-gradient(to bottom,var(--about-accent),rgba(225,48,108,.35));
}

/* 角落柔光層 */
.about-page .about-hero::after{
  content:"";
  position:absolute;
  inset:0;
  pointer-events:none;
  background:
    radial-gradient(circle at 85% 18%,rgba(225,48,108,.18),transparent 55%),
    radial-gradient(circle at 12% 82%,rgba(225,48,108,.12),transparent 60%);
  mix-blend-mode:overlay;
  opacity:.75;
}
body.dark .about-page .about-hero::after{
  opacity:.55;
  mix-blend-mode:normal;
}

/* 內文段落間距（保持） */
.about-page .about-hero p{margin:.65rem 0;}
.about-page .about-hero p:first-child{margin-top:0;}
.about-page .about-hero p:last-child{margin-bottom:0;}

/* 標題去除底線與底部橫線 */
.about-page h3{
  margin:2.1rem 0 .7rem;
  font-size: 1.02rem;
  line-height: 1.28;
  font-weight: 600;
  padding: 0 .2rem .15rem .85rem;
  position: relative;
  border-bottom:none!important;
}
.about-page h3::after{content:none!important;}
/* 左側色條保持 */
.about-page h3::before {
  content: "";
  position: absolute;
  left: 0; top: 0; bottom: .55rem;
  width: 3px;
  background: var(--about-accent);
  border-radius: 2px;
}

/* 列表 */
.about-page h3 + ul {
  list-style: none;
  margin: .2rem 0 0;
  padding: 0;
}
.about-page h3 + ul li {
  position: relative;
  padding: .46rem 0 .46rem 1.15rem;
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
  margin:.25rem 0 0 !important;
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