---
title: "About"
slug: "about"
toc: false
---
<style>
.about-highlight{
  --about-accent: var(--hb-active,#e1306c);
  max-width:820px;
  margin:0 auto;
  padding:.5rem 0 3rem;
  line-height:1.6;
  position:relative;
}
.about-highlight p{
  margin:0 0 1.05rem;
  font-size:.96rem;
}
.about-highlight p strong{font-weight:700;}
/* 簡化區塊標題樣式（覆蓋舊的厚重卡片效果） */
.about-highlight h3{
  margin:2.2rem 0 .9rem;
  padding:0 0 .4rem;
  background:none;
  border:none;
  border-left:none;
  border-radius:0;
  font-size:1.06rem;
  font-weight:700;
  line-height:1.25;
  position:relative;
}
.about-highlight h3::before{
  content:"";
  position:absolute;
  left:0;
  bottom:0;
  height:3px;
  width:56px;
  background:linear-gradient(90deg,var(--about-accent,#e1306c),transparent);
  border-radius:3px;
  opacity:.85;
  filter:none;
  transform:none;
}
body.dark .about-highlight h3::before{opacity:.95;}
/* 去除緊接列表的背景卡片（回歸簡潔） */
.about-highlight h3 + ul{
  background:transparent;
  border:none;
  padding:.1rem 0 0 .2rem;
  margin:0 0 .5rem;
  border-radius:0;
}
.about-highlight h3 + ul li{
  border:none;
  padding:.35rem 0 .35rem 1rem;
}
.about-highlight h3 + ul li::before{
  width:6px;height:6px;
  top:1em;
  box-shadow:none;
  background:var(--about-accent,#e1306c);
  opacity:.7;
}

/* 聯繫方式連結膠囊高亮（只影響含連結的 li>a） */
.about-highlight h3 + ul li a[href]{
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
  position:relative;
  transition:background .28s,color .28s,transform .25s,box-shadow .28s;
  box-shadow:0 0 0 0 rgba(225,48,108,.35);
}
.about-highlight h3 + ul li a[href]:hover{
  background:var(--about-accent,#e1306c);
  color:#fff!important;
  transform:translateY(-2px);
  box-shadow:0 6px 18px -6px rgba(225,48,108,.45);
}
body.dark .about-highlight h3 + ul li a[href]{
  background:rgba(225,48,108,.22);
  box-shadow:0 0 0 0 rgba(225,48,108,.5);
}
body.dark .about-highlight h3 + ul li a[href]:hover{
  background:var(--about-accent,#e1306c);
  box-shadow:0 8px 22px -8px rgba(225,48,108,.55);
}

/* 動畫減少偏好 */
@media (prefers-reduced-motion:reduce){
  .about-highlight h3::before,
  .about-highlight h3 + ul li a[href]{
    transition:none;
    transform:none;
  }
}
</style>

<div class="about-highlight">

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
  .about-highlight h3 + ul li{
    font-size:.86rem;
    padding:.42rem 0 .42rem .95rem;
  }
}
/* 動畫偏好：減少運動 */
@media (prefers-reduced-motion:reduce){
  .about-highlight a::after,
  .about-highlight a,
  .about-highlight h3,
  .about-highlight h3 + ul li{
    transition:none;
  }
}
</style>

<div class="about-highlight">

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
