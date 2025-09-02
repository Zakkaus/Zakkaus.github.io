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
  // 資料定義
  const timelineData = [
    {
      id: "couple",
      title: "Days Together",
      date: "07/08/2025 11:38",
      image: "/images/timeline/f-avatar.webp",
      alt: "Avatar",
      modalTitle: "Our Relationship",
      modalSubtitle: "Started on August 7, 2025 11:38am",
      modalContent: `
        <p>We live in different countries/regions (Australia and Taiwan) and maintain a long-distance relationship. We both identify as pansexual 🩷💛🩵, embracing diverse gender identities and relationship forms.</p>
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
  
  // 頁面HTML
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
      <p class="tl-note" id="timeInfo">Melbourne time UTC+10 (AEST) ❄️</p>
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
  
  // 更新計數器
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
    
    // 更新時間資訊，添加秒數顯示
    const now = getMelbourneTime();
    const dateStr = `${String(now.getUTCDate()).padStart(2, '0')}/${String(now.getUTCMonth() + 1).padStart(2, '0')}/${now.getUTCFullYear()}`;
    const timeStr = `${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')}`;
    document.getElementById('timeInfo').textContent = `Melbourne time: ${dateStr} ${timeStr} - UTC+10 (AEST) ❄️`;
  };
  
  // 立即更新一次
  updateCounters();
  
  // 每秒更新
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
  padding: 0.5rem 0 3rem;  /* 大幅減少頂部間距 */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: rgba(0, 0, 0, 0.85);
}

body.dark .tl-container {
  color: rgba(255, 255, 255, 0.85);
}

/* 網格布局 - 大幅減少間距 */
.tl-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.8rem;
  margin-bottom: 1.5rem;
  justify-content: center;
  margin-top: 0.5rem;  /* 大幅減少與標題的間距 */
}

@media (max-width: 1080px) {
  .tl-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 640px) {
  .tl-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 0.5rem;
    margin-top: 0.3rem;  /* 手機版最小間距 */
  }
  
  .tl-card {
    max-width: none;
    width: 100%;
  }
}

/* 卡片樣式 - 完全重新設計，消除薄膜效果 */
.tl-card {
  position: relative;
  background: var(--tl-bg-light) !important;  /* 強制應用背景色 */
  border: 1px solid var(--tl-border-light);
  border-radius: var(--tl-radius);
  overflow: hidden;
  padding-bottom: 3rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);  /* 簡化陰影，避免薄膜效果 */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 auto;
  width: 100%;
}

body.dark .tl-card {
  background: var(--tl-bg-dark) !important;  /* 強制應用暗色背景 */
  border-color: var(--tl-border-dark);
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
}

.tl-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

body.dark .tl-card:hover {
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}

/* 卡片圖片 - 完全重新設計，修復圓角和裁切問題 */
.tl-image {
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
  background-color: #f0f0f0;
  flex-shrink: 0;
  border-radius: var(--tl-radius) var(--tl-radius) 0 0;  /* 只給頂部圓角 */
}

body.dark .tl-image {
  background-color: #333;
}

.tl-image img {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);  /* 精確居中，避免偏移 */
  transition: transform 0.3s ease;
}

.tl-card:hover .tl-image img {
  transform: translate(-50%, -50%) scale(1.05);
}

/* 卡片內容 */
.tl-content {
  padding: 1.2rem 1.4rem;
  text-align: center;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

/* 頁腳與時區備註 */
.tl-footer {
  text-align: left;
  padding: 0;
  overflow: hidden;
}

.tl-note {
  font-size: 0.7rem;
  opacity: 0.7;
  padding-left: 0.8rem;
  border-left: 4px solid var(--tl-accent);
  margin: 0;
  font-weight: 500;
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 480px) {
  .tl-note {
    white-space: normal;
    font-size: 0.65rem;
  }
}

/* 模態框樣式 */
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

/* 手機適配 - 修復小螢幕問題 */
@media (max-width: 480px) {
  .tl-grid {
    gap: 1rem;
    padding: 0;
  }
  
  .tl-card {
    display: grid;
    grid-template-columns: 120px 1fr;
    padding-bottom: 0;
    max-height: none;
    height: auto;
    border-radius: var(--tl-radius);
  }
  
  .tl-image {
    width: 120px;
    height: 120px;
    border-radius: var(--tl-radius) 0 0 var(--tl-radius);  /* 手機版左側圓角 */
  }
  
  .tl-image img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: translate(-50%, -50%);  /* 手機版也保持居中 */
    transition: transform 0.3s ease;
  }
  
  .tl-card:hover .tl-image img {
    transform: translate(-50%, -50%) scale(1.03);
  }
  
  .tl-content {
    width: auto;
    padding: 0.8rem 0.5rem 2.5rem 0.8rem;
    text-align: left;
    position: relative;
  }
  
  .tl-counter {
    display: flex;
    align-items: flex-end;
    margin-bottom: 0.3rem;
    gap: 0.5rem;
  }
  
  .tl-days {
    font-size: 1.8rem;
    margin-bottom: 0;
    line-height: 1;
  }
  
  .tl-time {
    font-size: 0.65rem;
    line-height: 1.2;
    padding-bottom: 0.15rem;
  }
  
  .tl-meta {
    font-size: 0.65rem;
  }
  
  .tl-more {
    padding: 0.5rem;
    font-size: 0.7rem;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    border-radius: 0;
  }
  
  .tl-content h3 {
    font-size: 0.9rem;
    margin-bottom: 0.4rem;
  }
}

@media (max-width: 400px) {
  .tl-card {
    grid-template-columns: 100px 1fr;
  }
  
  .tl-image {
    width: 100px;
    height: 100px;
  }
}

@media (max-width: 360px) {
  .tl-card {
    grid-template-columns: 90px 1fr;
  }
  
  .tl-image {
    width: 90px;
    height: 90px;
  }
  
  .tl-days {
    font-size: 1.5rem;
  }
  
  .tl-content {
    padding: 0.5rem 0.5rem 2.5rem 0.8rem;
  }
  
  .tl-content h3 {
    font-size: 0.85rem;
    margin-bottom: 0.3rem;
  }
}

/* 載入提示 */
#timelineContainer {
  text-align: center;
  padding: 3rem 0;
  font-weight: 500;
  opacity: 0.7;
}
</style>
