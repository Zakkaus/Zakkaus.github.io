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
  // Data definition
  const timelineData = [
    {
      id: "couple",
      title: "Days Together",
      date: "07/08/2025",
      image: "/images/timeline/f-avatar.webp",
      alt: "Avatar",
      modalTitle: "Our Relationship",
      modalSubtitle: "Started on August 7, 2025",
      modalContent: `
        <p>We live in different countries/regions (Melbourne, Australia and Taipei, Taiwan) and maintain a long-distance relationship. We both identify as pansexual 🩷💛🩵, embracing diverse gender identities and relationship forms.</p>
        <p>Despite the distance, we stay connected through daily communication, sharing our lives, work, and interests. We respect each other's independence while planning regular visits.</p>
        <p>To see more about our daily life, follow my Instagram: <a href="https://www.instagram.com/abyss_74.50/" target="_blank" rel="noopener" class="tl-highlight-link">@abyss_74.50</a></p>
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
        <p>Hash Brown is a purebred Teddy guinea pig with light brown fur. He's very active and energetic, loves doing parkour in his cage, and often pushes his hideout around while playing with boundless energy.</p>
        <p>Favorite foods: red and green bell peppers (loves these the most), corn silk and carrots. He's usually active in the evening and makes squeaking sounds when asking for treats.</p>
        <p>See more adorable photos of Hash Brown on Instagram: <a href="https://instagram.com/zakk.au" target="_blank" rel="noopener" class="tl-highlight-link">@zakk.au</a></p>
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
        <p>Potato is a purebred Teddy guinea pig with dark chocolate fur. He has a greedy personality and is quite brave. He often eats and plays simultaneously, sometimes pooping while eating, and occasionally even in his food bowl.</p>
        <p>Favorite foods: red and green bell peppers, corn silk and carrots. He also enjoys sleeping in hay piles and continues eating right after waking up - a brave little glutton.</p>
        <p>For more daily updates about Potato, check Instagram: <a href="https://instagram.com/zakk.au" target="_blank" rel="noopener" class="tl-highlight-link">@zakk.au</a></p>
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
      <p class="tl-note">Melbourne time UTC+10 (AEST) ❄️</p>
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
  
  // Insert HTML
  document.getElementById('timelineContainer').innerHTML = html;
  
  // Get elements
  const modalBackdrop = document.querySelector('.tl-modal-backdrop');
  const modal = document.querySelector('.tl-modal');
  const closeButtons = document.querySelectorAll('.tl-close-btn');
  const aboutLink = document.querySelector('.tl-about-link');
  const closeAltButton = document.querySelector('.tl-close-btn-alt');
  
  // Handle modal closing
  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };
  
  // Bind close events
  closeButtons.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });
  closeAltButton.addEventListener('click', closeModal);
  
  modalBackdrop.addEventListener('click', e => {
    if (e.target === modalBackdrop) closeModal();
  });
  
  // ESC key close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
  
  // Open modal
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
  
  // Bind card clicks
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
  
  // Calculate time
  const MEL_TIMEZONE = 10; // UTC+10
  const MEL_MS = MEL_TIMEZONE * 60 * 60 * 1000;
  
  const getMelbourneTime = () => {
    return new Date(Date.now() + MEL_MS);
  };
  
  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/').map(n => parseInt(n));
    return new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
  };
  
  const timeSince = (dateStr) => {
    const startDate = parseDate(dateStr);
    const now = getMelbourneTime();
    
    // Calculate millisecond difference
    const diff = now - startDate;
    
    if (diff < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // Future date
    
    // Calculate days and remaining time
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((diff % (60 * 1000)) / 1000);
    
    return { days, hours, minutes, seconds };
  };
  
  // Update counters
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
  };
  
  // Update immediately once
  updateCounters();
  
  // Update every second
  setInterval(updateCounters, 1000);
});
</script>

<style>
/* 基本樣式 */
.tl-container {
  --tl-accent: var(--hb-active, #e1306c);
  --tl-radius: 22px;
  --tl-bg-light: #fff;
  --tl-bg-dark: #2a2b2f;
  --tl-border-light: rgba(0,0,0,0.08);
  --tl-border-dark: rgba(255,255,255,0.15);
  
  max-width: 1080px;
  margin: 0 auto;
  padding: 2rem 0 3rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: rgba(0, 0, 0, 0.85);
}

body.dark .tl-container {
  color: rgba(255, 255, 255, 0.85);
}

/* 網格布局 */
.tl-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.8rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 1080px) {
  .tl-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .tl-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

/* 卡片樣式 */
.tl-card {
  position: relative;
  background: var(--tl-bg-light);
  border: 1px solid var(--tl-border-light);
  border-radius: var(--tl-radius);
  overflow: hidden;
  padding-bottom: 3rem;
  box-shadow: 0 8px 25px -10px rgba(0,0,0,0.15);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

body.dark .tl-card {
  background: var(--tl-bg-dark);
  border-color: var(--tl-border-dark);
  box-shadow: 0 10px 35px -8px rgba(0,0,0,0.35);
}

.tl-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 40px -12px rgba(0,0,0,0.25);
}

/* 卡片圖片 - 調整裁切效果 */
.tl-image {
  height: 200px;
  overflow: hidden;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

body.dark .tl-image {
  background-color: #333;
}

.tl-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.tl-card:hover .tl-image img {
  transform: scale(1.05);
}

/* 卡片內容 */
.tl-content {
  padding: 1.2rem 1.4rem;
  text-align: center;
}

.tl-content h3 {
  font-size: 1.05rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  color: var(--tl-accent);
}

/* 計時器樣式 */
.tl-counter {
  margin-bottom: 0.6rem;
}

.tl-days {
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 0.3rem;
  color: var(--tl-accent);
}

.tl-time {
  font-size: 0.85rem;
  font-family: monospace;
  letter-spacing: 0.03rem;
  opacity: 0.8;
  font-weight: 600;
}

.tl-meta {
  font-size: 0.7rem;
  opacity: 0.7;
}

/* 更多按鈕 */
.tl-more {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f5f5f7;
  color: #333;
  border: none;
  padding: 0.7rem;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.tl-more:hover {
  background: var(--tl-accent);
  color: white;
}

body.dark .tl-more {
  background: #3a3c42;
  color: #ddd;
}

body.dark .tl-more:hover {
  background: var(--tl-accent);
  color: white;
}

/* 頁腳與時區備註 - 靠左對齊 */
.tl-footer {
  text-align: left;
  padding: 0;
}

.tl-note {
  font-size: 0.7rem;
  opacity: 0.7;
  padding-left: 0.8rem;
  border-left: 4px solid var(--tl-accent);
  margin: 0;
  font-weight: 500;
  line-height: 1.5;
}

/* 模態框樣式 - 修復白色薄膜問題 */
.tl-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 9999;
  backdrop-filter: blur(5px);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.25s;
}

.tl-modal-backdrop.active {
  opacity: 1;
  visibility: visible;
}

.tl-modal {
  background: #fff;
  width: 100%;
  max-width: 540px;
  border-radius: 16px;
  padding: 1.5rem;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.4);
  max-height: 80vh;
  overflow-y: auto;
  color: rgba(0, 0, 0, 0.85);
}

body.dark .tl-modal {
  background: #2a2b2f;
  color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7);
}

/* 模態框標題 */
.tl-modal-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--tl-accent);
  margin-bottom: 0.3rem;
}

body.dark .tl-modal-title {
  color: #ff8fb7;
}

.tl-modal-subtitle {
  font-size: 0.8rem;
  opacity: 0.7;
}

/* 模態框內容 */
.tl-modal-body {
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.tl-modal-body p {
  margin-bottom: 1rem;
}

/* 強調可點擊連結 */
.tl-highlight-link {
  color: var(--tl-accent);
  text-decoration: none;
  font-weight: 700;
  border-bottom: 2px solid var(--tl-accent);
  padding-bottom: 1px;
  transition: background-color 0.2s, color 0.2s;
}

.tl-highlight-link:hover {
  background-color: var(--tl-accent);
  color: white;
  border-color: transparent;
}

.tl-modal-body a {
  color: var(--tl-accent);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.tl-modal-body a:hover {
  border-color: var(--tl-accent);
}

/* 模態框按鈕 */
.tl-modal-footer {
  display: flex;
  justify-content: space-between;
}

.tl-btn {
  padding: 0.65rem 1.2rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.tl-about-link {
  background: #f0f0f2;
  color: #333;
  text-decoration: none;
}

.tl-about-link:hover {
  background: var(--tl-accent);
  color: white;
}

.tl-close-btn-alt {
  background: rgba(0,0,0,0.05);
  color: #666;
  border: none;
}

.tl-close-btn-alt:hover {
  background: #f44336;
  color: white;
}

body.dark .tl-close-btn-alt {
  background: rgba(255,255,255,0.1);
  color: #ddd;
}

.tl-close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  border-radius: 50%;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
  transition: background 0.2s;
}

.tl-close-btn:hover {
  background: rgba(0,0,0,0.05);
}

body.dark .tl-close-btn {
  color: #bbb;
}

body.dark .tl-close-btn:hover {
  background: rgba(255,255,255,0.1);
}

/* 手機適配 */
@media (max-width: 640px) {
  .tl-image {
    height: 180px;
  }
  
  .tl-content {
    padding: 1rem 1.2rem;
  }
  
  .tl-days {
    font-size: 2.4rem;
  }
  
  .tl-modal {
    padding: 1.2rem;
  }
  
  .tl-modal-title {
    font-size: 1.25rem;
  }
}

/* 載入提示 */
#timelineContainer {
  text-align: center;
  padding: 3rem 0;
  font-weight: 500;
  opacity: 0.7;
}

/* 減少動畫 */
@media (prefers-reduced-motion: reduce) {
  .tl-card,
  .tl-image img,
  .tl-modal-backdrop,
  .tl-highlight-link {
    transition: none !important;
  }
  
  .tl-card:hover {
    transform: none;
  }
}
</style>
