---
title: "我們的時間"
slug: "time"
date: 2025-09-02
toc: false
---

<style>
.time-page{
  max-width:880px;
  margin:0 auto;
  padding:1.4rem 1.1rem 2.8rem;
  font-size:1rem;
  line-height:1.65;
}
.time-page h1{
  margin:0 0 1.4rem;
  font-size:1.95rem;
  line-height:1.2;
  font-weight:700;
  letter-spacing:.5px;
  background:linear-gradient(to right,rgba(29,111,255,.15),rgba(29,111,255,0));
  padding:.65rem .9rem .75rem;
  border-radius:14px;
  position:relative;
}
.time-page h1::after{
  content:"";
  position:absolute;
  left:.9rem;
  bottom:.55rem;
  width:74px;
  height:3px;
  background:#1d6fff;
  border-radius:3px;
  opacity:.85;
}
body.dark .time-page h1{
  background:linear-gradient(to right,rgba(29,111,255,.28),rgba(29,111,255,0));
  color:#e6eef7;
}

.time-grid{
  display:grid;
  gap:1.3rem;
  grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
  margin:0 0 2rem;
}

.time-card{
  position:relative;
  background:rgba(29,111,255,.07);
  border:1px solid rgba(29,111,255,.20);
  border-radius:16px;
  padding:1rem .95rem 1.1rem;
  overflow:hidden;
  backdrop-filter:blur(6px);
  transition:background .35s,border-color .35s,transform .28s,box-shadow .3s;
}
.time-card:hover{
  background:rgba(29,111,255,.12);
  border-color:rgba(29,111,255,.32);
  box-shadow:0 10px 28px -12px rgba(0,0,0,.4);
  transform:translateY(-4px);
}
body.dark .time-card{
  background:rgba(29,111,255,.18);
  border-color:rgba(29,111,255,.38);
}
body.dark .time-card:hover{
  background:rgba(29,111,255,.25);
  border-color:rgba(29,111,255,.55);
  box-shadow:0 14px 36px -12px rgba(0,0,0,.65);
}

.time-card h2{
  margin:.1rem 0 .55rem;
  font-size:1rem;
  line-height:1.25;
  font-weight:700;
  letter-spacing:.4px;
  display:flex;
  align-items:center;
  gap:.45rem;
  color:#0b3d91;
}
body.dark .time-card h2{color:#b5d8ff;}

.time-metric{
  font-size:2.6rem;
  font-weight:700;
  letter-spacing:1px;
  line-height:1;
  margin:0 0 .55rem;
  color:#1d6fff;
  font-variant-numeric:tabular-nums;
}
body.dark .time-metric{color:#8ec4ff;}

.time-sub{
  font-size:.72rem;
  letter-spacing:.55px;
  text-transform:uppercase;
  opacity:.6;
  margin:0 0 .85rem;
  font-weight:600;
}

.time-note{
  font-size:.72rem;
  line-height:1.35;
  opacity:.75;
  letter-spacing:.3px;
}

.timer-inline{
  font-weight:600;
  color:#1d6fff;
}
body.dark .timer-inline{color:#8ec4ff;}

.avatar-wrap{
  position:relative;
  width:86px;
  height:86px;
  border-radius:22px;
  overflow:hidden;
  margin:0 0 .75rem;
  box-shadow:0 6px 18px -6px rgba(0,0,0,.4);
  border:2px solid rgba(255,255,255,.85);
  background:#fff;
}
body.dark .avatar-wrap{
  border-color:rgba(255,255,255,.25);
  background:#1e1f22;
}
.avatar-wrap img{
  width:100%;height:100%;object-fit:cover;display:block;
}

.pet-photo{
  position:relative;
  width:100%;
  aspect-ratio:5/3;
  border-radius:14px;
  overflow:hidden;
  margin:.35rem 0 .85rem;
  box-shadow:0 8px 22px -10px rgba(0,0,0,.45);
  background:#eceef2;
}
body.dark .pet-photo{background:#2b2f35;}
.pet-photo img{width:100%;height:100%;object-fit:cover;display:block;}

.inline-birth{
  font-size:.65rem;
  letter-spacing:.5px;
  font-weight:600;
  background:rgba(29,111,255,.13);
  color:#0b3d91;
  padding:.28rem .6rem .32rem;
  border-radius:999px;
  display:inline-block;
  margin-top:.2rem;
}
body.dark .inline-birth{
  background:rgba(29,111,255,.26);
  color:#cfe6ff;
}

@media (max-width:640px){
  .time-metric{font-size:2.15rem;}
  .time-card{padding:.9rem .85rem 1rem;border-radius:14px;}
  .avatar-wrap{width:72px;height:72px;border-radius:18px;}
  .pet-photo{border-radius:12px;}
}

@media (prefers-reduced-motion:reduce){
  .time-card,
  .site-brand a::before{transition:none!important;transform:none!important;}
}
</style>

<div class="time-page">
  <h1>⏱ 我們的時間 / Time Together</h1>

  <div class="time-grid">

    <!-- 在一起天數 -->
    <div class="time-card" id="together-card">
      <div class="avatar-wrap">
        <!-- 女友 IG 頭像：請替換 src (放 /static 路徑) -->
        <img src="/REPLACE-girlfriend-avatar.jpg" alt="Girlfriend Avatar">
      </div>
      <h2>我們在一起 <span class="timer-inline" id="together-days">--</span> 天</h2>
      <div class="time-sub">Since 07/08/2025</div>
      <p class="time-note">第 1 天為 07/08/2025（含當日計算）。本計時於本地時間每日 00:00 自動刷新。</p>
    </div>

    <!-- 薯餅 -->
    <div class="time-card" id="hashbrown-card">
      <div class="pet-photo">
        <!-- 薯餅照片：替換 src -->
        <img src="/REPLACE-hash-brown-photo.jpg" alt="薯餅 Hash Brown">
      </div>
      <h2>薯餅 <span class="timer-inline" id="hashbrown-days">--</span> 天大</h2>
      <div class="time-sub">Birthday 24/06/2025</div>
      <span class="inline-birth">24/06/2025 → <span id="hashbrown-today"></span></span>
      <p class="time-note">含生日當天為第 1 天。</p>
    </div>

    <!-- 馬鈴薯 -->
    <div class="time-card" id="potato-card">
      <div class="pet-photo">
        <!-- 馬鈴薯照片：替換 src -->
        <img src="/REPLACE-potato-photo.jpg" alt="馬鈴薯 Potato">
      </div>
      <h2>馬鈴薯 <span class="timer-inline" id="potato-days">--</span> 天大</h2>
      <div class="time-sub">Birthday 27/07/2025</div>
      <span class="inline-birth">27/07/2025 → <span id="potato-today"></span></span>
      <p class="time-note">含生日當天為第 1 天。</p>
    </div>

  </div>

  <p style="font-size:.75rem;opacity:.6;margin-top:2.4rem;">提示：若數字未更新，請強制重新整理（Ctrl/Cmd + Shift + R）。</p>
</div>

<script>
(function(){
  const pad = n=>String(n).padStart(2,'0');
  const fmt = d=>[pad(d.getDate()),pad(d.getMonth()+1),d.getFullYear()].join('/');

  // 基準日期（dd/mm/yyyy）
  const togetherStart = new Date(2025,7,7);      // 07/08/2025  (月 0 起)
  const hashBrownBirth = new Date(2025,5,24);    // 24/06/2025
  const potatoBirth = new Date(2025,6,27);       // 27/07/2025

  function dayDiffInclusive(fromDate,toDate){
    // 去掉時間部分，以本地時區計算
    const a = new Date(fromDate.getFullYear(),fromDate.getMonth(),fromDate.getDate());
    const b = new Date(toDate.getFullYear(),toDate.getMonth(),toDate.getDate());
    return Math.floor((b - a)/86400000) + 1;
  }

  function update(){
    const now = new Date();
    document.getElementById('together-days').textContent = dayDiffInclusive(togetherStart,now);
    document.getElementById('hashbrown-days').textContent = dayDiffInclusive(hashBrownBirth,now);
    document.getElementById('potato-days').textContent = dayDiffInclusive(potatoBirth,now);
    const todayStr = fmt(now);
    document.getElementById('hashbrown-today').textContent = todayStr;
    document.getElementById('potato-today').textContent = todayStr;
  }

  update();

  // 設定下一個午夜刷新
  (function scheduleMidnight(){
    const now = new Date();
    const next = new Date(now);
    next.setHours(24,0,0,50); // 加 50ms 緩衝
    setTimeout(()=>{ update(); scheduleMidnight(); }, next - now);
  })();
})();
</script>
