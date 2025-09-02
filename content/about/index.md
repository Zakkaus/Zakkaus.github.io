---
title: "About"
slug: "about"
toc: false
date: 2025-09-01
lastmod: 2025-09-01
---

<style>
/* 引用與中文版相同的藍色高亮/Modal 主要樣式（可從 zh-hant 版複製完整樣式） */
/* 簡化：僅保留必要覆寫（建議實務中複製完整 CSS 保持同步） */
.about-page .blue-highlight{
  background:linear-gradient(to top,rgba(29,111,255,.32),rgba(29,111,255,0) 65%);
  color:#1d6fff;
  padding:.18rem .55rem .22rem;
  margin:.12rem .25rem .12rem 0;
  border-radius:999px;
  font-weight:600;
  text-decoration:none;
  display:inline-block;
  line-height:1.15;
  transition:.25s;
}
.about-page .blue-highlight:hover{
  background:#1d6fff;
  color:#fff;
  text-decoration:none;
  box-shadow:0 0 0 3px rgba(29,111,255,.25);
  transform:translateY(-1px);
}
body.dark .about-page .blue-highlight{
  background:linear-gradient(to top,rgba(29,111,255,.48),rgba(29,111,255,0) 65%);
  color:#8bc4ff;
}
body.dark .about-page .blue-highlight:hover{
  box-shadow:0 0 0 3px rgba(29,111,255,.35);
}

.about-modal-backdrop{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;padding:1.5rem;background:rgba(0,0,0,.75);backdrop-filter:blur(8px);z-index:9999;opacity:0;visibility:hidden;transition:.25s;}
.about-modal-backdrop.active{opacity:1;visibility:visible;}
.about-modal{background:#fff;color:#222;border-radius:18px;max-width:560px;width:100%;padding:1.6rem 1.55rem 1.9rem;max-height:85vh;overflow-y:auto;position:relative;font-size:.9rem;line-height:1.65;transform:translateY(12px);transition:.28s;}
.about-modal-backdrop.active .about-modal{transform:translateY(0);}
.about-modal h4{margin:0 0 .55rem;font-size:1.15rem;font-weight:700;color:#1d6fff;}
.about-modal .am-sub{font-size:.7rem;opacity:.65;margin:-.25rem 0 1.1rem;font-weight:600;}
.about-modal-close{position:absolute;top:.8rem;right:.8rem;width:34px;height:34px;border:none;border-radius:50%;background:rgba(0,0,0,.08);cursor:pointer;font-size:1.05rem;display:flex;align-items:center;justify-content:center;transition:.22s;}
.about-modal-close:hover{background:rgba(0,0,0,.18);}
.about-modal a{ @supports (background: color(display-p3 1 1 1)){ } color:#1d6fff;font-weight:700;text-decoration:none;border:none;padding:0;background:none;transition:.2s;}
.about-modal a:hover{color:#0b54ff;text-decoration:underline;}
body.dark .about-modal{background:#26272c;color:#ddd;}
body.dark .about-modal h4{color:#8bc4ff;}
body.dark .about-modal a{color:#8bc4ff;}
body.dark .about-modal a:hover{color:#bfe2ff;}
.about-modal .am-section{margin:0 0 1.05rem;}
</style>

<div class="about-page">
  <div class="about-hero">
    <p>Hi, I'm <strong>Zakk</strong>, living in <strong>Australia</strong> and studying <strong>Business</strong>.</p>
    <p>I have two <strong>guinea pigs</strong>:
      <a href="#" class="blue-highlight" data-am-open="potato">Potato</a>
      <a href="#" class="blue-highlight" data-am-open="hash">Hash&nbsp;Brown</a>.
      I enjoy <strong>gaming</strong>, <strong>Linux</strong>, and <strong>finance</strong>; also follow Apple / Samsung / Google ecosystems, sometimes <strong>draw</strong> & <strong>design</strong>. See more on
      <a class="blue-highlight" href="https://www.instagram.com/zakk.au/" target="_blank" rel="noopener"><strong>Instagram</strong></a>.
    </p>
    <p>My girlfriend <a href="#" class="blue-highlight" data-am-open="couple">Paper</a> and I are in a long‑distance relationship (Australia / Taiwan). We are <strong>pansexual 🩷💛🩵</strong>, share daily life, study and work. We have many aligned interests & viewpoints, fit naturally — truly <strong>soulmates</strong>. We first met in
      <a href="https://www.youtube.com/@xilanceylan" target="_blank" rel="noopener" class="blue-highlight">Ceylan</a>'s Discord — 
      <a href="/timeline/#couple" class="blue-highlight">see how long we've been together here</a>.
    </p>
  </div>

  <h3>Gear (Brief)</h3>
  <ul>
    <li>Desktop: Ryzen 9 7950X3D / RTX 4080 SUPER / 64GB DDR5</li>
    <li>Laptops: MacBook Air M2 / ROG Zephyrus G16 Air</li>
    <li>Phones: Z Fold 7, Pixel 7 Pro, iPhone 14, iPhone 16 Pro</li>
  </ul>

  <h3>Contact</h3>
  <ul>
    <li><a href="https://www.instagram.com/zakk.au/" target="_blank" rel="noopener" class="blue-highlight">@zakk.au</a></li>
    <li><a href="https://github.com/Zakkaus" target="_blank" rel="noopener" class="blue-highlight">GitHub</a></li>
    <li><a href="https://x.com/zakkauu" target="_blank" rel="noopener" class="blue-highlight">X / Twitter</a></li>
    <li><a href="mailto:admin@zakk.au" class="blue-highlight">admin@zakk.au</a></li>
  </ul>
</div>

<!-- Shared Modal -->
<div class="about-modal-backdrop" id="aboutModalBackdrop">
  <div class="about-modal" role="dialog" aria-modal="true" aria-labelledby="aboutModalTitle">
    <button class="about-modal-close" type="button" aria-label="Close" id="aboutModalClose">✕</button>
    <div id="aboutModalContent"></div>
  </div>
</div>

<script>
(()=> {
  const data = {
    couple: {
      title: "Our Relationship",
      sub: "Since 2025/08/07 11:38",
      html: `
        <div class="am-section"><p>I (Zakk) and Paper live apart (Australia / Taiwan), long‑distance & both <strong>pansexual 🩷💛🩵</strong>.</p></div>
        <div class="am-section"><p>We share daily life, study, work, ideas & music; values and rhythm align — we feel like genuine <strong>soulmates</strong>.</p></div>
        <div class="am-section"><p>Met inside <a href="https://www.youtube.com/@xilanceylan" target="_blank" rel="noopener" class="blue-highlight">Ceylan</a>'s Discord. We meet every few months; Paper plans to study in Australia after high school.</p></div>
        <div class="am-section"><p><a href="/timeline/#couple" class="blue-highlight">See how long we've been together</a> | Paper IG: <a href="https://www.instagram.com/abyss_74.5/" target="_blank" rel="noopener" class="blue-highlight">@abyss_74.5</a></p></div>
      `
    },
    hash: {
      title: "Hash Brown",
      sub: "Birthday: 2025/06/24",
      html: `
        <div class="am-section"><p>Purebred Teddy guinea pig, light brown, energetic and cage runner.</p></div>
        <div class="am-section"><p>Loves red/green bell peppers, corn silk, carrots; very vocal evenings.</p></div>
        <div class="am-section"><p><a href="/timeline/#hash" class="blue-highlight">See her days counter</a> | More: <a href="https://www.instagram.com/zakk.au/" target="_blank" rel="noopener" class="blue-highlight">@zakk.au</a></p></div>
      `
    },
    potato: {
      title: "Potato",
      sub: "Birthday: 2025/07/27",
      html: `
        <div class="am-section"><p>Dark chocolate Teddy; bold & food‑driven; sometimes eats & poops simultaneously.</p></div>
        <div class="am-section"><p>Enjoys bell peppers, corn silk, carrots; naps buried in hay then resumes eating.</p></div>
        <div class="am-section"><p><a href="/timeline/#potato" class="blue-highlight">See her days counter</a> | More: <a href="https://www.instagram.com/zakk.au/" target="_blank" rel="noopener" class="blue-highlight">@zakk.au</a></p></div>
      `
    }
  };

  const backdrop = document.getElementById('aboutModalBackdrop');
  const wrap = document.getElementById('aboutModalContent');
  const closeBtn = document.getElementById('aboutModalClose');

  function openModal(k){
    const d = data[k];
    if(!d) return;
    wrap.innerHTML = `<h4 id="aboutModalTitle">${d.title}</h4><div class="am-sub">${d.sub}</div>${d.html}`;
    backdrop.classList.add('active');
    document.body.style.overflow='hidden';
  }
  function closeModal(){
    backdrop.classList.remove('active');
    document.body.style.overflow='';
  }
  document.querySelectorAll('[data-am-open]').forEach(el=>{
    el.addEventListener('click',e=>{
      e.preventDefault();
      openModal(el.getAttribute('data-am-open'));
    });
  });
  backdrop.addEventListener('click',e=>{ if(e.target===backdrop) closeModal(); });
  closeBtn.addEventListener('click',closeModal);
  document.addEventListener('keydown',e=>{ if(e.key==='Escape' && backdrop.classList.contains('active')) closeModal(); });
})();
</script>