---
title: "關於我"
slug: "about"
toc: false
date: 2025-09-01
lastmod: 2025-09-01
---
<style>
/* 簡潔 About 共用樣式 */
.about-block{
  --about-accent: var(--hb-active,#e1306c);
  max-width:820px;
  margin:0 auto;
  padding:.5rem 0 3rem;
  line-height:1.6;
  font-size:.95rem;
}
.about-block p{margin:0 0 1.05rem;}

/* Intro 區：低調柔和卡片 */
.about-intro{
  padding:.9rem 1rem 1rem;
  margin:0 0 1.9rem;
  background:linear-gradient(135deg,rgba(0,0,0,.03),rgba(0,0,0,0));
  border:1px solid rgba(0,0,0,.08);
  border-radius:12px;
  font-size:.95rem;
}
body.dark .about-intro{
  background:linear-gradient(135deg,rgba(255,255,255,.05),rgba(255,255,255,0));
  border-color:rgba(255,255,255,.15);
}
.about-intro strong{font-weight:600;color:#222;}
body.dark .about-intro strong{color:#eee;}
.about-intro mark{
  background:rgba(225,48,108,.15);
  color:#b41d55;
  padding:.1rem .35rem .15rem;
  border-radius:6px;
  font-weight:600;
}
body.dark .about-intro mark{
  background:rgba(225,48,108,.28);
  color:#ff8ab4;
}

/* 標題：左細線 + 小圓點（無陰影、無漸層） */
.about-block h3{
  position:relative;
  margin:2.2rem 0 .85rem;
  padding:0 0 .35rem .85rem;
  border-left:3px solid var(--about-accent);
  font-size:1rem;
  font-weight:600;
  line-height:1.25;
  letter-spacing:.5px;
  color:inherit;
}
.about-block h3::after{
  content:"";
  position:absolute;
  left:0;
  top:3px;
  width:10px;
  height:10px;
  background:var(--about-accent);
  border-radius:50%;
  transform:translate(-55%,0);
  opacity:.85;
}
body.dark .about-block h3::after{opacity:.95;}

/* 列表：極簡圓點 */
.about-block h3 + ul{
  list-style:none;
  margin:-.2rem 0 .4rem;
  padding:0 0 0 .4rem;
}
.about-block h3 + ul li{
  position:relative;
  padding:.38rem 0 .38rem 1rem;
  font-size:.9rem;
}
.about-block h3 + ul li::before{
  content:"";
  position:absolute;
  left:0;
  top:.9em;
  width:6px;
  height:6px;
  background:var(--about-accent);
  border-radius:50%;
  opacity:.65;
}
body.dark .about-block h3 + ul li::before{opacity:.8;}

/* 聯絡方式：柔和灰底 → hover 主色 */
.about-block h3 + ul li a[href]{
  display:inline-block;
  background:rgba(0,0,0,.05);
  color:var(--about-accent,#e1306c)!important;
  padding:.32rem .65rem;
  border-radius:9px;
  font-size:.7rem;
  font-weight:600;
  letter-spacing:.35px;
  text-decoration:none;
  transition:background .22s,color .22s;
}
body.dark .about-block h3 + ul li a[href]{background:rgba(255,255,255,.09);}
.about-block h3 + ul li a[href]:hover{
  background:var(--about-accent,#e1306c);
  color:#fff!important;
}

/* === 強化 Intro 視覺高亮（僅作用於開頭簡介） === */
.about-block .about-intro{
  border:1px solid rgba(225,48,108,.35);
  border-left:6px solid var(--about-accent,#e1306c);
  background:
    linear-gradient(140deg,rgba(225,48,108,.10),rgba(225,48,108,0) 75%),
    linear-gradient(0deg,rgba(255,255,255,.55),rgba(255,255,255,.55));
  position:relative;
  overflow:hidden;
}
body.dark .about-block .about-intro{
  background:
    linear-gradient(140deg,rgba(225,48,108,.22),rgba(225,48,108,0) 75%),
    linear-gradient(0deg,rgba(30,30,30,.75),rgba(30,30,30,.75));
  border-color:rgba(225,48,108,.55);
}
.about-block .about-intro::after{
  content:"";
  position:absolute;
  inset:0;
  background:
    radial-gradient(circle at 85% 15%,rgba(225,48,108,.18),transparent 60%),
    radial-gradient(circle at 12% 85%,rgba(225,48,108,.15),transparent 65%);
  pointer-events:none;
  mix-blend-mode:overlay;
  opacity:.9;
}
body.dark .about-block .about-intro::after{mix-blend-mode:normal;opacity:.7;}

/* 粗體關鍵詞高亮（僅在 intro 內） */
.about-block .about-intro strong{
  position:relative;
  font-weight:700;
  color:#c21752;
  background:linear-gradient(transparent 62%,rgba(225,48,108,.35) 62%);
  padding:0 .18em .05em;
  border-radius:4px;
  transition:background .35s,color .35s;
}
body.dark .about-block .about-intro strong{
  color:#ff86b2;
  background:linear-gradient(transparent 62%,rgba(225,48,108,.38) 62%);
}
.about-block .about-intro strong:hover{
  background:linear-gradient(transparent 0%,rgba(225,48,108,.55) 0%);
  color:#fff;
}
body.dark .about-block .about-intro strong:hover{
  background:linear-gradient(transparent 0%,rgba(225,48,108,.65) 0%);
  color:#fff;
}

/* 行間距微調：讓多重強調不擁擠 */
.about-block .about-intro p{margin:.45rem 0;}

/* 行首分隔微裝飾（第二、三行前的細線漸隱） */
.about-block .about-intro p + p{
  position:relative;
  padding-top:.55rem;
}
.about-block .about-intro p + p::before{
  content:"";
  position:absolute;
  left:0;
  top:.2rem;
  width:70px;
  height:2px;
  background:linear-gradient(90deg,rgba(225,48,108,.55),transparent);
  border-radius:2px;
  opacity:.55;
}
body.dark .about-block .about-intro p + p::before{
  opacity:.75;
}

/* 深色模式補色 */
body.dark .about-block .about-intro{color:#e7e7e9;}
/* 動畫偏好：停用過渡 */
@media (prefers-reduced-motion:reduce){
  .about-block .about-intro strong,
  .about-block .about-intro{transition:none;}
}

/* 響應式 */
@media(max-width:640px){
  .about-intro{padding:.75rem .85rem .85rem;font-size:.92rem;}
  .about-block h3{font-size:.95rem;margin:2rem 0 .75rem;padding:0 0 .3rem .75rem;}
  .about-block h3 + ul li{font-size:.86rem;padding:.34rem 0 .34rem .9rem;}
  .about-block h3 + ul li::before{top:.85em;}
}
</style>

<div class="about-block">
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
- Instagram：[@zakk.au](https://www.instagram.com/zakk.au/)  
- GitHub：[Zakkaus](https://github.com/Zakkaus)  
- X：[ @zakkauu ](https://x.com/zakkauu)  
- Email：[admin@zakk.au](mailto:admin@zakk.au)
</div>