---
title: "關於我"
slug: "about"
toc: false
date: 2025-09-01
lastmod: 2025-09-01
---
<style>
.about-block{
  --about-accent: var(--hb-active,#e1306c);
  max-width:820px;margin:0 auto;padding:.5rem 0 3rem;
  line-height:1.6;font-size:.95rem;
}
.about-block p{margin:0 0 1.05rem;}
/* 精簡 Intro */
.about-intro{
  padding:.85rem .95rem .9rem;
  margin:0 0 1.6rem;
  border:1px solid rgba(0,0,0,.08);
  border-left:4px solid var(--about-accent);
  border-radius:10px;
  background:rgba(0,0,0,.02);
}
body.dark .about-intro{
  background:rgba(255,255,255,.05);
  border-color:rgba(255,255,255,.14);
  border-left-color:var(--about-accent);
}
/* 粗體關鍵詞底色高亮（低調） */
.about-intro strong{
  position:relative;font-weight:600;color:inherit;padding:0 .15em;
}
.about-intro strong::after{
  content:"";position:absolute;left:0;right:0;bottom:0;
  height:42%;background:rgba(225,48,108,.22);border-radius:4px;z-index:-1;
  transition:background .25s;
}
body.dark .about-intro strong::after{background:rgba(225,48,108,.36);}
.about-intro strong:hover::after{background:rgba(225,48,108,.45);}
/* 行間分隔（第二行起） */
.about-intro p + p{position:relative;padding-top:.55rem;margin-top:.2rem;}
.about-intro p + p::before{
  content:"";position:absolute;left:0;top:.25rem;width:48px;height:2px;
  background:linear-gradient(90deg,rgba(225,48,108,.45),transparent);
  border-radius:2px;opacity:.55;
}
body.dark .about-intro p + p::before{opacity:.7;}
/* 標題簡潔 */
.about-block h3{
  margin:2rem 0 .75rem;padding:0 0 .3rem .65rem;
  border-left:3px solid var(--about-accent);
  font-size:.95rem;font-weight:600;line-height:1.25;
  border-bottom:1px solid rgba(0,0,0,.1);letter-spacing:.3px;
  background:none;box-shadow:none;position:relative;
}
.about-block h3::after{content:none!important;}
body.dark .about-block h3{border-bottom:1px solid rgba(255,255,255,.18);}
/* 列表圓點 */
.about-block h3 + ul{list-style:none;margin:-.15rem 0 .4rem;padding:0 0 0 .4rem;}
.about-block h3 + ul li{
  position:relative;padding:.36rem 0 .36rem .95rem;font-size:.88rem;
}
.about-block h3 + ul li::before{
  content:"";position:absolute;left:0;top:.9em;
  width:6px;height:6px;background:var(--about-accent);border-radius:50%;opacity:.58;
}
body.dark .about-block h3 + ul li::before{opacity:.72;}
/* 聯絡膠囊 */
.about-block h3 + ul li a[href]{
  display:inline-block;background:rgba(0,0,0,.05);
  color:var(--about-accent)!important;padding:.28rem .6rem;
  border-radius:8px;font-size:.7rem;font-weight:600;letter-spacing:.35px;
  text-decoration:none;transition:background .2s,color .2s;
}
body.dark .about-block h3 + ul li a[href]{background:rgba(255,255,255,.08);}
.about-block h3 + ul li a[href]:hover{background:var(--about-accent);color:#fff!important;}
@media (max-width:640px){
  .about-intro{padding:.75rem .8rem .8rem;font-size:.93rem;}
  .about-block h3{font-size:.9rem;padding:0 0 .26rem .6rem;}
  .about-block h3 + ul li{font-size:.84rem;padding:.32rem 0 .32rem .9rem;}
}
@media (prefers-reduced-motion:reduce){
  .about-intro strong::after,
  .about-block h3 + ul li a[href]{transition:none;}
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