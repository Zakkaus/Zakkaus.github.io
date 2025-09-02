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

/* Unified h3 heading effect (same as zh-hant) */
.about-page h3{
  margin:1.9rem 0 .55rem;
  font-size:1.02rem;
  line-height:1.28;
  font-weight:600;
  padding:0 .2rem .15rem .85rem;
  border-bottom:none!important;
  position:relative;
  background:linear-gradient(to right,rgba(225,48,108,.10),rgba(225,48,108,0) 72%) !important;
  border-radius:6px !important;
}
body.dark .about-page h3{
  background:linear-gradient(to right,rgba(225,48,108,.22),rgba(225,48,108,0) 72%) !important;
}
.about-page h3::after{
  content:"";
  position:absolute;
  left:.75rem;
  bottom:0;
  height:2px;
  width:64px;
  background:var(--about-accent);
  border-radius:2px;
  opacity:.78;
}
body.dark .about-page h3::after{opacity:.9;}

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

/* === Unified equipment & contacts list styling (mirrors zh-hant) === */
.about-page{
  --about-list-font:.9rem;
  --about-list-gap:.42rem;
  --about-bullet-size:6px;
  --about-link-pill:0;
}
.about-page h3 + ul,
.about-page .about-contacts{
  list-style:none!important;
  margin:.35rem 0 .3rem!important;
  padding:0!important;
  display:block!important;
}
.about-page h3 + ul li,
.about-page .about-contacts li{
  position:relative;
  padding:var(--about-list-gap) 0 var(--about-list-gap) 1.1rem!important;
  margin:0!important;
  font-size:var(--about-list-font);
  line-height:1.45;
}
.about-page h3 + ul li::before,
.about-page .about-contacts li::before{
  content:"";
  position:absolute;
  left:0;top:.95rem;
  width:var(--about-bullet-size);height:var(--about-bullet-size);
  background:var(--about-accent);
  border-radius:50%;
  opacity:.55;
}
body.dark .about-page h3 + ul li::before,
body.dark .about-page .about-contacts li::before{opacity:.75;}
.about-page .about-contacts a,
.about-page h3 + ul li a{
  color:var(--about-accent);
  font-weight:600;
  text-decoration:none;
  padding:.05rem .1rem;
  border-radius:4px;
  transition:color .18s,background-color .18s;
}
.about-page .about-contacts a:hover,
.about-page h3 + ul li a:hover{text-decoration:underline;}
/* Optional pill mode (enable via inline style: style="--about-link-pill:1") */
.about-page[style*="--about-link-pill:1"] .about-contacts a,
.about-page[style*="--about-link-pill:1"] h3 + ul li a{
  padding:.38rem .65rem;
  background:rgba(225,48,108,.12);
  border-radius:8px;
  font-size:.68rem;
  letter-spacing:.4px;
  line-height:1;
  text-decoration:none;
}
body.dark .about-page[style*="--about-link-pill:1"] .about-contacts a,
body.dark .about-page[style*="--about-link-pill:1"] h3 + ul li a{
  background:rgba(225,48,108,.28);
  color:#ff8fb7;
}
.about-page[style*="--about-link-pill:1"] .about-contacts a:hover,
.about-page[style*="--about-link-pill:1"] h3 + ul li a:hover{
  background:var(--about-accent);
  color:#fff;
}

/* === Section heading effect: left red bar + bottom accent line === */
.about-page h3{
  background:none!important;
  border-radius:0!important;
  position:relative;
}
.about-page h3::before{
  width:3px!important;
}
.about-page h3::after{
  content:"";
  position:absolute;
  left:.75rem;
  bottom:-2px;
  width:64px;
  height:2px;
  background:var(--about-accent);
  border-radius:2px;
  opacity:.82;
}

/* === Hero link styling (distinct from non-link highlights) === */
/* Changed to blue for clearer contrast vs regular accent */
.about-page .about-hero a{
  --hero-link-accent:#1d6fff;
  position:relative;
  display:inline-block;
  padding:.16rem .55rem .20rem;
  margin:.08rem .18rem .08rem 0;
  color:#0b3d91;
  background:rgba(29,111,255,.08);
  border:1px solid rgba(29,111,255,.20);
  border-radius:9px;
  font-weight:600;
  text-decoration:none;
  line-height:1.18;
  transition:background .22s,color .22s,box-shadow .22s,border-color .22s,transform .08s;
}
body.dark .about-page .about-hero a{
  color:#9fd1ff;
  background:rgba(29,111,255,.12);
  border-color:rgba(29,111,255,.28);
}
.about-page .about-hero a:hover,
.about-page .about-hero a:focus-visible{
  background:var(--hero-link-accent);
  color:#fff;
  border-color:var(--hero-link-accent);
  box-shadow:0 0 0 4px rgba(29,111,255,.12);
  text-decoration:none;
  transform:translateY(-1px);
}
body.dark .about-page .about-hero a:hover,
body.dark .about-page .about-hero a:focus-visible{
  box-shadow:0 0 0 4px rgba(29,111,255,.18);
}
.about-page .about-hero a:active{transform:translateY(0);}
.about-page .about-hero a strong{
  background:none!important;
  padding:0!important;
  margin:0!important;
  border-radius:0!important;
  color:inherit!important;
  line-height:inherit!important;
}
@media (max-width:640px){
  .about-page .about-hero{font-size:1.07rem;padding:.9rem 1rem 1rem;border-radius:16px;}
  .about-page h3{font-size:.95rem;margin:2rem 0 .65rem;}
  .about-page h3 + ul li,
  .about-page .about-contacts li{
    padding:.38rem 0 .38rem 1rem!important;
  }
  .about-page h3 + ul li::before,
  .about-page .about-contacts li::before{
    top:.85rem;
  }
  .about-page .about-hero a{padding:.14rem .5rem .18rem;margin:.06rem .15rem .06rem 0;}
}
@media (prefers-reduced-motion:reduce){
  .about-page .about-hero *{transition:none!important;}
}
</style>

<div class="about-page">
  <div class="about-hero">
    <p>Hi, I'm <strong>Zakk</strong>, based in <strong>Melbourne</strong> and studying <strong>Business</strong>.</p>
    <p>I keep <strong>🐹 guinea pigs</strong> (names: <strong>Hash&nbsp;Brown🥔</strong> and <strong>Potato</strong> — they're both <strong>Teddy</strong> guinea pigs<small style="opacity:.6;margin-left:.35rem;">name idea from <a href="https://mcdonalds.com.hk/en/product/hash-browns/" target="_blank" rel="noopener"><strong>McDonald's Hash Browns</strong></a></small>). I enjoy <strong>gaming</strong>, <strong>Linux</strong> and <strong>finance</strong>, and follow the Apple, Samsung and Google ecosystems. I listen to melancholic music and occasionally do <strong>drawing</strong> and <strong>design</strong>. You can see my guinea pigs and daily life on <a href="https://www.instagram.com/zakk.au/" target="_blank" rel="noopener"><strong>Instagram</strong></a>.</p>
    <p>My girlfriend lives in <strong>Taiwan</strong>; we are both <strong>pansexual 🩷💛🩵</strong>. You can see her on <a href="https://www.instagram.com/abyss_74.50/" target="_blank" rel="noopener"><strong>Instagram</strong></a>.</p>
    <p style="margin-top:.8rem;font-size:.82rem;opacity:.75;">Below are my main hardware, devices, and ways to reach me.</p>
  </div>

### 💻 Desktop PC
- Motherboard: ASUS ROG STRIX X670E-A GAMING WIFI  
- CPU: AMD Ryzen 9 7950X3D (16C/32T)  
- GPU: NVIDIA GeForce RTX 4080 SUPER  
- RAM: 64 GB DDR5 6400 MHz  
- Network: Static public IP (Aussie Telecom, 1000/50 Mbps)  
- Router: BE9300 Tri-Band Wi-Fi 7  
- OS: Windows 11 Pro 64-bit + Gentoo Linux (KDE Plasma)  

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