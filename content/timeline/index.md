---
title: "Timeline"
slug: "timeline"
toc: false
date: 2025-09-01
lastmod: 2025-09-01
---

<div class="timeline-wrapper">
  <div class="tl-grid">
    <!-- Relationship card -->
    <div class="tl-card" data-key="couple" tabindex="0" role="button">
      <div class="tl-image">
        <img src="/images/timeline/f-avatar.webp" alt="Avatar" loading="lazy">
      </div>
      <div class="tl-content">
        <h3>Days Together</h3>
        <p class="tl-days" id="togetherDays">0</p>
        <p class="tl-date">Since 07/08/2025</p>
      </div>
    </div>
    
    <!-- Hash Brown card -->
    <div class="tl-card" data-key="hash" tabindex="0" role="button">
      <div class="tl-image">
        <img src="/images/timeline/hashbrown.webp" alt="Hash Brown" loading="lazy">
      </div>
      <div class="tl-content">
        <h3>Hash Brown Age (days)</h3>
        <p class="tl-days" id="hashDays">0</p>
        <p class="tl-date">Birthday: 24/06/2025</p>
      </div>
    </div>
    
    <!-- Potato card -->
    <div class="tl-card" data-key="potato" tabindex="0" role="button">
      <div class="tl-image">
        <img src="/images/timeline/potato.webp" alt="Potato" loading="lazy">
      </div>
      <div class="tl-content">
        <h3>Potato Age (days)</h3>
        <p class="tl-days" id="potatoDays">0</p>
        <p class="tl-date">Birthday: 27/07/2025</p>
      </div>
    </div>
  </div>
  
  <p class="tl-timezone">Based on Australia time UTC+10 (AEST) ❄️</p>
</div>

<style>
/* 確保樣式獨立不受干擾 */
.timeline-wrapper {
  --accent: var(--hb-active, #e1306c);
  --media-size: 180px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  max-width: 1180px;
  margin: 0 auto;
  padding: 1.5rem 0 3rem;
}

/* 網格布局: 桌面3欄/平板2欄/手機1欄 */
.tl-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.6rem;
}

@media (max-width: 1020px) {
  .tl-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .tl-grid {
    grid-template-columns: 1fr;
  }
  .timeline-wrapper {
    --media-size: 150px;
  }
}

/* 卡片樣式 */
.tl-card {
  background: #fff;
  border: 1px solid rgba(0,0,0,.08);
  border-radius: 22px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.2rem 1rem 1.4rem;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
  position: relative;
  box-shadow: 0 2px 6px -2px rgba(0,0,0,.08);
}

body.dark .tl-card {
  background: #26272b;
  border-color: rgba(255,255,255,.12);
  box-shadow: 0 4px 12px -6px rgba(0,0,0,.5);
}

.tl-card:hover, .tl-card:focus-visible {
  transform: translateY(-6px);
  border-color: var(--accent);
  box-shadow: 0 12px 25px -10px rgba(0,0,0,.2);
}

body.dark .tl-card:hover, 
body.dark .tl-card:focus-visible {
  box-shadow: 0 16px 36px -14px rgba(0,0,0,.7);
}

.tl-card:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* 圖片容器 */
.tl-image {
  width: var(--media-size);
  height: var(--media-size);
  border-radius: 20px;
  overflow: hidden;
  margin: 0 0 1rem;
  background: #f2f3f5;
}

body.dark .tl-image {
  background: #34363b;
}

.tl-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
  display: block;
}

.tl-card:hover .tl-image img {
  transform: scale(1.06);
}

/* 文字內容 */
.tl-content h3 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--accent);
}

body.dark .tl-content h3 {
  color: #ff8fb7;
}

.tl-days {
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1;
  margin: 0 0 0.5rem;
  color: var(--accent);
}

body.dark .tl-days {
  color: #ff8fb7;
}

.tl-date {
  font-size: 0.7rem;
  opacity: 0.7;
  margin: 0;
}

/* 時區說明 */
.tl-timezone {
  margin: 2rem 0 0;
  font-size: 0.65rem;
  opacity: 0.7;
  padding-left: 0.7rem;
  border-left: 4px solid var(--accent);
  line-height: 1.4;
}

/* Modal 樣式 */
#tl-modal-container {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0s 0.3s;
}

#tl-modal-container.visible {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s;
}

.tl-modal {
  background: #fff;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  padding: 1.5rem;
  box-shadow: 0 20px 60px -20px rgba(0,0,0,.6);
  position: relative;
  max-height: 80vh;
  overflow-y: auto;
}

body.dark .tl-modal {
  background: #2d2d33;
  box-shadow: 0 25px 65px -20px rgba(0,0,0,.8);
}

.tl-modal-title {
  margin: 0 0 0.3rem;
  font-size: 1.2rem;
  color: var(--accent);
}

body.dark .tl-modal-title {
  color: #ff8fb7;
}

.tl-modal-meta {
  margin: 0 0 1rem;
  font-size: 0.75rem;
  opacity: 0.7;
}

.tl-modal-content {
  font-size: 0.9rem;
  line-height: 1.6;
}

body.dark .tl-modal-content {
  color: #ddd;
}

.tl-modal-content a {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.tl-modal-content a:hover {
  border-color: var(--accent);
}

.tl-modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  border-radius: 50%;
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: background 0.2s;
}

.tl-modal-close:hover {
  background: rgba(0,0,0,.08);
}

body.dark .tl-modal-close {
  color: #bbb;
}

body.dark .tl-modal-close:hover {
  background: rgba(255,255,255,.12);
}

.tl-modal-actions {
  margin-top: 1.2rem;
  display: flex;
  gap: 0.5rem;
}

.tl-btn {
  padding: 0.5rem 1rem;
  border: 1px solid rgba(0,0,0,.1);
  background: #f5f5f7;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.tl-btn:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}

body.dark .tl-btn {
  background: #3a3c42;
  border-color: rgba(255,255,255,.15);
  color: #eee;
}

body.dark .tl-btn:hover {
  background: var(--accent);
  border-color: var(--accent);
}

@media (prefers-reduced-motion: reduce) {
  .tl-card, 
  .tl-image img,
  #tl-modal-container {
    transition: none !important;
  }
  
  .tl-card:hover {
    transform: none;
  }
}

@media (max-width: 640px) {
  .tl-days {
    font-size: 2.4rem;
  }
  
  .tl-modal {
    padding: 1.2rem;
  }
}
</style>

<script>
(function() {
  // 防止重複初始化
  if (window.__TIMELINE_INITIALIZED__) return;
  window.__TIMELINE_INITIALIZED__ = true;
  
  // ===== 1. 建立 Modal =====
  const modalContainer = document.createElement('div');
  modalContainer.id = 'tl-modal-container';
  modalContainer.innerHTML = `
    <div class="tl-modal">
      <button class="tl-modal-close" aria-label="Close">✕</button>
      <h2 class="tl-modal-title"></h2>
      <p class="tl-modal-meta"></p>
      <div class="tl-modal-content"></div>
      <div class="tl-modal-actions">
        <a href="#" class="tl-btn tl-about-link">View About</a>
        <button class="tl-btn tl-close-btn">Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(modalContainer);
  
  const modal = modalContainer.querySelector('.tl-modal');
  const closeBtn = modal.querySelector('.tl-modal-close');
  const closeBtnAlt = modal.querySelector('.tl-close-btn');
  const aboutLink = modal.querySelector('.tl-about-link');
  
  // 關閉 Modal 功能
  const closeModal = () => {
    modalContainer.classList.remove('visible');
    document.body.style.overflow = '';
    
    // 返回焦點
    if (window.__lastFocusedElement && typeof window.__lastFocusedElement.focus === 'function') {
      setTimeout(() => window.__lastFocusedElement.focus(), 10);
    }
  };
  
  // 點擊背景關閉
  modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) closeModal();
  });
  
  // 點擊關閉按鈕
  closeBtn.addEventListener('click', closeModal);
  closeBtnAlt.addEventListener('click', closeModal);
  
  // ESC 關閉
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('visible')) {
      closeModal();
    }
  });
  
  // ===== 2. 卡片內容與日期計算 =====
  const cardData = {
    couple: {
      title: 'Relationship',
      date: '07/08/2025',
      content: 'We live in different places (Australia / Taiwan) and are pansexual 🩷💛🩵. We support each other\'s study, life and hobbies in our long-distance relationship.',
      aboutUrl: '/about/'
    },
    hash: {
      title: 'Hash Brown',
      date: '24/06/2025',
      content: 'Purebred Teddy guinea pig with light brown fur. Energetic and curious, loves exploring new hideouts. Named after <a href="https://mcdonalds.com.hk/en/product/hash-browns/" target="_blank" rel="noopener">McDonald\'s Hash Browns</a>. Favorite treats are hay and carrots.',
      aboutUrl: '/about/'
    },
    potato: {
      title: 'Potato',
      date: '27/07/2025',
      content: 'Purebred Teddy guinea pig with dark brown fur. Calmer personality, enjoys gentle petting and quiet eating. Growing up together with Hash Brown. Particularly interested in bell peppers and cucumbers.',
      aboutUrl: '/about/'
    }
  };
  
  // 計算天數（澳洲時間）
  const calcDays = (dateStr) => {
    // 處理 DD/MM/YYYY 格式
    const [day, month, year] = dateStr.split('/').map(n => parseInt(n, 10));
    
    // 建立 AEST (UTC+10) 時間
    const tzOffset = 10 * 60 * 60 * 1000; // 10小時的毫秒
    const now = new Date(Date.now() + tzOffset);
    const target = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    
    // 計算今天在 AEST 的日期
    const today = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      0, 0, 0
    ));
    
    // 計算天數差異
    const diffTime = today - target;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // 如果日期還未到，顯示 0
    return diffDays >= 0 ? diffDays + 1 : 0;
  };
  
  // 設置天數顯示
  const setDayCount = () => {
    document.getElementById('togetherDays').textContent = calcDays(cardData.couple.date);
    document.getElementById('hashDays').textContent = calcDays(cardData.hash.date);
    document.getElementById('potatoDays').textContent = calcDays(cardData.potato.date);
  };
  
  // 初始設置天數
  setDayCount();
  
  // ===== 3. 卡片點擊處理 =====
  const cards = document.querySelectorAll('.tl-card');
  
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-key');
      const data = cardData[key];
      
      if (!data) return;
      
      // 儲存當前焦點元素
      window.__lastFocusedElement = document.activeElement;
      
      // 設置 Modal 內容
      modal.querySelector('.tl-modal-title').textContent = data.title;
      modal.querySelector('.tl-modal-meta').textContent = `Start date: ${data.date}`;
      modal.querySelector('.tl-modal-content').innerHTML = data.content;
      aboutLink.href = data.aboutUrl;
      
      // 顯示 Modal
      modalContainer.classList.add('visible');
      document.body.style.overflow = 'hidden';
      
      // 設置焦點到關閉按鈕
      setTimeout(() => closeBtn.focus(), 50);
    });
    
    // 鍵盤導航
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
})();
</script>
