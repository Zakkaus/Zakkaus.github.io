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
/* ---- 覆寫開始：同步修正卡片 / 圖片 / 間距 ---- */

/* 1. 標題與卡片距離（再壓縮） */
.tl-container { padding-top: 0 !important; }
.tl-grid { margin-top: .25rem !important; }

/* 2. 單層乾淨卡片（移除 ::before 疊層 & 透明背景） */
.tl-card {
  background: var(--tl-bg-light) !important;
  border: 1px solid var(--tl-border-light) !important;
  border-radius: var(--tl-radius);
  box-shadow: 0 6px 18px -6px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  padding-bottom: 3rem; /* 為底部按鈕預留空間 */
  overflow: hidden;
  position: relative;
  transition: box-shadow .25s, transform .25s;
}
body.dark .tl-card {
  background: var(--tl-bg-dark) !important;
  border-color: var(--tl-border-dark) !important;
  box-shadow: 0 8px 26px -8px rgba(0,0,0,0.55);
}
.tl-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 32px -8px rgba(0,0,0,0.22);
}
/* 移除之前的 .tl-card::before (請刪除舊定義) */
.tl-card::before { display: none !important; }

/* 3. 圖片裁切：完全貼頂 + 自動放大居中，不出現黑邊/殘留圓角 */
.tl-image {
  aspect-ratio: 16/10;
  width: 100%;
  height: auto;
  position: relative;
  background: #eee;
  border-radius: 0; /* 由卡片控制上圓角 */
}
body.dark .tl-image { background: #444; }

.tl-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;          /* 放大覆蓋裁切 */
  object-position: 50% 50%;   /* 垂直水平居中 */
  transform: none !important;
  transition: transform .35s ease;
}

.tl-card:hover .tl-image img { transform: scale(1.045); }

/* 讓卡片上圓角直接作用於圖片 */
.tl-card > .tl-image { border-top-left-radius: var(--tl-radius); border-top-right-radius: var(--tl-radius); }

/* 4. 內容區填滿剩餘高度 */
.tl-content {
  flex: 1 1 auto;
  background: transparent; /* 不再單獨加邊框，避免層次裂縫 */
  border: none;
  padding: 1.1rem 1.3rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
}
body.dark .tl-content { background: transparent; }

/* 5. 更多按鈕與底部銜接 */
.tl-more {
  border-top: 1px solid rgba(0,0,0,0.06);
}
body.dark .tl-more {
  border-top: 1px solid rgba(255,255,255,0.15);
}

/* 6. 手機版橫排時圖片仍需正確裁切（覆寫舊的方形分割樣式） */
@media (max-width: 480px) {
  .tl-card {
    display: flex;            /* 改回縱向堆疊，避免高度錯亂；若仍想橫排可再告知 */
    padding-bottom: 3rem;
  }
  .tl-image {
    aspect-ratio: 16/10;
    width: 100%;
    height: auto;
    border-radius: 0;
  }
  .tl-card > .tl-image { border-top-left-radius: var(--tl-radius); border-top-right-radius: var(--tl-radius); }
  .tl-content { text-align: center; padding: 1rem 1rem; }
  .tl-more { font-size: .7rem; }
}

/* 7. 超小螢幕微調字級 (保留原結構即可) */
@media (max-width: 360px) {
  .tl-days { font-size: 2.2rem; }
  .tl-content h3 { font-size: .95rem; }
}

/* ---- 覆寫結束 ---- */
</style>
