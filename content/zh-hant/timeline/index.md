---
title: "時間線"
slug: "timeline"
toc: false
date: 2025-09-01
lastmod: 2025-09-01
---

<div id="timelineApp">
  <!-- 页面内容会由JavaScript动态生成 -->
  <div class="loading-msg">加載中...</div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // 定义数据
  const timelineData = [
    {
      id: "couple",
      title: "我們在一起",
      date: "07/08/2025",
      image: "/images/timeline/f-avatar.webp",
      alt: "女友頭像",
      modalTitle: "關係",
      modalSubtitle: "開始於 2025 年 8 月 7 日",
      modalContent: `
        <p>我們生活在不同的國家/地區（澳洲墨爾本和台灣台北），透過遠距方式經營關係。我們都是泛性戀 🩷💛🩵，擁抱多元性別與關係形式。</p>
        <p>雖然相隔兩地，我們仍保持每天的交流與聯繫，分享彼此的生活、工作與興趣愛好。我們彼此支持、尊重對方的獨立空間，同時也計劃定期見面。</p>
        <p>想了解更多我們的日常點滴，歡迎關注我的 Instagram: <a href="https://instagram.com/zakk.au" target="_blank" rel="noopener">@zakk.au</a></p>
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
        <p>最愛的食物：紅色和綠甜椒、玉米鬚和胡蘿蔔（超級喜歡）。牠喜歡在傍晚活躍，會發出吱吱聲討零食。</p>
        <p>更多薯餅的可愛照片請見 Instagram: <a href="https://instagram.com/zakk.au" target="_blank" rel="noopener">@zakk.au</a></p>
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
        <p>更多馬鈴薯的日常分享請見 Instagram: <a href="https://instagram.com/zakk.au" target="_blank" rel="noopener">@zakk.au</a></p>
      `,
      linkUrl: "/zh-hant/about/#pets"
    }
  ];

  // 创建页面内容
  const app = document.getElementById('timelineApp');
  
  // 创建容器
  const container = document.createElement('div');
  container.className = 'timeline-container';
  
  // 创建卡片网格
  const grid = document.createElement('div');
  grid.className = 'timeline-grid';
  
  // 生成卡片
  timelineData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'tl-card';
    card.dataset.key = item.id;
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    
    // 媒体区
    const media = document.createElement('div');
    media.className = 'tl-media';
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.alt;
    img.loading = 'lazy';
    media.appendChild(img);
    
    // 内容区
    const content = document.createElement('div');
    content.className = 'tl-content';
    
    const title = document.createElement('h3');
    title.textContent = item.title;
    
    const counter = document.createElement('div');
    counter.className = 'tl-counter';
    counter.id = `${item.id}Counter`;
    
    const days = document.createElement('p');
    days.className = 'tl-days';
    days.textContent = '0';
    
    const time = document.createElement('p');
    time.className = 'tl-time';
    time.textContent = '00:00:00';
    
    counter.appendChild(days);
    counter.appendChild(time);
    
    const dateText = document.createElement('p');
    dateText.className = 'tl-date';
    dateText.textContent = item.id === 'couple' ? `自 ${item.date} 起` : `生日：${item.date}`;
    
    content.appendChild(title);
    content.appendChild(counter);
    content.appendChild(dateText);
    
    // 按钮
    const btn = document.createElement('button');
    btn.className = 'tl-more';
    btn.textContent = '了解更多';
    btn.setAttribute('aria-label', '查看詳情');
    
    card.appendChild(media);
    card.appendChild(content);
    card.appendChild(btn);
    
    grid.appendChild(card);
  });
  
  // 添加时区备注
  const note = document.createElement('p');
  note.className = 'tl-note';
  note.textContent = '墨爾本時間 UTC+10 (AEST) ❄️';
  
  container.appendChild(grid);
  container.appendChild(note);
  
  // 替换加载信息
  app.innerHTML = '';
  app.appendChild(container);

  // 创建Modal
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
  
  const modal = modalBackdrop.querySelector('.tl-modal');
  
  // 处理模态框关闭
  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    if (window._lastFocusedElement && typeof window._lastFocusedElement.focus === 'function') {
      setTimeout(() => window._lastFocusedElement.focus(), 10);
    }
  };
  
  // 绑定关闭事件
  modalBackdrop.querySelector('.tl-close-btn').addEventListener('click', closeModal);
  modalBackdrop.querySelector('.tl-modal-close').addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', e => {
    if (e.target === modalBackdrop) closeModal();
  });
  
  // ESC键关闭
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
  
  // 打开模态框
  const openModal = (key) => {
    const data = timelineData.find(item => item.id === key);
    if (!data) return;
    
    window._lastFocusedElement = document.activeElement;
    
    modal.querySelector('.tl-modal-title').textContent = data.modalTitle;
    modal.querySelector('.tl-modal-subtitle').textContent = data.modalSubtitle;
    modal.querySelector('.tl-modal-body').innerHTML = data.modalContent;
    modal.querySelector('.tl-modal-link').href = data.linkUrl;
    
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => modalBackdrop.querySelector('.tl-close-btn').focus(), 50);
  };
  
  // 绑定卡片点击
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
    
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(key);
      }
    });
  });
  
  // 计算时间
  const MEL_TIMEZONE = 10; // UTC+10
  const MEL_MS = MEL_TIMEZONE * 60 * 60 * 1000;
  
  const getMelbourneTime = () => {
    return new Date(Date.now() + MEL_MS);
  };
  
  const parseDate = (dateStr) => {
    // 格式: DD/MM/YYYY
    const [day, month, year] = dateStr.split('/').map(n => parseInt(n));
    return new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
  };
  
  const timeSince = (dateStr) => {
    const startDate = parseDate(dateStr);
    const now = getMelbourneTime();
    
    // 计算毫秒差
    const diff = now - startDate;
    
    if (diff < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // 未来日期
    
    // 计算天数与剩余时间
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((diff % (60 * 1000)) / 1000);
    
    return { days, hours, minutes, seconds };
  };
  
  // 更新计数器
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
  
  // 立即更新一次
  updateCounters();
  
  // 每秒更新
  setInterval(updateCounters, 1000);
});
</script>

<style>
/* 基础样式 */
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

/* 网格布局 */
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

/* 卡片样式 */
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

/* 卡片媒体区 */
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

/* 卡片内容区 */
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

/* 计时器样式 */
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

/* 更多按钮 */
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

/* 时区备注 */
.tl-note {
  font-size: 0.7rem;
  opacity: 0.7;
  padding-left: 0.8rem;
  border-left: 4px solid var(--tl-accent);
  margin-top: 1rem;
}

/* 模态框样式 */
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

/* 动画偏好 */
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

/* 手机适配 */
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

/* 加载信息 */
.loading-msg {
  text-align: center;
  padding: 3rem 0;
  font-style: italic;
  opacity: 0.7;
}
</style>
}
</style>
