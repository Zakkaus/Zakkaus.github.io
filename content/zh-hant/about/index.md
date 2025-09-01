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
/* 外層 */
.about-page {
  max-width: 840px;
  margin: 0 auto;
  padding: .75rem 0 2.8rem;
  font-size: 1.02rem;
  line-height: 1.62;
  font-kerning: normal;
  color: var(--about-text-light);
}
body.dark .about-page { color: var(--about-text-dark); }

/* Intro Hero */
.about-page .about-hero {
  font-size: 1.15rem;
  line-height: 1.75;
  background: var(--about-bg-light);
  border: 1px solid var(--about-border-light);
  border-left: 6px solid var(--about-accent);
  border-radius: 16px;
  padding: 1.05rem 1.25rem 1.15rem;
  margin: 0 0 2.1rem;
  position: relative;
}
body.dark .about-page .about-hero {
  background: var(--about-bg-dark);
  border: 1px solid var(--about-border-dark);
  border-left-color: var(--about-accent);
}
.about-page .about-hero p { margin: .65rem 0; }
.about-page .about-hero p:first-child { margin-top: 0; }
.about-page .about-hero p:last-child { margin-bottom: 0; }

/* 強調 (所有 strong) */
.about-page strong {
  font-weight: 600;
  color: var(--about-accent);
  background: rgba(225,48,108,.16);
  padding: .18rem .55rem .24rem;
  margin: .12rem .3rem .12rem 0;
  line-height: 1.2;
  display: inline-block;
  border-radius: 999px;
  letter-spacing: .3px;
  vertical-align: baseline;
}
body.dark .about-page strong {
  background: rgba(225,48,108,.32);
  color: #ff8fb7;
}
.about-page .about-hero strong {
  font-size: 1.0em; /* 不再額外放大，只維持一致比例 */
}

/* 標題 (裝置分類) */
.about-page h3 {
  margin: 2.3rem 0 .95rem;
  font-size: 1.02rem;
  line-height: 1.28;
  font-weight: 600;
  padding: 0 0 .55rem .85rem;
  position: relative;
  border-bottom: 1px solid var(--about-border-light);
}
body.dark .about-page h3 { border-bottom: 1px solid var(--about-border-dark); }
.about-page h3::before {
  content: "";
  position: absolute;
  left: 0; top: 0; bottom: .55rem;
  width: 3px;
  background: var(--about-accent);
  border-radius: 2px;
}
.about-page h3::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  height: 2px;
  width: 82px;
  background: var(--about-accent);
  border-radius: 2px;
  opacity: .85;
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
    嗨，我是 **Zakk**，在 **墨爾本**生活。  
    我養了 **🐹 天竺鼠**（名字是 **馬鈴薯** 和 **薯餅** 🥔），喜歡 **遊戲**、**Linux** 與 **金融**。  
    目前就讀 **Business**。
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