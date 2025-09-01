---
title: "About"
slug: "about"
toc: false
date: 2025-09-01
lastmod: 2025-09-01
---
<style>
/* 使用同 zh-hant 樣式，確保雙語一致 */
:root{--about-accent:var(--hb-active,#e1306c);}
.about-page{max-width:840px;margin:0 auto;padding:.75rem 0 2.8rem;font-size:1.02rem;line-height:1.62;}
body.dark .about-page{color:#e9e9eb;}
.about-page .about-hero{
  font-size:1.14rem;
  line-height:1.72;
  margin:0 0 1.6rem;
  padding:1.1rem 1.35rem 1.2rem;
  background:#ffffff;
  border:1px solid #e6e7ea;
  border-radius:18px;
  box-shadow:none;
  position:relative;
  overflow:hidden;
}
body.dark .about-page .about-hero{
  background:#1f2022;
  border:1px solid #35373a;
}
.about-page .about-hero::before,
.about-page .about-hero::after{content:none!important;}
.about-page .about-hero p{margin:.55rem 0;}
.about-page .about-hero p:first-child{margin-top:0;}
.about-page .about-hero p:last-child{margin-bottom:.2rem;}

/* Strong highlight only inside hero */
.about-page strong{
  background:none!important;
  color:inherit!important;
  padding:0!important;
  margin:0!important;
  border-radius:0!important;
  font-weight:600;
}
.about-page .about-hero strong{
  background:linear-gradient(to top,rgba(225,48,108,.32),rgba(225,48,108,0) 65%)!important;
  color:var(--about-accent)!important;
  padding:.18rem .55rem .22rem!important;
  margin:.12rem .25rem .12rem 0!important;
  border-radius:999px!important;
  line-height:1.15;
  letter-spacing:.3px;
  display:inline-block;
}
body.dark .about-page .about-hero strong{
  background:linear-gradient(to top,rgba(225,48,108,.45),rgba(225,48,108,0) 65%)!important;
  color:#ff8fb7!important;
}

/* Headings simplified */
.about-page h3{
  margin:1.9rem 0 .55rem;
  font-size:1.02rem;
  line-height:1.28;
  font-weight:600;
  padding:0 .2rem .15rem .85rem;
  border-bottom:none!important;
  position:relative;
}
.about-page h3::after{content:none!important;}
.about-page h3::before{
  content:"";
  position:absolute;left:0;top:0;bottom:.55rem;
  width:3px;background:var(--about-accent);border-radius:2px;
}

/* First heading after hero */
.about-page .about-hero + h3{
  margin-top:1.35rem !important;
}

/* List compact */
.about-page h3 + ul{
  margin:.15rem 0 .2rem !important;
}
.about-page h3 + ul li{
  padding:.4rem 0 .4rem 1.15rem !important;
}

/* Contacts vertical style already applied earlier (leave) */
/* Override contact link pills to soft tone */
.about-page .about-contacts a{
  background:rgba(225,48,108,.14)!important;
  color:var(--about-accent)!important;
  font-weight:600;
  transition:background .2s,color .2s;
}
body.dark .about-page .about-contacts a{
  background:rgba(225,48,108,.30)!important;
  color:#ff8fb7!important;
}
.about-page .about-contacts a:hover{
  background:var(--about-accent)!important;
  color:#fff!important;
}

/* Top spacing from page title/meta */
.about-page{
  padding-top:1.2rem !important;
}

/* Hero bottom spacing reduced */
.about-page .about-hero{
  margin:0 0 1.6rem !important;
}

/* Section heading spacing */
.about-page h3{
  margin:1.9rem 0 .55rem !important;
}

/* First heading after hero */
.about-page .about-hero + h3{
  margin-top:1.35rem !important;
}

/* List compact */
.about-page h3 + ul{
  margin:.15rem 0 .2rem !important;
}
.about-page h3 + ul li{
  padding:.4rem 0 .4rem 1.15rem !important;
}

/* Contacts block spacing */
.about-page h3:has(+ .about-contacts){
  margin-top:1.6rem !important;
}
.about-page .about-contacts{
  margin:.2rem 0 0 !important;
}

@media (max-width:640px){
  .about-page .about-hero{font-size:1.07rem;padding:.9rem 1rem 1rem;border-radius:16px;}
  .about-page h3{font-size:.95rem;margin:2rem 0 .65rem;}
}
@media (prefers-reduced-motion:reduce){
  .about-page .about-hero *{transition:none!important;}
}
</style>

<div class="about-page">
  <div class="about-hero">
    <p>Hi, I'm <strong>Zakk</strong>, based in <strong>Melbourne</strong>.</p>
    <p>I keep <strong>🐹 guinea pigs</strong> (their names are <strong>Hash Brown</strong> and <strong>Potato Cake</strong> 🥔), enjoy <strong>gaming</strong>, and I'm into <strong>Linux</strong> and <strong>Finance</strong>.</p>
    <p>Currently studying <strong>Business</strong>.</p>
    <p style="margin-top:.8rem;font-size:.82rem;opacity:.75;">Below are my main hardware setups, devices, and ways to get in touch.</p>
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
<ul class="about-contacts">
  <li>Instagram: <a href="https://www.instagram.com/zakk.au/" target="_blank" rel="noopener">@zakk.au</a></li>
  <li>GitHub: <a href="https://github.com/Zakkaus" target="_blank" rel="noopener">Zakkaus</a></li>
  <li>X: <a href="https://x.com/zakkauu" target="_blank" rel="noopener">@zakkauu</a></li>
  <li>Email: <a href="mailto:admin@zakk.au">admin@zakk.au</a></li>
</ul>
</div>