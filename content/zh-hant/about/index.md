---
title: "關於我"
slug: "about"
toc: false
date: 2025-09-01
lastmod: 2025-09-01
---
<style>
/* About 統一樣式（中英文共用） */
.about-block{
  --about-accent: var(--hb-active,#e1306c);
  max-width:820px;
  margin:0 auto;
  padding:.5rem 0 3rem;
  line-height:1.6;
  font-size:.95rem;
}
.about-block p{margin:0 0 1.05rem;}
.about-block h3{
  margin:2.1rem 0 .85rem;
  padding:.42rem 0 .48rem .75rem;
  border-left:4px solid var(--about-accent);
  font-size:1.02rem;
  font-weight:650;
  line-height:1.25;
  border-bottom:1px solid rgba(0,0,0,.10);
}
body.dark .about-block h3{border-bottom:1px solid rgba(255,255,255,.18);}
.about-block h3 + ul{
  list-style:none;
  margin:-.25rem 0 .4rem;
  padding:0 0 0 .25rem;
}
.about-block h3 + ul li{
  position:relative;
  padding:.38rem 0 .38rem 1.05rem;
  font-size:.9rem;
}
.about-block h3 + ul li::before{
  content:"";
  position:absolute;
  left:.15rem;top:1em;
  width:7px;height:7px;
  background:var(--about-accent);
  border-radius:50%;
  box-shadow:0 0 0 4px rgba(225,48,108,.25),0 0 4px rgba(225,48,108,.45);
  opacity:.85;
}
body.dark .about-block h3 + ul li::before{
  box-shadow:0 0 0 4px rgba(225,48,108,.35),0 0 5px rgba(225,48,108,.65);
  opacity:.95;
}
/* 聯絡方式標示（膠囊） */
.about-block h3 + ul li a[href]{
  display:inline-block;
  background:rgba(225,48,108,.10);
  color:var(--about-accent,#e1306c)!important;
  padding:.38rem .7rem;
  border-radius:999px;
  font-size:.72rem;
  letter-spacing:.3px;
  font-weight:600;
  text-decoration:none;
  line-height:1.05;
  transition:background .25s,color .25s,transform .22s;
}
.about-block h3 + ul li a[href]:hover{
  background:var(--about-accent,#e1306c);
  color:#fff!important;
  transform:translateY(-2px);
}
body.dark .about-block h3 + ul li a[href]{background:rgba(225,48,108,.22);}
body.dark .about-block h3 + ul li a[href]:hover{background:var(--about-accent,#e1306c);}
@media(max-width:640px){
  .about-block h3{font-size:.98rem;padding:.4rem 0 .46rem .65rem;}
  .about-block h3 + ul li{font-size:.85rem;padding:.34rem 0 .34rem .95rem;}
  .about-block h3 + ul li::before{width:6px;height:6px;}
}
@media (prefers-reduced-motion:reduce){
  .about-block h3 + ul li a[href]{transition:none;transform:none;}
}

/* 新增：開頭介紹強調區 */
.about-intro{
  margin:0 0 1.9rem;
  padding:1rem 1.15rem 1.05rem 1.15rem;
  border:1px solid rgba(225,48,108,.35);
  border-left:6px solid var(--about-accent,#e1306c);
  background:linear-gradient(135deg,rgba(225,48,108,.08),rgba(225,48,108,.00) 70%);
  border-radius:14px;
  font-size:.95rem;
  line-height:1.62;
  position:relative;
}
body.dark .about-intro{
  background:linear-gradient(135deg,rgba(225,48,108,.18),rgba(225,48,108,.02) 70%);
  border-color:rgba(225,48,108,.55);
}
.about-intro p{margin:.35rem 0;}
.about-intro strong{
  font-weight:700;
  color:var(--about-accent,#e1306c);
}
.about-intro mark{
  background:rgba(225,48,108,.18);
  color:#c31852;
  padding:.15rem .35rem .2rem;
  border-radius:6px;
  font-weight:600;
}
body.dark .about-intro mark{
  background:rgba(225,48,108,.32);
  color:#ff8ab4;
}
.about-intro .intro-line + .intro-line{
  margin-top:.55rem;
  position:relative;
}
.about-intro .intro-line + .intro-line::before{
  content:"";
  position:absolute;
  left:0;
  top:-.4rem;
  width:54px;
  height:2px;
  background:linear-gradient(90deg,var(--about-accent,#e1306c),transparent);
  border-radius:2px;
  opacity:.55;
}
@media (max-width:640px){
  .about-intro{padding:.85rem .9rem .9rem .9rem;font-size:.93rem;border-radius:12px;}
  .about-intro mark{padding:.12rem .32rem .16rem;}
}
@media (prefers-reduced-motion:reduce){
  .about-intro{transition:none;}
}
</style>

<div class="about-block">
<div class="about-intro">
  <p class="intro-line">嗨，我是 <strong>Zakk</strong>，在 <mark>墨爾本</mark> 生活。</p>
  <p class="intro-line">我養了 <strong>🐹 天竺鼠</strong>（名字是 <mark>馬鈴薯</mark> 和 <mark>薯餅</mark> 🥔），喜歡 <strong>遊戲</strong>、<strong>Linux</strong> 與 <strong>金融</strong>。</p>
  <p class="intro-line">目前就讀 <mark>Business</mark>。</p>
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