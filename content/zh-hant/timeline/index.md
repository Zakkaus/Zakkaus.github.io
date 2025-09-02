---
title: "時間線"
slug: "timeline"
toc: false
date: 2025-09-01
lastmod: 2025-09-01
---
<div class="days-page">
  <div class="days-stack">
    <div class="d-card d-couple">
      <div class="d-media">
        <img class="avatar timeline-img" alt="女友頭像" src="/images/timeline/f-avatar.webp">
      </div>
      <div class="d-body">
        <h3 data-i18n="coupleTitle">我們在一起的天數</h3>
        <p class="d-num" id="togetherDays">--</p>
        <p class="d-meta" data-i18n="since">自 07/08/2025 起</p>
      </div>
    </div>
    <div class="d-card d-pet">
      <div class="d-media">
        <img class="pet-img timeline-img" alt="薯餅" src="/images/timeline/hashbrown.webp">
      </div>
      <div class="d-body">
        <h3 data-i18n="hashTitle">薯餅天數歲數</h3>
        <p class="d-num" id="hashDays">--</p>
        <p class="d-meta" data-i18n="hashSince">生日：24/06/2025</p>
      </div>
    </div>
    <div class="d-card d-pet">
      <div class="d-media">
        <img class="pet-img timeline-img" alt="馬鈴薯" src="/images/timeline/potato.webp">
      </div>
      <div class="d-body">
        <h3 data-i18n="potatoTitle">馬鈴薯天數歲數</h3>
        <p class="d-num" id="potatoDays">--</p>
        <p class="d-meta" data-i18n="potatoSince">生日：27/07/2025</p>
      </div>
    </div>
  </div>
  <div class="tz-line">
    <span class="tz-note" data-i18n="tzNote">根據澳洲時間 UTC+10 (AEST) ❄️</span>
  </div>
</div>

<style>
/* === 簡潔縱向版 Timeline 樣式（取代舊樣式） === */
:root{
  --tl-card-radius:22px;
  --tl-img-size:170px;
  --tl-img-radius:26px;
  --tl-gap:1.6rem;
  --tl-accent:var(--hb-active,#e1306c);
}
.days-page{
  max-width:720px;
  margin:0 auto;
  padding:1.25rem 0 2.8rem;
  font-size:1rem;
  line-height:1.55;
}
.days-stack{
  display:flex;
  flex-direction:column;
  gap:var(--tl-gap);
  margin:0;
  padding:0;
  list-style:none;
}
.d-card{
  display:flex;
  flex-direction:column;
  align-items:center;
  text-align:center;
  padding:1.35rem 1.25rem 1.55rem;
  border:1px solid rgba(0,0,0,.08);
  background:#fff;
  border-radius:var(--tl-card-radius);
  box-shadow:0 2px 4px -2px rgba(0,0,0,.05);
  transition:border-color .25s,box-shadow .25s,transform .28s,background .25s;
}
body.dark .d-card{
  background:#26272b;
  border-color:rgba(255,255,255,.12);
  box-shadow:0 4px 10px -6px rgba(0,0,0,.55);
}
.d-card:hover{
  border-color:var(--tl-accent);
  box-shadow:0 6px 18px -8px rgba(0,0,0,.18);
  transform:translateY(-4px);
}
body.dark .d-card:hover{
  box-shadow:0 10px 28px -14px rgba(0,0,0,.65);
}
.d-media{
  width:var(--tl-img-size);
  height:var(--tl-img-size);
  border-radius:var(--tl-img-radius);
  overflow:hidden;
  background:#f2f3f5;
  display:flex;
  justify-content:center;
  align-items:center;
  margin:0 0 1rem;
  position:relative;
}
body.dark .d-media{background:#34363b;}
.d-media img{
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
  transition:transform .55s;
}
.d-card:hover .d-media img{transform:scale(1.04);}
.d-body{
  width:100%;
  max-width:420px;
  display:flex;
  flex-direction:column;
  align-items:center;
}
.d-body h3{
  margin:0 0 .7rem;
  font-size:1.02rem;
  line-height:1.25;
  font-weight:600;
  letter-spacing:.5px;
  color:var(--tl-accent);
}
body.dark .d-body h3{color:#ff90ba;}
.d-num{
  margin:0 0 .55rem;
  font-size:3rem;
  line-height:1.05;
  font-weight:800;
  letter-spacing:1.2px;
  color:var(--tl-accent);
}
body.dark .d-num{color:#ff8ab4;}
.d-meta{
  margin:0;
  font-size:.72rem;
  letter-spacing:.45px;
  opacity:.68;
  font-weight:500;
}
body.dark .d-meta{opacity:.75;}
/* 卡片細部差異（目前僅色調邊框可調整） */
.d-couple{ }
.d-pet{ }
.tz-line{
  margin:2rem 0 0;
  display:flex;
  justify-content:flex-start;
}
.tz-note{
  font-size:.7rem;
  letter-spacing:.5px;
  padding:.2rem 0 .2rem .75rem;
  border-left:4px solid var(--tl-accent);
  opacity:.72;
  background:none!important;
  font-weight:600;
  line-height:1.2;
}
body.dark .tz-note{opacity:.8;}
/* 行動裝置調整 */
@media (max-width:680px){
  :root{
    --tl-img-size:150px;
    --tl-img-radius:24px;
  }
  .d-card{
    padding:1.15rem 1rem 1.35rem;
  }
  .d-body h3{font-size:.98rem;margin-bottom:.6rem;}
  .d-num{font-size:2.55rem;}
  .days-stack{gap:1.35rem;}
}
@media (max-width:460px){
  :root{
    --tl-img-size:125px;
    --tl-img-radius:22px;
  }
  .d-card{
    padding:1rem .9rem 1.2rem;
  }
  .d-body h3{font-size:.95rem;}
  .d-num{font-size:2.2rem;}
  .d-meta{font-size:.66rem;}
}
/* 動畫偏好 */
@media (prefers-reduced-motion:reduce){
  .d-card,.d-media img{transition:none!important;transform:none!important;}
}
</style>

<script>
/* 保留：雙語 + AEST 計算 */
(function(){
  const lang=(document.documentElement.lang||'').toLowerCase();
  const t={
    zh:{coupleTitle:'我們在一起的天數',since:'自 07/08/2025 起',hashTitle:'薯餅天數歲數',hashSince:'生日：24/06/2025',potatoTitle:'馬鈴薯天數歲數',potatoSince:'生日：27/07/2025',tzNote:'根據澳洲時間 UTC+10 (AEST) ❄️'},
    en:{coupleTitle:'Days Together',since:'Since 07/08/2025',hashTitle:'Hash Brown Age (days)',hashSince:'Birthday: 24/06/2025',potatoTitle:'Potato Age (days)',potatoSince:'Birthday: 27/07/2025',tzNote:'Based on Australia time UTC+10 (AEST) ❄️'}
  };
  const dict=lang.startsWith('zh')?t.zh:t.en;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.getAttribute('data-i18n'); if(dict[k]) el.textContent=dict[k];
  });
  const TZ_OFFSET_H=10, MS_DAY=86400000;
  const parseDMY=s=>{const[a,b,c]=s.split('/').map(Number);return{d:a,m:b,y:c};};
  const makeAEST=(y,m,d)=>new Date(Date.UTC(y,m-1,d,10,0,0));
  const inclusiveDays=start=>{
    const {d,m,y}=parseDMY(start);
    const startDate=makeAEST(y,m,d);
    const nowAEST=new Date(Date.now()+TZ_OFFSET_H*3600*1000);
    const todayAEST=makeAEST(nowAEST.getUTCFullYear(),nowAEST.getUTCMonth()+1,nowAEST.getUTCDate());
    return Math.floor((todayAEST-startDate)/MS_DAY)+1;
  };
  const set=(id,date)=>{const el=document.getElementById(id); if(el) el.textContent=inclusiveDays(date).toLocaleString();};
  set('togetherDays','07/08/2025');
  set('hashDays','24/06/2025');
  set('potatoDays','27/07/2025');
})();
</script>
<!-- 圖片需位於 /static/images/timeline/ : f-avatar.webp, hashbrown.webp, potato.webp -->
  const dict=lang.startsWith('zh')?t.zh:t.en;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.getAttribute('data-i18n'); if(dict[k]) el.textContent=dict[k];
  });
  const TZ_OFFSET_H=10, MS_DAY=86400000;
  const parseDMY=s=>{const[a,b,c]=s.split('/').map(Number);return{d:a,m:b,y:c};};
  const makeAEST=(y,m,d)=>new Date(Date.UTC(y,m-1,d,10,0,0));
  const inclusiveDays=start=>{
    const {d,m,y}=parseDMY(start);
    const startDate=makeAEST(y,m,d);
    const nowAEST=new Date(Date.now()+TZ_OFFSET_H*3600*1000);
    const todayAEST=makeAEST(nowAEST.getUTCFullYear(),nowAEST.getUTCMonth()+1,nowAEST.getUTCDate());
    return Math.floor((todayAEST-startDate)/MS_DAY)+1;
  };
  const set=(id,date)=>{const el=document.getElementById(id); if(el) el.textContent=inclusiveDays(date).toLocaleString();};
  set('togetherDays','07/08/2025');
  set('hashDays','24/06/2025');
  set('potatoDays','27/07/2025');
})();
</script>
<!-- 圖片需位於 /static/images/timeline/ : f-avatar.webp, hashbrown.webp, potato.webp -->
