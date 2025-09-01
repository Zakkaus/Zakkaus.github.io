---
title: "About"
slug: "about"
toc: false
date: 2025-09-01
lastmod: 2025-09-01
---
<style>
.about-block{
  --about-accent: var(--hb-active,#e1306c);
  max-width:820px;
  margin:0 auto;
  padding:.5rem 0 3rem;
  line-height:1.6;
  font-size:.95rem;
}

/* Same simplified intro highlight as zh-hant */
.about-intro{
  margin:0 0 1.8rem;
  padding:.85rem 1rem .95rem;
  border-left:5px solid var(--about-accent);
  border:1px solid rgba(0,0,0,.08);
  background:rgba(0,0,0,.025);
  border-radius:10px;
  line-height:1.6;
  font-size:.95rem;
}
body.dark .about-intro{
  background:rgba(255,255,255,.06);
  border:1px solid rgba(255,255,255,.12);
  border-left:5px solid var(--about-accent);
}
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
.about-intro p{margin:.5rem 0;}
.about-intro p:first-child{margin-top:0;}
.about-intro p:last-child{margin-bottom:0;}
@media (max-width:640px){
  .about-intro{padding:.75rem .85rem .85rem;font-size:.93rem;}
  .about-intro strong{margin:.08rem .1rem .08rem 0;}
}
@media (prefers-reduced-motion:reduce){
  .about-intro,
  .about-intro strong{transition:none;}
}

/* 共用簡潔 About 樣式（與中文同步） */
.about-block h3{
  position:relative;
  margin:2.2rem 0 .85rem;
  padding:0 0 .35rem .85rem;
  border-left:3px solid var(--about-accent);
  font-size:1rem;
  font-weight:600;
  line-height:1.25;
  letter-spacing:.5px;
}
.about-block h3::after{
  content:"";
  position:absolute;
  left:0;top:3px;
  width:10px;height:10px;
  background:var(--about-accent);
  border-radius:50%;
  transform:translate(-55%,0);
  opacity:.85;
}
body.dark .about-block h3::after{opacity:.95;}
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
  left:0;top:.9em;
  width:6px;height:6px;
  background:var(--about-accent);
  border-radius:50%;
  opacity:.65;
}
body.dark .about-block h3 + ul li::before{opacity:.8;}
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

/* Intro highlight (same as zh-hant) */
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
.about-block .about-intro p{margin:.45rem 0;}
.about-block .about-intro p + p{
  position:relative;
  padding-top:.55rem;
}
.about-block .about-intro p + p::before{
  content:"";
  position:absolute;
  left:0;top:.2rem;
  width:70px;height:2px;
  background:linear-gradient(90deg,rgba(225,48,108,.55),transparent);
  border-radius:2px;
  opacity:.55;
}
body.dark .about-block .about-intro p + p::before{opacity:.75;}
@media(max-width:640px){
  .about-intro{padding:.75rem .85rem .85rem;font-size:.92rem;}
  .about-block h3{font-size:.95rem;margin:2rem 0 .75rem;padding:0 0 .3rem .75rem;}
  .about-block h3 + ul li{font-size:.86rem;padding:.34rem 0 .34rem .9rem;}
  .about-block h3 + ul li::before{top:.85em;}
}
@media (prefers-reduced-motion:reduce){
  .about-block h3 + ul li a[href]{transition:none;}
}
</style>

<div class="about-block">
<div class="about-intro">
Hi, I'm **Zakk**, based in **Melbourne**.  
I keep **🐹 guinea pigs** (their names are **Hash Brown** and **Potato Cake** 🥔), enjoy **gaming**, and I'm into **Linux** and **Finance**.  
Currently studying **Business**.
</div>

### 💻 Desktop PC
- Motherboard: ASUS ROG STRIX X670E-A GAMING WIFI  
- CPU: AMD Ryzen 9 7950X3D (16C/32T)  
- GPU: NVIDIA GeForce RTX 4080 SUPER  
- RAM: **64 GB DDR5 6400 MHz**  
- Network: Static public IP (Aussie Telecom, 1000/50 Mbps)  
- Router: BE9300 Tri-Band Wi-Fi 7  
- OS: Windows 11 Pro 64-bit + **Gentoo Linux (KDE Plasma)**  

### 💼 Laptops
- Apple MacBook Air M2 (16GB / 512GB)  
- ASUS ROG Zephyrus G16 Air  

### 📱 Phones
- Samsung Galaxy Z Fold 7  
- Google Pixel 7 Pro  
- iPhone 14  
- iPhone 16 Pro  

### 🔗 Contacts
- Instagram: [@zakk.au](https://www.instagram.com/zakk.au/)  
- GitHub: [Zakkaus](https://github.com/Zakkaus)  
- X: [@zakkauu](https://x.com/zakkauu)  
- Email: [admin@zakk.au](mailto:admin@zakk.au)
</div>