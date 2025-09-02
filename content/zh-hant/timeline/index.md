---
title: "時間線"
slug: "timeline"
toc: false
date: 2025-09-01
lastmod: 2025-09-01
---

<div class="timeline-container">
  <div class="timeline-grid">
    <!-- 女友關係卡片 -->
    <div class="tl-card" data-key="couple">
      <div class="tl-media">
        <img src="/images/timeline/f-avatar.webp" alt="女友頭像" loading="lazy">
      </div>
      <div class="tl-content">
        <h3>我們在一起</h3>
        <div class="tl-counter" id="togetherCounter">
          <p class="tl-days">0</p>
          <p class="tl-time">00:00:00</p>
        </div>
        <p class="tl-date">自 07/08/2025 起</p>
      </div>
      <button class="tl-more" aria-label="查看詳情">了解更多</button>
    </div>
    
    <!-- 薯餅卡片 -->
    <div class="tl-card" data-key="hash">
      <div class="tl-media">
        <img src="/images/timeline/hashbrown.webp" alt="薯餅" loading="lazy">
      </div>
      <div class="tl-content">
        <h3>薯餅年齡</h3>
        <div class="tl-counter" id="hashCounter">
          <p class="tl-days">0</p>
          <p class="tl-time">00:00:00</p>
        </div>
        <p class="tl-date">生日：24/06/2025</p>
      </div>
      <button class="tl-more" aria-label="查看詳情">了解更多</button>
    </div>
    
    <!-- 馬鈴薯卡片 -->
    <div class="tl-card" data-key="potato">
      <div class="tl-media">
        <img src="/images/timeline/potato.webp" alt="馬鈴薯" loading="lazy">
      </div>
      <div class="tl-content">
        <h3>馬鈴薯年齡</h3>
        <div class="tl-counter" id="potatoCounter">
          <p class="tl-days">0</p>
          <p class="tl-time">00:00:00</p>
        </div>
        <p class="tl-date">生日：27/07/2025</p>
      </div>
      <button class="tl-more" aria-label="查看詳情">了解更多</button>
    </div>
  </div>
  
  <p class="tl-note">墨爾本時間 UTC+10 (AEST) ❄️</p>
</div>

<style>
/* 重置與基本設置 */
.timeline-container * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.timeline-container {
  --tl-accent: var(--hb-active, #e1306c);
  --tl-radius: 22px;
  --tl-bg-light: #fff;
  --tl-bg-dark: #2a2b2f;
  --tl-border-light: rgba(0,0,0,0.08);
  --tl-border-dark: rgba(255,255,255,0.15);
  --tl-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
  --tl-shadow-dark: 0 10px 35px -8px rgba(0,0,0,0.35);
  
  max-width: 1080px;
  margin: 0 auto;
  padding: 2rem 0 3rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

/* 網格布局 */
.timeline-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.8rem;
  margin-bottom: 2rem;
}

@media (max-width: 1080px) {
  .timeline-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .timeline-grid {
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
  box-shadow: var(--tl-shadow);
  transition: transform 0.3s, box-shadow 0.3s;
}

body.dark .tl-card {
  background: var(--tl-bg-dark);
  border-color: var(--tl-border-dark);
  box-shadow: var(--tl-shadow-dark);
}

.tl-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 40px -12px rgba(0,0,0,0.2);
}

body.dark .tl-card:hover {
  box-shadow: 0 16px 45px -10px rgba(0,0,0,0.45);
}

/* 卡片媒體區 */
.tl-media {
  height: 180px;
  overflow: hidden;
}

.tl-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.tl-card:hover .tl-media img {
  transform: scale(1.05);
}

/* 卡片內容區 */
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

body.dark .tl-content h3 {
  color: #ff8fb7;
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

body.dark .tl-days {
  color: #ff8fb7;
}

.tl-time {
  font-size: 0.85rem;
  font-family: 'SF Mono', monospace;
  letter-spacing: 0.03rem;
  opacity: 0.8;
  font-weight: 600;
}

.tl-date {
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

body.dark .tl-more {
  background: #3a3c42;
  color: #ddd;
}

.tl-more:hover {
  background: var(--tl-accent);
  color: white;
}

/* 時區備註 */
.tl-note {
  font-size: 0.7rem;
  opacity: 0.7;
  padding-left: 0.8rem;
  border-left: 4px solid var(--tl-accent);
  margin-top: 1rem;
}

/* 彈窗樣式 */
.tl-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
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
}

body.dark .tl-modal {
  background: #2a2b2f;
  color: #e1e1e1;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7);
}

.tl-modal-header {
  margin-bottom: 1.2rem;
}

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

.tl-modal-body {
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.tl-modal-body p {
  margin-bottom: 1rem;
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

.tl-modal-footer {
  display: flex;
  justify-content: space-between;
}

.tl-modal-btn {
  padding: 0.65rem 1.2rem;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.tl-modal-link {
  background: #f0f0f2;
  color: #333;
  text-decoration: none;
}

body.dark .tl-modal-link {
  background: #3a3c42;
  color: #e1e1e1;
}

.tl-modal-link:hover {
  background: var(--tl-accent);
  color: white;
}

.tl-modal-close {
  background: rgba(0,0,0,0.05);
  color: #666;
  border: none;
}

body.dark .tl-modal-close {
  background: rgba(255,255,255,0.1);
  color: #ddd;
}

.tl-modal-close:hover {
  background: #f44336;
  color: white;
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

/* 動畫偏好 */
@media (prefers-reduced-motion: reduce) {
  .tl-card,
  .tl-media img,
  .tl-modal-backdrop {
    transition: none !important;
  }
  
  .tl-card:hover {
    transform: none;
  }
}

/* 手機適配 */
@media (max-width: 640px) {
  .tl-media {
    height: 160px;
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
</style>

<script>
(function() {
  // 防止重複初始化
  if (window.__TIMELINE_INITIALIZED__) return;
  window.__TIMELINE_INITIALIZED__ = true;
  
  // ===== 1. 墨爾本時間計算 =====
  const MEL_TIMEZONE = 10; // UTC+10
  const MEL_MS = MEL_TIMEZONE * 60 * 60 * 1000;
  
  const getMelbourneTime = () => {
    return new Date(Date.now() + MEL_MS);
  };
  
  const formatTime = (date) => {
    const h = String(date.getUTCHours()).padStart(2, '0');
    const m = String(date.getUTCMinutes()).padStart(2, '0');
    const s = String(date.getUTCSeconds()).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };
  
  const formatDate = (date) => {
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, '0');
    const d = String(date.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };
  
  // ===== 2. 時間差計算 =====
  const parseDate = (dateStr) => {
    // 格式: DD/MM/YYYY
    const [day, month, year] = dateStr.split('/').map(n => parseInt(n));
    return new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
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
  
  // ===== 3. 更新顯示 =====
  const updateCounters = () => {
    const coupleSince = timeSince('07/08/2025');
    const hashSince = timeSince('24/06/2025');
    const potatoSince = timeSince('27/07/2025');
    
    // 更新日期
    document.querySelector('#togetherCounter .tl-days').textContent = coupleSince.days;
    document.querySelector('#hashCounter .tl-days').textContent = hashSince.days;
    document.querySelector('#potatoCounter .tl-days').textContent = potatoSince.days;
    
    // 更新時間
    document.querySelector('#togetherCounter .tl-time').textContent = 
      `${String(coupleSince.hours).padStart(2, '0')}:${String(coupleSince.minutes).padStart(2, '0')}:${String(coupleSince.seconds).padStart(2, '0')}`;
    document.querySelector('#hashCounter .tl-time').textContent = 
      `${String(hashSince.hours).padStart(2, '0')}:${String(hashSince.minutes).padStart(2, '0')}:${String(hashSince.seconds).padStart(2, '0')}`;
    document.querySelector('#potatoCounter .tl-time').textContent = 
      `${String(potatoSince.hours).padStart(2, '0')}:${String(potatoSince.minutes).padStart(2, '0')}:${String(potatoSince.seconds).padStart(2, '0')}`;
  };
  
  // 初始更新並設定定時器每秒更新
  updateCounters();
  setInterval(updateCounters, 1000);
  
  // ===== 4. 卡片資料 =====
  const cardData = {
    couple: {
      title: '我們的關係',
      subtitle: '開始於 2025 年 8 月 7 日',
      content: `
        <p>我們生活在不同的國家/地區（澳洲墨爾本和台灣台北），透過遠距方式經營關係。我們都是泛性戀 🩷💛🩵，擁抱多元性別與關係形式。</p>
        <p>雖然相隔兩地，我們仍保持每天的交流與聯繫，分享彼此的生活、工作與興趣愛好。我們彼此支持、尊重對方的獨立空間，同時也計劃定期見面。</p>
        <p>想了解更多我們的日常點滴，歡迎關注我的 Instagram: <a href="https://instagram.com/zakk.au" target="_blank" rel="noopener">@zakk.au</a></p>
      `,
      link: '/zh-hant/about/#relationship'
    },
    hash: {
      title: '薯餅 (Hash Brown)',
      subtitle: '生日：2025 年 6 月 24 日',
      content: `
        <p>薯餅是一隻純種泰迪天竺鼠，有著漂亮的淺咖啡色短毛。性格活潑好奇，喜歡探索新環境，特別喜歡在飼養箱裡四處奔跑和躲藏。</p>
        <p>名字的靈感來自麥當勞的早餐菜單——那塊金黃酥脆的薯餅（Hash Brown）。不僅因為顏色相似，也因為牠總是充滿活力，像剛出爐的薯餅一樣熱情。</p>
        <p>薯餅最愛的食物是新鮮胡蘿蔔和歐芹，特別喜歡在傍晚時分吱吱叫著討零食。</p>
        <p>更多薯餅的可愛照片請見 Instagram: <a href="https://instagram.com/zakk.au" target="_blank" rel="noopener">@zakk.au</a></p>
      `,
      link: '/zh-hant/about/#pets'
    },
    potato: {
      title: '馬鈴薯 (Potato)',
      subtitle: '生日：2025 年 7 月 27 日',
      content: `
        <p>馬鈴薯是一隻純種泰迪天竺鼠，有著深巧克力色的柔軟毛髮。性格相對內向溫和，喜歡被輕輕撫摸，通常會安靜地待在飼養箱的角落享受食物。</p>
        <p>名字「馬鈴薯」完美呼應牠圓滾滾的身形和棕色的外表，就像一顆小小的馬鈴薯。牠和薯餅一起成長，兩隻天竺鼠相處融洽，經常一起依偎睡覺。</p>
        <p>馬鈴薯特別喜歡小黃瓜和羅勒葉，每當聽到塑料袋聲音時就會興奮地嘰嘰叫。</p>
        <p>更多馬鈴薯的日常分享請見 Instagram: <a href="https://instagram.com/zakk.au" target="_blank" rel="noopener">@zakk.au</a></p>
      `,
      link: '/zh-hant/about/#pets'
    }
  };
  
  // ===== 5. 創建彈窗 =====
  const createModal = () => {
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'tl-modal-backdrop';
    modalBackdrop.innerHTML = `
      <div class="tl-modal">
        <button class="tl-close-btn" aria-label="關閉">✕</button>
        <div class="tl-modal-header">
          <h3 class="tl-modal-title"></h3>
          <p class="tl-modal-subtitle"></p>
        </div>
        <div class="tl-modal-body"></div>
        <div class="tl-modal-footer">
          <a href="#" class="tl-modal-btn tl-modal-link" target="_self">查看詳情</a>
          <button class="tl-modal-btn tl-modal-close">關閉</button>
        </div>
      </div>
    `;
    document.body.appendChild(modalBackdrop);
    
    // 關閉彈窗功能
    const closeModal = () => {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    };
    
    // 綁定關閉事件
    modalBackdrop.querySelector('.tl-close-btn').addEventListener('click', closeModal);
    modalBackdrop.querySelector('.tl-modal-close').addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
    
    // 鍵盤 ESC 關閉
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
        closeModal();
      }
    });
    
    return {
      backdrop: modalBackdrop,
      title: modalBackdrop.querySelector('.tl-modal-title'),
      subtitle: modalBackdrop.querySelector('.tl-modal-subtitle'),
      body: modalBackdrop.querySelector('.tl-modal-body'),
      link: modalBackdrop.querySelector('.tl-modal-link'),
      show: (key) => {
        const data = cardData[key];
        if (!data) return;
        
        // 填充內容
        modalBackdrop.querySelector('.tl-modal-title').textContent = data.title;
        modalBackdrop.querySelector('.tl-modal-subtitle').textContent = data.subtitle;
        modalBackdrop.querySelector('.tl-modal-body').innerHTML = data.content;
        modalBackdrop.querySelector('.tl-modal-link').href = data.link;
        
        // 顯示彈窗
        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // 設置焦點
        setTimeout(() => modalBackdrop.querySelector('.tl-close-btn').focus(), 50);
      }
    };
  };
  
  // 初始化彈窗
  const modal = createModal();
  
  // ===== 6. 綁定卡片點擊事件 =====
  document.querySelectorAll('.tl-card').forEach(card => {
    const key = card.getAttribute('data-key');
    const btn = card.querySelector('.tl-more');
    
    // 整個卡片可點擊
    card.addEventListener('click', (e) => {
      // 避免按鈕點擊時重複觸發
      if (e.target !== btn && !btn.contains(e.target)) {
        modal.show(key);
      }
    });
    
    // 按鈕點擊
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // 防止冒泡到卡片
      modal.show(key);
    });
    
    // 鍵盤無障礙
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        modal.show(key);
      }
    });
  });
})();
</script>
<!-- 確保圖檔存在: /static/images/timeline/f-avatar.webp hashbrown.webp potato.webp -->
