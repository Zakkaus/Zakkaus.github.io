---
title: "關於我"
slug: "about"
toc: false
---
<style>
/* 與英文版一致的美化樣式（可共用） */
.about-highlight{
  --about-accent: var(--hb-active,#e1306c);
  max-width:820px;
  margin:0 auto;
  padding:.5rem 0 3rem;
  line-height:1.6;
  position:relative;
}
.about-highlight p{margin:0 0 1.05rem;font-size:.96rem;}
.about-highlight h3{
  position:relative;
  margin:2.4rem 0 0.85rem;
  font-size:1.05rem;
  padding:.55rem .9rem .55rem 2.65rem;
  background:linear-gradient(100deg,rgba(225,48,108,.10),rgba(225,48,108,0) 75%);
  border:1px solid rgba(225,48,108,.35);
  border-left:6px solid var(--about-accent);
  border-radius:14px;
  backdrop-filter:blur(4px);
  line-height:1.3;
}
body.dark .about-highlight h3{
  background:linear-gradient(100deg,rgba(225,48,108,.25),rgba(225,48,108,0) 70%);
  border-color:rgba(225,48,108,.55);
}
.about-highlight h3::before{
  content:"";
  position:absolute;
  left:14px;top:50%;
  width:32px;height:32px;
  transform:translateY(-50%);
  background:radial-gradient(circle at 30% 30%,var(--about-accent) 0%,rgba(225,48,108,.25) 55%,transparent 72%);
  opacity:.55;
  filter:blur(1px);
  border-radius:50%;
  pointer-events:none;
}
body.dark .about-highlight h3::before{opacity:.75;}
.about-highlight h3 + ul{
  list-style:none;
  margin:-.35rem 0 0;
  padding:.85rem 1.05rem 1.05rem 1.25rem;
  background:rgba(255,255,255,.65);
  border:1px solid rgba(0,0,0,.08);
  border-radius:14px;
}
body.dark .about-highlight h3 + ul{
  background:rgba(40,40,40,.72);
  border-color:rgba(255,255,255,.14);
}
.about-highlight h3 + ul li{
  position:relative;
  padding:.42rem 0 .42rem 1.05rem;
  font-size:.9rem;
  border-bottom:1px dashed rgba(0,0,0,.08);
}
body.dark .about-highlight h3 + ul li{border-color:rgba(255,255,255,.14);}
.about-highlight h3 + ul li:last-child{border-bottom:none;}
.about-highlight h3 + ul li::before{
  content:"";
  position:absolute;
  left:.15rem;top:.95rem;
  width:7px;height:7px;
  background:var(--about-accent);
  border-radius:50%;
  box-shadow:0 0 0 3px rgba(225,48,108,.25);
}
body.dark .about-highlight h3 + ul li::before{box-shadow:0 0 0 4px rgba(225,48,108,.35);}
.about-highlight a{
  color: var(--about-accent) !important;
  text-decoration:none;
  font-weight:600;
  position:relative;
  transition:color .25s;
}
.about-highlight a::after{
  content:"";
  position:absolute;
  left:0;bottom:-2px;
  width:100%;height:2px;
  background:linear-gradient(90deg,var(--about-accent),transparent 85%);
  opacity:.55;
  transition:opacity .25s,transform .25s;
  transform:translateY(2px);
}
.about-highlight a:hover::after{opacity:1;transform:translateY(0);}
body.dark .about-highlight a::after{opacity:.75;}
.about-highlight::before{
  content:"";
  position:absolute;
  left:-60px;top:8px;
  width:4px;height:72px;
  background:linear-gradient(var(--about-accent),transparent);
  border-radius:4px;
  opacity:.5;
  pointer-events:none;
}
@media(max-width:900px){.about-highlight::before{display:none;}}
@media(max-width:640px){
  .about-highlight h3{padding:.5rem .75rem .5rem 2.4rem;font-size:.98rem;border-radius:12px;}
  .about-highlight h3 + ul{padding:.75rem .9rem .9rem 1rem;border-radius:12px;}
  .about-highlight h3 + ul li{font-size:.86rem;padding:.42rem 0 .42rem .95rem;}
}
@media (prefers-reduced-motion:reduce){
  .about-highlight a::after,
  .about-highlight a,
  .about-highlight h3,
  .about-highlight h3 + ul li{transition:none;}
}
</style>

<div class="about-highlight">

嗨，我是 **Zakk**，在 **墨爾本**生活。  
我養了 **🐹 天竺鼠**（名字是 **馬鈴薯** 和 **薯餅** 🥔），喜歡 **遊戲**、**Linux** 與 **金融**。  
目前就讀 **Business**。

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
