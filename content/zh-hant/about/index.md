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

/* ===== 精簡後的 Intro 區塊樣式（取代原本浮誇效果） ===== */
.about-intro{
  margin:0 0 1.8rem;
  padding:.85rem 1rem .95rem 1rem;
  border-left:5px solid var(--about-accent);
  border:1px solid rgba(0,0,0,.08);
  background:rgba(0,0,0,.025);
  border-radius:10px;
  line-height:1.6;
  font-size:.95rem;
}
body.dark .about-intro{
  border-color:var(--about-accent);
  border-left-color:var(--about-accent);
  background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.12);
}

/* 強調文字高亮（僅使用 strong） */
.about-intro strong{
  font-weight:600;
  color:var(--about-accent);
  background:rgba(225,48,108,.14);
  padding:.05rem .38rem .08rem;
  border-radius:6px;
  line-height:1.35;
  display:inline-block;
  margin:.12rem .12rem .12rem 0;
}
body.dark .about-intro strong{
  background:rgba(225,48,108,.28);
  color:#ff86b2;
}

/* 若仍存在 mark（保留兼容） */
.about-intro mark{
  background:rgba(225,48,108,.18);
  color:var(--about-accent);
  padding:.05rem .38rem .08rem;
  border-radius:6px;
  font-weight:600;
}
body.dark .about-intro mark{
  background:rgba(225,48,108,.32);
  color:#ff8ab4;
}

/* 移除舊版遺留裝飾 */
.about-intro::after,
.about-intro p + p::before{
  content:none !important;
}

/* 簡化：段落間距 */
.about-intro p{margin:.5rem 0;}
.about-intro p:first-child{margin-top:0;}
.about-intro p:last-child{margin-bottom:0;}

/* 行動裝置微調 */
@media (max-width:640px){
  .about-intro{padding:.75rem .85rem .85rem;font-size:.93rem;}
  .about-intro strong,
  .about-intro mark{margin:.08rem .1rem .08rem 0;}
}

/* 偏好減少動態：無轉場 */
@media (prefers-reduced-motion:reduce){
  .about-intro,
  .about-intro strong,
  .about-intro mark{transition:none;}
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