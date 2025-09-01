---
title: "About"
slug: "about"
toc: false
---
<style>
/* 共用簡潔 About 樣式（與中文同步） */
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
  padding:.4rem 0 .45rem .75rem;
  border-left:4px solid var(--about-accent);
  font-size:1.02rem;
  font-weight:650;
  line-height:1.25;
  border-bottom:1px solid rgba(0,0,0,.1);
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
</style>

<div class="about-block">
Hi, I'm **Zakk**, based in **Melbourne**.  
I keep **🐹 guinea pigs** (their names are **Hash Brown** and **Potato Cake** 🥔), enjoy **gaming**, and I'm into **Linux** and **Finance**.  
Currently studying **Business**.

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