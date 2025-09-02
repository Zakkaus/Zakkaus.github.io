---
title: "Timeline"
slug: "timeline"
toc: false
date: 2025-09-01
lastmod: 2025-09-01
---

<div id="timelineContainer">Loading...</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Data definitions
  const timelineData = [
    {
      id: "couple",
      title: "Together",
      date: "07/08/2025 11:38",
      image: "/images/timeline/f-avatar.webp",
      alt: "Girlfriend avatar",
      modalTitle: "Relationship",
      modalSubtitle: "Started on August 7, 2025 at 11:38am",
      modalContent: `
        <p>We live in different countries (Australia / Taiwan) and maintain a long-distance relationship. We are both pansexual 🩷💛🩵, embracing diverse gender identities and relationship forms.</p>
        <p>Despite being apart, we maintain daily communication and connection, sharing our lives, work, and hobbies. We support each other and respect each other's independence while planning regular meetings.</p>
        <p>To learn more about our daily life, follow my Instagram: <a href="https://www.instagram.com/abyss_74.50/" target="_blank" rel="noopener" class="tl-highlight-link">@abyss_74.50</a></p>
      `,
      linkUrl: "/about/#relationship"
    },
    {
      id: "hash",
      title: "Hash Brown Age",
      date: "24/06/2025",
      image: "/images/timeline/hashbrown.webp",
      alt: "Hash Brown",
      modalTitle: "Hash Brown",
      modalSubtitle: "Birthday: June 24, 2025",
      modalContent: `
        <p>Hash Brown is a purebred Teddy guinea pig with light brown fur. She's quite active and playful, loves running laps in her cage, often pushing her house around, and is very energetic during playtime.</p>
        <p>Favorite foods: Red and green bell peppers (absolutely loves them), corn silk, and carrots. She likes to be active in the evening and makes squeaking sounds when asking for treats.</p>
        <p>More cute photos of Hash Brown on Instagram: <a href="https://instagram.com/zakk.au" target="_blank" rel="noopener" class="tl-highlight-link">@zakk.au</a></p>
      `,
      linkUrl: "/about/#pets"
    },
    {
      id: "potato",
      title: "Potato Age",
      date: "27/07/2025",
      image: "/images/timeline/potato.webp",
      alt: "Potato",
      modalTitle: "Potato",
      modalSubtitle: "Birthday: July 27, 2025",
      modalContent: `
        <p>Potato is a purebred Teddy guinea pig with dark chocolate fur. She's quite food-motivated and bolder in personality. She often eats and plays at the same time, sometimes even pooping while eating, occasionally leaving droppings in her food bowl.</p>
        <p>Favorite foods: Red and green bell peppers, corn silk, and carrots. She also likes sleeping in hay piles and continues eating after waking up - a greedy but brave little one.</p>
        <p>More daily sharing of Potato on Instagram: <a href="https://instagram.com/zakk.au" target="_blank" rel="noopener" class="tl-highlight-link">@zakk.au</a></p>
      `,
      linkUrl: "/about/#pets"
    }
  ];
  
  // Page HTML
  let html = `
  <div class="tl-container">
    <div class="tl-grid">
      ${timelineData.map(item => `
        <div class="tl-card" data-key="${item.id}">
          <div class="tl-image">
            <img src="${item.image}" alt="${item.alt}" loading="lazy">
          </div>
          <div class="tl-content">
            <h3>${item.title}</h3>
            <div class="tl-counter" id="${item.id}Counter">
              <p class="tl-days">0</p>
              <p class="tl-time">00:00:00</p>
            </div>
            <p class="tl-meta">${item.id === 'couple' ? `Since ${item.date}` : `Birthday: ${item.date}`}</p>
          </div>
          <button class="tl-more">Learn More</button>
        </div>
      `).join('')}
    </div>
    <div class="tl-footer">
      <p class="tl-note" id="timeInfo">Sydney time UTC+10 (AEST) ❄️</p>
    </div>
  </div>
  
  <div class="tl-modal-backdrop">
    <div class="tl-modal">
      <button class="tl-close-btn">✕</button>
      <div class="tl-modal-header">
        <h3 class="tl-modal-title"></h3>
        <p class="tl-modal-subtitle"></p>
      </div>
      <div class="tl-modal-body"></div>
      <div class="tl-modal-footer">
        <a href="#" class="tl-btn tl-about-link">View Details</a>
        <button class="tl-btn tl-close-btn-alt">Close</button>
      </div>
    </div>
  </div>
  `;
  
  // 插入HTML
  document.getElementById('timelineContainer').innerHTML = html;
  
  // 獲取元素
  const modalBackdrop = document.querySelector('.tl-modal-backdrop');
  const modal = document.querySelector('.tl-modal');
  const closeButtons = document.querySelectorAll('.tl-close-btn');
  const aboutLink = document.querySelector('.tl-about-link');
  
  // 處理模態框關閉
  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };
  
  // 綁定關閉事件
  closeButtons.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });
  document.querySelector('.tl-close-btn-alt').addEventListener('click', closeModal);
  
  modalBackdrop.addEventListener('click', e => {
    if (e.target === modalBackdrop) closeModal();
  });
  
  // ESC鍵關閉
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
  
  // 打開模態框
  const openModal = (key) => {
    const data = timelineData.find(item => item.id === key);
    if (!data) return;
    
    modal.querySelector('.tl-modal-title').textContent = data.modalTitle;
    modal.querySelector('.tl-modal-subtitle').textContent = data.modalSubtitle;
    modal.querySelector('.tl-modal-body').innerHTML = data.modalContent;
    aboutLink.href = data.linkUrl;
    
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  
  // 綁定卡片點擊
  document.querySelectorAll('.tl-card').forEach(card => {
    const key = card.getAttribute('data-key');
    const btn = card.querySelector('.tl-more');
    
    card.addEventListener('click', e => {
      if (e.target !== btn && !btn.contains(e.target)) {
        openModal(key);
      }
    });
    
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openModal(key);
    });
  });
  
  // 計算時間
  const MEL_TIMEZONE = 10; // UTC+10
  const MEL_MS = MEL_TIMEZONE * 60 * 60 * 1000;
  
  const getMelbourneTime = () => {
    return new Date(Date.now() + MEL_MS);
  };
  
  const parseDate = (dateStr) => {
    // 處理日期時間格式: DD/MM/YYYY HH:MM
    const [datePart, timePart = "00:00"] = dateStr.split(" ");
    const [day, month, year] = datePart.split('/').map(n => parseInt(n));
    const [hours, minutes] = timePart.split(':').map(n => parseInt(n));
    
    // 使用澳洲時間 UTC+10
    return new Date(Date.UTC(year, month - 1, day, hours - 10, minutes, 0));
  };
  
  const timeSince = (dateStr) => {
    const startDate = parseDate(dateStr);
    const now = getMelbourneTime();
    
    // 計算毫秒差
    const diff = now - startDate;
    
    if (diff < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // 未來日期
    
    // 計算天數與剩餘時間
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((diff % (60 * 1000)) / 1000);
    
    return { days, hours, minutes, seconds };
  };
  
  // 更新計數器 - 雪梨時間
  const updateCounters = () => {
    timelineData.forEach(item => {
      const time = timeSince(item.date);
      const counter = document.getElementById(`${item.id}Counter`);
      if (counter) {
        const daysEl = counter.querySelector('.tl-days');
        const timeEl = counter.querySelector('.tl-time');
        
        if (daysEl) daysEl.textContent = time.days;
        if (timeEl) timeEl.textContent = 
          `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
      }
    });
    
    // 更新時間資訊，使用指定格式
    const now = getMelbourneTime();
    const dateStr = `${String(now.getUTCDate()).padStart(2,'0')}/${String(now.getUTCMonth()+1).padStart(2,'0')}/${now.getUTCFullYear()}`;
    const timeStr = `${String(now.getUTCHours()).padStart(2,'0')}:${String(now.getUTCMinutes()).padStart(2,'0')}:${String(now.getUTCSeconds()).padStart(2,'0')}`;
    const info = document.getElementById('timeInfo');
    if(info){
      info.textContent = `Sydney time: ${dateStr} ${timeStr} - UTC+10 (AEST) ❄️`;
    }
  };
  
  // 立即更新一次
  updateCounters();
  
  // 每秒更新
  setInterval(updateCounters, 1000);
});
</script>

<style>
/* ===== Timeline Design - Perfect Image Edge Alignment ===== */

/* Basic Variables & Container */
.tl-container {
  --tl-accent: var(--hb-active, #e1306c);
  --tl-radius: 18px;
  --tl-bg-light: #fff;
  --tl-bg-dark: #2a2b2f;
  --tl-border-light: rgba(0,0,0,0.06);
  --tl-border-dark: rgba(255,255,255,0.1);
  --tl-shadow: 0 8px 16px rgba(0,0,0,0.08);
  --tl-shadow-hover: 0 12px 24px rgba(0,0,0,0.12);
  
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 0 2rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: rgba(0, 0, 0, 0.85);
}

body.dark .tl-container { color: rgba(255, 255, 255, 0.85); }

/* Card Grid - Desktop 3 columns */
.tl-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 0.25rem;
  margin-bottom: 1.25rem;
}

/* Card Base Style */
.tl-card {
  background: var(--tl-bg-light) !important;
  border-radius: var(--tl-radius);
  box-shadow: var(--tl-shadow);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--tl-border-light);
  height: 100%;
  position: relative;
}

body.dark .tl-card {
  background: var(--tl-bg-dark) !important;
  border-color: var(--tl-border-dark);
}

.tl-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--tl-shadow-hover);
}

/* Image Container - Perfect top edge alignment */
.tl-image {
  position: absolute; /* Absolute positioning for perfect alignment */
  top: 0; /* Direct top edge alignment */
  left: 0; /* Direct left edge alignment */
  right: 0; /* Direct right edge alignment */
  width: 100%;
  height: 0;
  padding-bottom: 100%; /* Maintain 1:1 ratio */
  background: #f0f0f0;
  flex-shrink: 0;
  border-radius: var(--tl-radius) var(--tl-radius) 0 0; /* Explicit top radius */
  overflow: hidden; /* Ensure radius clipping */
}

body.dark .tl-image {
  background: #333;
}

/* Image perfect fill */
.tl-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 0.35s;
}

.tl-card:hover .tl-image img {
  transform: scale(1.05);
}

/* Card Content Area - Consistent with layout */
.tl-content {
  padding: 1rem 1.2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background: inherit;
  position: relative;
  z-index: 1;
  margin-top: 100%; /* Leave space for image */
}

.tl-content h3 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  color: var(--tl-accent);
}

/* Counter */
.tl-counter{margin-bottom:.6rem;}
.tl-days{
  font-size:2.6rem;
  font-weight:800;
  line-height:1;
  margin:0 0 .2rem;
  color:var(--tl-accent);
}
.tl-time{
  font-size:.8rem;
  font-family:monospace;
  letter-spacing:.02rem;
  opacity:.8;
  font-weight:600;
}
.tl-meta{
  font-size:.7rem;
  opacity:.7;
  margin-top:.4rem;
}

/* Button */
.tl-more{
  margin-top:auto;
  background:#f5f5f7;
  color:#333;
  border:none;
  padding:.7rem;
  font-size:.75rem;
  font-weight:600;
  cursor:pointer;
  transition:all .25s;
  border-top:1px solid rgba(0,0,0,.04);
}
.tl-more:hover{
  background:var(--tl-accent);
  color:#fff;
}
body.dark .tl-more{
  background:#32333a;
  color:#ddd;
  border-top:1px solid rgba(255,255,255,.05);
}
body.dark .tl-more:hover{
  background:var(--tl-accent);
  color:#fff;
}

/* Footer note */
.tl-footer{
  margin-top:.8rem;
  text-align:left;
}
.tl-note{
  font-size:.75rem;
  opacity:.8;
  padding-left:.8rem;
  position:relative;
  line-height:1.5;
  font-family:monospace;
  display:inline-block;
}
.tl-note::before{
  content:'';
  position:absolute;
  left:0;top:0;bottom:0;
  width:3px;
  background:var(--tl-accent);
  border-radius:3px;
}

/* Modal */
.tl-modal-backdrop{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,.8);
  display:flex;
  align-items:center;
  justify-content:center;
  padding:1.5rem;
  z-index:9999;
  backdrop-filter:blur(8px);
  opacity:0;
  visibility:hidden;
  transition:opacity .3s,visibility .3s;
}
.tl-modal-backdrop.active{opacity:1;visibility:visible;}
.tl-modal{
  background:#fff;
  width:100%;
  max-width:540px;
  border-radius:18px;
  padding:1.8rem;
  position:relative;
  box-shadow:0 25px 50px -12px rgba(0,0,0,.4);
  max-height:85vh;
  overflow-y:auto;
  transform:scale(.95);
  transition:transform .3s;
  color:rgba(0,0,0,.85);
}
.tl-modal-backdrop.active .tl-modal{transform:scale(1);}
body.dark .tl-modal{
  background:#26272c;
  color:rgba(255,255,255,.9);
  box-shadow:0 25px 50px -12px rgba(0,0,0,.7);
}
.tl-modal-title{
  font-size:1.5rem;
  font-weight:700;
  color:var(--tl-accent);
  margin:0 0 .3rem;
}
body.dark .tl-modal-title{color:#ff8fb7;}
.tl-modal-subtitle{
  font-size:.85rem;
  opacity:.7;
  margin:0 0 1.5rem;
}
.tl-modal-body{
  font-size:.95rem;
  line-height:1.7;
  margin:0 0 1.5rem;
}
.tl-modal-body p{margin:0 0 1rem;}
.tl-highlight-link,
.tl-modal-body a{
  color:var(--tl-accent);
  text-decoration:none;
  font-weight:700;
  border-bottom:2px solid var(--tl-accent);
  padding-bottom:1px;
  transition:background-color .2s,color .2s,border-color .2s;
}
.tl-highlight-link:hover,
.tl-modal-body a:hover{
  background:var(--tl-accent);
  color:#fff;
  border-color:transparent;
}
.tl-modal-footer{
  display:flex;
  justify-content:space-between;
}
.tl-btn{
  padding:.7rem 1.3rem;
  border-radius:10px;
  font-size:.8rem;
  font-weight:600;
  cursor:pointer;
  transition:all .25s;
}
.tl-about-link{
  background:#f0f0f2;
  color:#333;
  text-decoration:none;
}
.tl-about-link:hover{
  background:var(--tl-accent);
  color:#fff;
}
body.dark .tl-about-link{
  background:#32333a;
  color:#ddd;
}
body.dark .tl-about-link:hover{
  background:var(--tl-accent);
  color:#fff;
}
.tl-close-btn-alt{
  background:rgba(0,0,0,.05);
  color:#666;
  border:none;
}
.tl-close-btn-alt:hover{
  background:#f44336;
  color:#fff;
}
body.dark .tl-close-btn-alt{
  background:rgba(255,255,255,.1);
  color:#ddd;
}
body.dark .tl-close-btn-alt:hover{
  background:#f44336;
  color:#fff;
}
.tl-close-btn{
  position:absolute;
  top:1.2rem;
  right:1.2rem;
  width:32px;height:32px;
  background:rgba(0,0,0,.05);
  border:none;
  border-radius:50%;
  font-size:1.2rem;
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  color:#666;
  transition:all .25s;
}
.tl-close-btn:hover{
  background:rgba(0,0,0,.15);
  color:#333;
}
body.dark .tl-close-btn{
  background:rgba(255,255,255,.1);
  color:#bbb;
}
body.dark .tl-close-btn:hover{
  background:rgba(255,255,255,.2);
  color:#fff;
}

/* Loading hint */
#timelineContainer{
  text-align:center;
  padding:1rem 0;
  font-weight:500;
  opacity:.7;
}

/* Tablet */
@media (max-width:1080px){
  .tl-grid{
    grid-template-columns:repeat(2,1fr);
    gap:1.2rem;
  }
}

/* Mobile Responsive - Fix mobile image position */
@media (max-width: 640px) {
  .tl-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0 0.5rem;
  }
  
  .tl-card {
    display: grid;
    grid-template-columns: 110px 1fr;
    height: auto;
    min-height: 110px;
    grid-template-rows: auto;
    grid-template-areas: "image content";
    overflow: hidden;
    position: relative; /* Ensure positioning context */
  }
  
  .tl-image {
    position: absolute; /* Mobile also uses absolute positioning */
    top: 0;
    left: 0;
    width: 110px;
    height: 110px;
    padding-bottom: 0;
    grid-area: image;
    flex-shrink: 0;
    border-radius: var(--tl-radius) 0 0 var(--tl-radius); /* Mobile left radius */
    overflow: hidden;
  }
  
  .tl-content {
    width: auto;
    text-align: left;
    padding: 0.7rem 0.8rem;
    padding-bottom: 2.5rem;
    position: relative;
    grid-area: content;
    margin-top: 0; /* Mobile doesn't need margin-top */
    margin-left: 110px; /* Leave space for left image */
  }
  
  .tl-counter{
    display:flex;
    align-items:flex-end;
    gap:.5rem;
    margin:0 0 .3rem;
  }
  .tl-days{
    font-size:1.8rem;
    margin:0;
  }
  .tl-time{
    font-size:.65rem;
    padding-bottom:.1rem;
  }
  .tl-meta{
    font-size:.65rem;
    margin-top:.2rem;
  }
  .tl-more{
    position:absolute;
    right:.5rem;
    bottom:.5rem;
    left:auto;
    width:auto;
    padding:.4rem .7rem;
    font-size:.65rem;
    border-radius:6px;
    border:none;
    margin:0;
    background:rgba(0,0,0,.05);
    border-top:none;
    z-index:2;
  }
  body.dark .tl-more{
    background:rgba(255,255,255,.08);
  }
}

/* Extra Small Screen */
@media (max-width: 380px) {
  .tl-card {
    grid-template-columns: 90px 1fr;
  }
  
  .tl-image {
    width: 90px;
    height: 90px;
  }
  
  .tl-content {
    margin-left: 90px; /* Adjust to 90px */
  }
}

/* Prefers reduced motion */
@media (prefers-reduced-motion:reduce){
  .tl-card,.tl-image img,.tl-more,.tl-close-btn,.tl-about-link{transition:none!important;}
  .tl-card:hover .tl-image img{transform:none;}
}
</style>
@media (prefers-reduced-motion:reduce){
  .tl-card,.tl-image img,.tl-more,.tl-close-btn,.tl-about-link{transition:none!important;}
  .tl-card:hover .tl-image img{transform:none;}
}
</style>
