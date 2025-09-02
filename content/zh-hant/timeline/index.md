---
title: "時間線"
slug: "timeline"
toc: false
date: 2025-09-01
lastmod: 2025-09-01
---

<div id="timelineContainer">正在載入...</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // 資料定義
  const timelineData = [
    {
      id: "couple",
      title: "我們在一起",
      date: "07/08/2025 11:38",
      image: "/images/timeline/f-avatar.webp",
      alt: "女友頭像",
      modalTitle: "關係",
      modalSubtitle: "開始於 2025 年 8 月 7 日 11:38am",
      modalContent: `
        <p>我們生活在不同的國家/地區（澳大利亞 / 台灣），透過遠距方式經營關係。我們都是泛性戀 🩷💛🩵，擁抱多元性別與關係形式。</p>
        <p>雖然相隔兩地，我們仍保持每天的交流與聯繫，分享彼此的生活、工作與興趣愛好。我們彼此支持、尊重對方的獨立空間，同時也計劃定期見面。</p>
        <p>想了解更多我們的日常點滴，歡迎關注我的 Instagram: <a href="https://www.instagram.com/abyss_74.50/" target="_blank" rel="noopener" class="tl-highlight-link">@abyss_74.50</a></p>
      `,
      linkUrl: "/zh-hant/about/#relationship"
    },
    {
      id: "hash",
      title: "薯餅年齡",
      date: "24/06/2025",
      image: "/images/timeline/hashbrown.webp",
      alt: "薯餅",
      modalTitle: "薯餅 (Hash Brown)",
      modalSubtitle: "生日：2025 年 6 月 24 日",
      modalContent: `
        <p>薯餅是一隻純種泰迪天竺鼠，毛色淺咖啡。比較活潑好動，喜歡在籠子裡轉圈跑酷，常常推著自己的窩到處跑，玩耍時精力充沛。</p>
        <p>最愛的食物：紅色和綠甜椒（超級喜歡）、玉米鬚和胡蘿蔔。牠喜歡在傍晚活躍，會發出吱吱聲討零食。</p>
        <p>更多薯餅的可愛照片請見 Instagram: <a href="https://instagram.com/zakk.au" target="_blank" rel="noopener" class="tl-highlight-link">@zakk.au</a></p>
      `,
      linkUrl: "/zh-hant/about/#pets"
    },
    {
      id: "potato",
      title: "馬鈴薯年齡",
      date: "27/07/2025",
      image: "/images/timeline/potato.webp",
      alt: "馬鈴薯",
      modalTitle: "馬鈴薯 (Potato)",
      modalSubtitle: "生日：2025 年 7 月 27 日",
      modalContent: `
        <p>馬鈴薯是一隻純種泰迪天竺鼠，毛色深巧克力色，性格較為貪吃且膽子比較大。牠常常一邊吃一邊玩，有時候會邊吃邊拉，偶爾會在糧盆裡面拉出糞便。</p>
        <p>喜歡的食物：紅色和綠甜椒、玉米鬚和胡蘿蔔。牠也喜歡在草堆裡面睡覺，醒來後會繼續吃，是個貪吃又勇敢的小家伙。</p>
        <p>更多馬鈴薯的日常分享請見 Instagram: <a href="https://instagram.com/zakk.au" target="_blank" rel="noopener" class="tl-highlight-link">@zakk.au</a></p>
      `,
      linkUrl: "/zh-hant/about/#pets"
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
            <p class="tl-meta">${item.id === 'couple' ? `自 ${item.date} 起` : `生日：${item.date}`}</p>
          </div>
          <button class="tl-more">了解更多</button>
        </div>
      `).join('')}
    </div>
    <div class="tl-footer">
      <p class="tl-note" id="timeInfo">墨爾本時間 UTC+10 (AEST) ❄️</p>
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
        <a href="#" class="tl-btn tl-about-link">查看詳情</a>
        <button class="tl-btn tl-close-btn-alt">關閉</button>
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
    document.getElementById('timeInfo').textContent = `墨爾本時間：${dateStr} ${timeStr} - UTC+10 (AEST) ❄️`;
  };
  
  // 立即更新一次
  updateCounters();
  
  // 每秒更新
  setInterval(updateCounters, 1000);
});
</script>

<style>
/* 基本樣式 - 大幅減少標題間距 */
.tl-container {
  --tl-accent: var(--hb-active, #e1306c);
  --tl-radius: 22px;
  --tl-bg-light: #fff;
  --tl-bg-dark: #2a2b2f;
  --tl-border-light: rgba(0,0,0,0.08);
  --tl-border-dark: rgba(255,255,255,0.15);
  
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 0 3rem;  /* 完全移除頂部間距 */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: rgba(0, 0, 0, 0.85);
}

body.dark .tl-container {
  color: rgba(255, 255, 255, 0.85);
}

/* 網格布局 - 最小間距 */
.tl-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.8rem;
  margin-bottom: 1.5rem;
  justify-content: center;
  margin-top: 0;  /* 完全移除頂部間距 */
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

/* 卡片樣式 - 徹底解決薄膜問題 */
.tl-card {
  position: relative;
  background: transparent;  /* 先設為透明 */
  border: none;  /* 移除邊框避免薄膜 */
  border-radius: var(--tl-radius);
  overflow: hidden;
  padding-bottom: 3rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);  /* 極簡陰影 */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 auto;
  width: 100%;
}

.tl-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--tl-bg-light);
  border-radius: var(--tl-radius);
  z-index: -1;
  border: 1px solid var(--tl-border-light);
}

body.dark .tl-card::before {
  background: var(--tl-bg-dark);
  border-color: var(--tl-border-dark);
}

.tl-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

/* 卡片圖片 - 完全覆蓋頂部，無邊緣 */
.tl-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  height: auto;
  position: relative;
  margin: 0;
  padding: 0;
  background: #000;
  border-radius: 0;                 /* 交由卡片本身控制圓角 */
}

.tl-card:first-child .tl-image,
.tl-image { /* 讓圖片直接使用卡片頂部圓角 */
  /* 上圓角繼承卡片：包一層即可直接隱藏邊緣 */
  border-top-left-radius: var(--tl-radius);
  border-top-right-radius: var(--tl-radius);
}

.tl-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  transform: none !important;
}

/* Hover 僅微縮放不改定位 */
.tl-card:hover .tl-image img {
  transform: scale(1.04) !important;
  transition: transform .35s ease;
}

/* 內容區加邊框（避免圖片上方殘影 & 分層更乾淨） */
.tl-content {
  background: var(--tl-bg-light);
  border: 1px solid var(--tl-border-light);
  border-top: none;
}

body.dark .tl-content {
  background: var(--tl-bg-dark);
  border: 1px solid var(--tl-border-dark);
  border-top: none;
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

/* 手機適配 - 修復小螢幕圖片邊緣問題 */
@media (max-width: 480px) {
  .tl-grid {
    gap: 1rem;
    padding: 0;
    margin-top: 0;  /* 手機版也移除頂部間距 */
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
    aspect-ratio: 1 / 1;
    border-top-left-radius: var(--tl-radius);
    border-top-right-radius: 0;
    border-bottom-left-radius: var(--tl-radius);
    border-bottom-right-radius: 0;
  }
  
  .tl-content {
    border-top: 1px solid var(--tl-border-light);
    border-left: none;
    border-bottom-right-radius: var(--tl-radius);
    border-top-left-radius: 0;
  }
  
  body.dark .tl-content {
    border-top: 1px solid var(--tl-border-dark);
  }
}

/* === 修復區開始 === */

/* 1) 標題與卡片距離壓縮 */
.single .post-content > #timelineContainer,
#timelineContainer {
  margin-top: .4rem !important;
}
.tl-container { padding-top: 0 !important; margin-top: 0 !important; }
.tl-grid { margin-top: .4rem !important; }

/* 2) 去除白色薄膜 & 回復乾淨卡片背景 */
.tl-card {
  background-color: var(--tl-bg-light) !important;
  border: none !important;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08) !important;
  overflow: hidden;
  position: relative;
}
.tl-card::before { display: none !important; }
body.dark .tl-card {
  background-color: var(--tl-bg-dark) !important;
  box-shadow: 0 4px 16px rgba(0,0,0,0.38) !important;
}

/* 3) 圖片完全貼頂覆蓋（移除殘留邊緣 & 不再漂移） */
.tl-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  height: auto;
  position: relative;
  margin: 0;
  padding: 0;
  background: #000;
  border-radius: 0;                 /* 交由卡片本身控制圓角 */
}

.tl-card:first-child .tl-image,
.tl-image { /* 讓圖片直接使用卡片頂部圓角 */
  /* 上圓角繼承卡片：包一層即可直接隱藏邊緣 */
  border-top-left-radius: var(--tl-radius);
  border-top-right-radius: var(--tl-radius);
}

.tl-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  transform: none !important;
}

/* Hover 僅微縮放不改定位 */
.tl-card:hover .tl-image img {
  transform: scale(1.04) !important;
  transition: transform .35s ease;
}

/* 內容區加邊框（避免圖片上方殘影 & 分層更乾淨） */
.tl-content {
  background: var(--tl-bg-light);
  border: 1px solid var(--tl-border-light);
  border-top: none;
}

body.dark .tl-content {
  background: var(--tl-bg-dark);
  border: 1px solid var(--tl-border-dark);
  border-top: none;
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

/* 手機適配 - 修復小螢幕圖片邊緣問題 */
@media (max-width: 480px) {
  .tl-grid {
    gap: 1rem;
    padding: 0;
    margin-top: 0;  /* 手機版也移除頂部間距 */
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
    aspect-ratio: 1 / 1;
    border-top-left-radius: var(--tl-radius);
    border-top-right-radius: 0;
    border-bottom-left-radius: var(--tl-radius);
    border-bottom-right-radius: 0;
  }
  
  .tl-content {
    border-top: 1px solid var(--tl-border-light);
    border-left: none;
    border-bottom-right-radius: var(--tl-radius);
    border-top-left-radius: 0;
  }
  
  body.dark .tl-content {
    border-top: 1px solid var(--tl-border-dark);
  }
}
</style>
