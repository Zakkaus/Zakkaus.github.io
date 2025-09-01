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
  margin:0 0 2.1rem;
  padding:1.1rem 1.35rem 1.2rem;
  background:#ffffff;
  border:1px solid #e6e7ea;
  border-radius:18px;
  position:relative;
  box-shadow:0 2px 4px -2px rgba(0,0,0,.06),0 8px 28px -12px rgba(0,0,0,.06);
  overflow:hidden;
}
body.dark .about-page .about-hero{
  background:#1f2022;
  border:1px solid #35373a;
  box-shadow:0 2px 6px -2px rgba(0,0,0,.55),0 10px 34px -16px rgba(0,0,0,.55);
}
.about-page .about-hero::before{
  content:"";
  position:absolute;
  left:0;top:0;bottom:0;
  width:4px;
  background:linear-gradient(to bottom,var(--about-accent),rgba(225,48,108,.25));
  border-radius:4px 0 0 4px;
  opacity:.9;
}
body.dark .about-page .about-hero::before{
  background:linear-gradient(to bottom,var(--about-accent),rgba(225,48,108,.35));
}
.about-page .about-hero::after{
  content:"";
  position:absolute;
  inset:0;
  background:
    radial-gradient(circle at 85% 18%,rgba(225,48,108,.18),transparent 55%),
    radial-gradient(circle at 12% 82%,rgba(225,48,108,.12),transparent 60%);
  mix-blend-mode:overlay;
  opacity:.75;
  pointer-events:none;
}
body.dark .about-page .about-hero::after{opacity:.55;mix-blend-mode:normal;}
.about-page .about-hero p{margin:.65rem 0;}
.about-page .about-hero p:first-child{margin-top:0;}
.about-page .about-hero p:last-child{margin-bottom:0;}
.about-page strong{font-weight:600;color:var(--about-accent);background:rgba(225,48,108,.16);padding:.18rem .55rem .22rem!important;margin:.12rem .25rem .12rem 0!important;line-height:1.15;display:inline-block;border-radius:999px;letter-spacing:.3px;}
body.dark .about-page strong{background:rgba(225,48,108,.32);color:#ff8fb7;}
.about-page h3{margin:2.1rem 0 .7rem;font-size:1.02rem;line-height:1.28;font-weight:600;padding:0 .2rem .15rem .85rem;position:relative;border-bottom:none!important;}
body.dark .about-page h3{border-bottom:1px solid #3a3d42;}
.about-page h3:before{content:"";position:absolute;left:0;top:0;bottom:.55rem;width:3px;background:var(--about-accent);border-radius:2px;}
.about-page h3:after{content:none!important;}
.about-page h3+ul{list-style:none;margin:.2rem 0 0;padding:0;}
.about-page h3+ul li{position:relative;padding:.46rem 0 .46rem 1.15rem;font-size:.9rem;}
.about-page h3+ul li:before{content:"";position:absolute;left:0;top:.98rem;width:6px;height:6px;border-radius:50%;background:var(--about-accent);opacity:.55;}
body.dark .about-page h3+ul li:before{opacity:.75;}
.about-page a[href^="http"],.about-page a[href^="mailto:"]{color:var(--about-accent);font-weight:600;text-decoration:none;transition:color .18s;}
.about-page a:hover{text-decoration:underline;}
.about-page .about-contacts{display:block!important;flex-wrap:nowrap!important;gap:0!important;margin:.25rem 0 0!important;padding:0!important;list-style:none;}
.about-page .about-contacts li{display:block!important;position:relative;margin:0 0 .45rem!important;padding:.42rem 0 .42rem 1.15rem!important;background:transparent!important;}
.about-page .about-contacts li:last-child{margin-bottom:0!important;}
.about-page .about-contacts li::before{content:"";position:absolute;left:0;top:.95rem;width:6px;height:6px;background:var(--about-accent);border-radius:50%;opacity:.55;}
body.dark .about-page .about-contacts li::before{opacity:.75;}
.about-page .about-contacts a{background:rgba(225,48,108,.14)!important;padding:.28rem .55rem .32rem!important;border-radius:6px!important;font-size:.72rem!important;letter-spacing:.3px;display:inline-block;text-decoration:none;color:var(--about-accent);transition:background .2s,color .2s;}
body.dark .about-page .about-contacts a{background:rgba(225,48,108,.30)!important;color:#ff8fb7!important;}
.about-page .about-contacts a:hover{background:var(--about-accent)!important;color:#fff!important;}
@media (max-width:640px){
  .about-page{font-size:.97rem;}
  .about-page .about-hero{
    font-size:1.07rem;
    padding:.9rem 1rem 1rem;
    border-radius:16px;
  }
  .about-page h3{font-size:.95rem;margin:2rem 0 .75rem;}
  .about-page h3+ul li{font-size:.86rem;padding:.4rem 0 .4rem 1rem;}
  .about-page strong{padding:.16rem .5rem .2rem;}
}
@media (prefers-reduced-motion:reduce){
  .about-page .about-hero,
  .about-page .about-hero::after{transition:none!important;}
}
</style>

<div class="about-page">
  <div class="about-hero">
    <p>Hi, I'm <strong>Zakk</strong>, based in <strong>Melbourne</strong>.</p>
    <p>I keep <strong>🐹 guinea pigs</strong> (their names are <strong>Hash Brown</strong> and <strong>Potato Cake</strong> 🥔), enjoy <strong>gaming</strong>, and I'm into <strong>Linux</strong> and <strong>Finance</strong>.</p>
    <p>Currently studying <strong>Business</strong>.</p>
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