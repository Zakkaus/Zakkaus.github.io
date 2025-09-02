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
/* === Timeline 新版單欄設計（覆蓋舊樣式） === */
.days-page{
  max-width:880px;
  margin:0 auto;
  padding:1.4rem 0 3rem;
  font-size:1rem;
  line-height:1.6;
}
.days-stack{
  display:flex;
  flex-direction:column;
  gap:1.65rem;
}
.d-card{
  position:relative;
  display:flex;
  gap:1.25rem;
  padding:1.35rem 1.55rem 1.45rem;
  border:1px solid rgba(0,0,0,.08);
  background:linear-gradient(145deg,rgba(255,255,255,.92),rgba(255,255,255,.82));
  backdrop-filter:blur(8px);
  border-radius:26px;
  align-items:center;
  overflow:hidden;
  box-shadow:0 4px 14px -6px rgba(0,0,0,.15);
  transition:box-shadow .35s,border-color .35s,transform .3s,background .35s;
}
body.dark .d-card{
  border-color:rgba(255,255,255,.14);
  background:linear-gradient(145deg,rgba(50,50,54,.92),rgba(42,42,46,.86));
  box-shadow:0 6px 22px -10px rgba(0,0,0,.55);
}
.d-card::after{
  content:"";
  position:absolute;
  inset:0;
  background:radial-gradient(circle at 85% 18%,rgba(225,48,108,.12),transparent 60%);
  opacity:.85;
  pointer-events:none;
}
body.dark .d-card::after{
  background:radial-gradient(circle at 82% 20%,rgba(225,48,108,.25),transparent 60%);
  opacity:.55;
}
.d-card:hover{
  transform:translateY(-6px);
  border-color:var(--hb-active,#e1306c);
  box-shadow:0 12px 34px -12px rgba(0,0,0,.38);
}
body.dark .d-card:hover{
  box-shadow:0 18px 42px -18px rgba(0,0,0,.75);
}
.d-media{
  flex:0 0 auto;
  width:140px;
  height:140px;
  border-radius:28px;
  overflow:hidden;
  position:relative;
  box-shadow:0 6px 18px -8px rgba(0,0,0,.45);
  background:#f5f5f7;
  display:flex;
}
body.dark .d-media{background:#2b2d31;box-shadow:0 8px 24px -10px rgba(0,0,0,.7);}
.d-media img{
  width:100%;
  height:100%;
  object-fit:cover;
  display:block;
  filter:saturate(1.05) contrast(1.03);
  transition:transform .55s;
}
.d-card:hover .d-media img{
  transform:scale(1.06);
}
.d-body{
  flex:1 1 auto;
  min-width:0;
  position:relative;
  z-index:2;
}
.d-body h3{
  margin:.15rem 0 .55rem;
  font-size:1rem;
  font-weight:600;
  letter-spacing:.6px;
  color:var(--hb-active,#e1306c);
}
body.dark .d-body h3{color:#ff86b3;}
.d-num{
  margin:0 0 .5rem;
  font-size:3.15rem;
  line-height:1.05;
  letter-spacing:1.5px;
  font-weight:800;
  background:linear-gradient(90deg,var(--hb-active,#e1306c),#ff8ab4);
  -webkit-background-clip:text;
  color:transparent;
  text-shadow:0 2px 10px rgba(225,48,108,.25);
}
body.dark .d-num{
  background:linear-gradient(90deg,#ff84b0,#ffa3c7);
  -webkit-background-clip:text;
  text-shadow:0 4px 18px rgba(225,48,108,.35);
}
.d-meta{
  margin:0;
  font-size:.72rem;
  letter-spacing:.5px;
  opacity:.68;
  font-weight:500;
}
body.dark .d-meta{opacity:.75;}
/* 特殊類型差異（可後續擴充） */
.d-couple .d-media{border:2px solid rgba(225,48,108,.25);}
.d-pet .d-media{border:2px solid rgba(225,48,108,.18);}
body.dark .d-couple .d-media{border-color:rgba(225,48,108,.45);}
body.dark .d-pet .d-media{border-color:rgba(225,48,108,.35);}

/* 時區標註 */
.tz-line{
  margin:2.2rem 0 0;
  display:flex;
  justify-content:flex-start;
}
.tz-note{
  font-size:.7rem;
  letter-spacing:.55px;
  padding:.25rem 0 .25rem .75rem;
  border-left:4px solid var(--hb-active,#e1306c);
  opacity:.75;
  background:none!important;
  font-weight:600;
  line-height:1.25;
}
body.dark .tz-note{opacity:.85;}

/* 行動裝置調整 */
@media (max-width:820px){
  .d-card{
    flex-direction:row;
    padding:1.15rem 1.25rem 1.25rem;
  }
  .d-media{
    width:120px;
    height:120px;
    border-radius:22px;
  }
  .d-num{font-size:2.55rem;}
}
@media (max-width:560px){
  .d-card{
    flex-direction:column;
    align-items:flex-start;
    padding:1.05rem 1.05rem 1.2rem;
  }
  .d-media{
    width:110px;
    height:110px;
    border-radius:20px;
  }
  .d-body h3{font-size:.95rem;margin-top:.35rem;}
  .d-num{font-size:2.2rem;}
  .d-meta{font-size:.66rem;}
  .days-stack{gap:1.25rem;}
}

/* 動畫減弱 */
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
