---
title: "關於我"
slug: "about"
toc: false
date: 2025-09-01
lastmod: 2025-09-01
---
<style>
:root { --about-accent:#e1306c; }
.about-wrap{
  max-width:820px;
  margin:0 auto;
  padding:.5rem 0 2.5rem;
  line-height:1.6;
  font-size:.95rem;
}

/* === Intro（主要個人簡介）重新設計 === */
.about-intro{
  margin:0 0 2rem;
  padding:1.05rem 1.15rem 1.15rem;
  border:1px solid rgba(0,0,0,.08);
  border-left:8px solid var(--about-accent);
  background:#fafafa;
  border-radius:14px;
  font-size:1.05rem;
  line-height:1.68;
  position:relative;
  box-shadow:0 2px 4px -2px rgba(0,0,0,.08),0 4px 14px -8px rgba(0,0,0,.08);
}
body.dark .about-intro{
  background:#252526;
  border:1px solid rgba(255,255,255,.14);
  border-left-color:var(--about-accent);
  box-shadow:0 2px 5px -2px rgba(0,0,0,.6);
}
.about-intro p{margin:.6rem 0;}
.about-intro p:first-child{margin-top:0;}
.about-intro p:last-child{margin-bottom:0;}

/* 強調（**文字**）膠囊高亮 */
.about-intro strong{
  display:inline-block;
  font-weight:600;
  color:var(--about-accent);
  background:rgba(225,48,108,.16);
  padding:.15rem .5rem .22rem;
  margin:.1rem .2rem .1rem 0;
  border-radius:8px;
  line-height:1.2;
  vertical-align:baseline;
  letter-spacing:.3px;
}
body.dark .about-intro strong{
  background:rgba(225,48,108,.30);
  color:#ff8fb7;
}

/* === 區塊標題樣式（簡潔、無漸變） === */
.about-wrap h3{
  margin:2.2rem 0 .9rem;
  padding:.55rem .85rem .55rem .95rem;
  font-size:1.0rem;
  font-weight:600;
  line-height:1.25;
  position:relative;
  background:#f5f5f5;
  border-left:6px solid var(--about-accent);
  border-radius:10px;
  border:1px solid rgba(0,0,0,.06);
}
body.dark .about-wrap h3{
  background:#2d2d2f;
  border:1px solid rgba(255,255,255,.14);
}
.about-wrap h3::after{
  content:"";
  position:absolute;
  left:0;
  bottom:0;
  height:2px;
  width:90px;
  background:var(--about-accent);
  border-radius:2px;
  transform:translateY(100%);
  opacity:.8;
}

/* 列表 */
.about-wrap h3+ul{
  list-style:none;
  margin:.1rem 0 0;
  padding:0;
}
.about-wrap h3+ul li{
  position:relative;
  padding:.42rem 0 .42rem 1.05rem;
  font-size:.9rem;
}
.about-wrap h3+ul li:before{
  content:"";
  position:absolute;
  left:0;
  top:.95rem;
  width:7px;
  height:7px;
  background:var(--about-accent);
  border-radius:50%;
  opacity:.65;
}
body.dark .about-wrap h3+ul li:before{opacity:.85;}

/* 連結（正文/列表） */
.about-wrap a[href^="http"], .about-wrap a[href^="mailto:"]{
  color:var(--about-accent);
  text-decoration:none;
  font-weight:600;
}
.about-wrap a:hover{text-decoration:underline;}

/* 聯絡方式 Pills */
.about-contacts{
  list-style:none;
  margin:.4rem 0 0;
  padding:0;
}
.about-contacts li{
  display:inline-block;
  margin:0 .5rem .6rem 0;
  padding:0;
}
.about-contacts li:before{display:none;}
.about-contacts a{
  display:inline-block;
  background:rgba(225,48,108,.12);
  padding:.42rem .75rem .45rem;
  font-size:.7rem;
  letter-spacing:.45px;
  border-radius:9px;
  font-weight:600;
  line-height:1;
  text-decoration:none;
  color:var(--about-accent);
  transition:background .22s,color .22s;
}
body.dark .about-contacts a{
  background:rgba(225,48,108,.28);
  color:#ff8fb7;
}
.about-contacts a:hover{
  background:var(--about-accent);
  color:#fff;
}

/* RWD */
@media (max-width:640px){
  .about-intro{font-size:1rem;padding:.8rem .85rem .9rem;border-radius:12px;}
  .about-intro strong{padding:.12rem .45rem .18rem;}
  .about-wrap h3{font-size:.95rem;padding:.5rem .75rem .5rem .85rem;}
  .about-wrap h3+ul li{font-size:.86rem;padding:.38rem 0 .38rem .95rem;}
}

/* 減少動態偏好 */
@media (prefers-reduced-motion:reduce){
  *{transition:none!important;}
}
</style>

<div class="about-wrap">
<div class="about-intro">
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