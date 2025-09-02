---
title: "Timeline"
slug: "timeline"
toc: false
date: 2025-09-01
lastmod: 2025-09-01
---

<div class="days-page">
  <div class="days-cards">
    <div class="d-card couple">
      <img class="avatar timeline-img" alt="Avatar"
           src="/images/timeline/gf-avatar.jpg"
           data-fallback="/images/gf-avatar.jpg,/images/timeline/gf-avatar.webp,/images/gf-avatar.webp">
      <div class="d-content">
        <h3 data-i18n="coupleTitle">Days Together</h3>
        <p class="d-num" id="togetherDays">--</p>
        <p class="d-start" data-i18n="since">Since 07/08/2025</p>
      </div>
    </div>
    <div class="d-card pet">
      <img class="pet-img timeline-img" alt="Hash Brown"
           src="/images/timeline/hashbrown.jpg"
           data-fallback="/images/hashbrown.jpg,/images/timeline/hashbrown.webp,/images/hashbrown.webp">
      <div class="d-content">
        <h3 data-i18n="hashTitle">Hash Brown Age (days)</h3>
        <p class="d-num" id="hashDays">--</p>
        <p class="d-start" data-i18n="hashSince">Birthday: 24/06/2025</p>
      </div>
    </div>
    <div class="d-card pet">
      <img class="pet-img timeline-img" alt="Potato"
           src="/images/timeline/potato.jpg"
           data-fallback="/images/potato.jpg,/images/timeline/potato.webp,/images/potato.webp">
      <div class="d-content">
        <h3 data-i18n="potatoTitle">Potato Age (days)</h3>
        <p class="d-num" id="potatoDays">--</p>
        <p class="d-start" data-i18n="potatoSince">Birthday: 27/07/2025</p>
      </div>
    </div>
  </div>
  <blockquote class="tz-note" data-i18n="tzNote">Based on Australia time UTC+10 (AEST) ❄️</blockquote>
</div>

<style>
/* === Timeline Cards === */
.days-page{max-width:980px;margin:0 auto;padding:1.2rem 0 2.5rem;font-size:1rem;line-height:1.55;}
.days-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.4rem;}
.d-card{position:relative;padding:1.1rem 1.05rem 1.2rem;border:1px solid rgba(0,0,0,.1);border-radius:18px;background:rgba(255,255,255,.82);backdrop-filter:blur(6px);display:flex;gap:.95rem;align-items:center;overflow:hidden;transition:background .28s,border-color .28s,transform .25s,box-shadow .28s;}
body.dark .d-card{border-color:rgba(255,255,255,.16);background:rgba(42,42,46,.78);}
.d-card:hover{transform:translateY(-4px);box-shadow:0 10px 28px -10px rgba(0,0,0,.28);border-color:var(--hb-active,#e1306c);background:rgba(255,255,255,.95);}
body.dark .d-card:hover{background:rgba(58,58,64,.9);box-shadow:0 14px 34px -14px rgba(0,0,0,.65);}
.d-card img.avatar,.d-card img.pet-img{width:70px;height:70px;object-fit:cover;border-radius:16px;flex:0 0 70px;box-shadow:0 4px 14px -6px rgba(0,0,0,.3);border:2px solid rgba(255,255,255,.85);}
body.dark .d-card img.avatar,body.dark .d-card img.pet-img{border-color:rgba(255,255,255,.25);}
.d-content h3{margin:.1rem 0 .4rem;font-size:.9rem;letter-spacing:.5px;font-weight:600;color:var(--hb-active,#e1306c);}
body.dark .d-content h3{color:#ff81af;}
.d-num{font-size:2.2rem;font-weight:700;margin:0 0 .25rem;letter-spacing:1px;line-height:1.05;background:linear-gradient(90deg,var(--hb-active,#e1306c),#ff7aa5);-webkit-background-clip:text;color:transparent;}
body.dark .d-num{background:linear-gradient(90deg,#ff8fb8,#ffa7c9);-webkit-background-clip:text;color:transparent;}
.d-start{margin:0;font-size:.65rem;letter-spacing:.4px;opacity:.65;}
.tz-note{margin:1.4rem 0 0;font-size:.68rem;letter-spacing:.45px;opacity:.70;padding:.35rem .75rem .35rem 0;border-left:4px solid var(--hb-active,#e1306c);background:none!important;border-radius:0;}
body.dark .tz-note{opacity:.75;background:none!important;}
@media (max-width:640px){
  .d-card{padding:.95rem .9rem 1rem;border-radius:16px;}
  .d-card img.avatar,.d-card img.pet-img{width:60px;height:60px;flex:0 0 60px;border-radius:12px;}
  .d-num{font-size:1.9rem;}
}
@media (prefers-reduced-motion:reduce){
  .d-card{transition:none;}
  .d-card:hover{transform:none;box-shadow:0 6px 18px -10px rgba(0,0,0,.25);}
}
</style>

<script>
/* === Multilingual & AEST Inclusive Day Counters === */
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

  const AEST_OFFSET_H=10, MS_DAY=86400000;
  const parseDMY=s=>{const[a,b,c]=s.split('/').map(Number);return{d:a,m:b,y:c};};
  const makeAEST=(y,m,d)=>new Date(Date.UTC(y,m-1,d,10,0,0)); // 固定 +10h
  const inclusiveDays=start=>{
    const {d,m,y}=parseDMY(start);
    const startDate=makeAEST(y,m,d);
    const nowAEST=new Date(Date.now()+AEST_OFFSET_H*3600*1000);
    const todayAEST=makeAEST(nowAEST.getUTCFullYear(),nowAEST.getUTCMonth()+1,nowAEST.getUTCDate());
    return Math.floor((todayAEST-startDate)/MS_DAY)+1;
  };
  const set=(id,date)=>{const el=document.getElementById(id); if(el) el.textContent=inclusiveDays(date).toLocaleString();};
  set('togetherDays','07/08/2025');
  set('hashDays','24/06/2025');
  set('potatoDays','27/07/2025');

  /* === Image Fallbacks === */
  document.querySelectorAll('.timeline-img').forEach(img=>{
    img.addEventListener('error',()=>{
      const list=(img.getAttribute('data-fallback')||'').split(',').map(s=>s.trim()).filter(Boolean);
      if(!list.length) return;
      const tried=img.getAttribute('data-tried')?img.getAttribute('data-tried').split('|'):[];
      const next=list.find(p=>!tried.includes(p));
      if(next){
        tried.push(next);
        img.setAttribute('data-tried',tried.join('|'));
        img.src=next;
      }
    },{once:false});
  });
})();
</script>
  margin:0;
  font-size:.65rem;
  letter-spacing:.4px;
  opacity:.65;
}
.tz-note{
  margin:1.6rem 0 0;
  font-size:.68rem;
  letter-spacing:.45px;
  opacity:.55;
  border-left:3px solid var(--hb-active,#e1306c);
  padding:.4rem .75rem;
  background:rgba(225,48,108,.06);
  border-radius:6px;
}
body.dark .tz-note{
  background:rgba(225,48,108,.18);
  opacity:.65;
}
@media (max-width:640px){
  .d-card{
    padding:.95rem .9rem 1rem;
    border-radius:16px;
  }
  .d-card img.avatar,
  .d-card img.pet-img{
    width:60px;height:60px;flex:0 0 60px;border-radius:12px;
  }
  .d-num{font-size:1.9rem;}
}
@media (prefers-reduced-motion:reduce){
  .d-card{transition:none;}
  .d-card:hover{transform:none;box-shadow:0 6px 18px -10px rgba(0,0,0,.25);}
}
</style>

<script>
(function(){
  const lang=(document.documentElement.lang||'').toLowerCase();
  const t={
    zh:{
      coupleTitle:'我們在一起的天數',
      since:'自 07/08/2025 起',
      hashTitle:'薯餅天數歲數',
      hashSince:'生日：24/06/2025',
      potatoTitle:'馬鈴薯天數歲數',
      potatoSince:'生日：27/07/2025',
      tzNote:'根據澳洲時間 UTC+10 (AEST) ❄️'
    },
    en:{
      coupleTitle:'Days Together',
      since:'Since 07/08/2025',
      hashTitle:'Hash Brown Age (days)',
      hashSince:'Birthday: 24/06/2025',
      potatoTitle:'Potato Age (days)',
      potatoSince:'Birthday: 27/07/2025',
      tzNote:'Based on Australia time UTC+10 (AEST) ❄️'
    }
  };
  const dict=lang.startsWith('zh')?t.zh:t.en;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.getAttribute('data-i18n');
    if(dict[k]) el.textContent=dict[k];
  });

  // AEST 計算（UTC+10，忽略夏令時間）
  const AEST_OFFSET_HOURS = 10;
  const MS_DAY = 86400000;
  const parseDMY = (str)=> {
    const [d,m,y]=str.split('/').map(Number);
    return {d,m,y};
  };
  const makeAESTDate = (y,m,d)=>{
    // 以 UTC 基準 +10h，再取該 AEST 日的 UTC 中午避免時差邊界
    return new Date(Date.UTC(y,m-1,d,10,0,0));
  };
  const inclusiveDays = (startStr)=>{
    const {d,m,y}=parseDMY(startStr);
    const start = makeAESTDate(y,m,d);
    const nowUTC = Date.now();
    const nowAEST = new Date(nowUTC + AEST_OFFSET_HOURS*3600*1000);
    const todayAEST = makeAESTDate(nowAEST.getUTCFullYear(), nowAEST.getUTCMonth()+1, nowAEST.getUTCDate());
    return Math.floor((todayAEST - start)/MS_DAY)+1;
  };
  const setNum=(id,dateStr)=>{
    const el=document.getElementById(id);
    if(el) el.textContent=inclusiveDays(dateStr).toLocaleString();
  };
  setNum('togetherDays','07/08/2025');
  setNum('hashDays','24/06/2025');
  setNum('potatoDays','27/07/2025');
})();
</script>

<!-- 圖片請放到 /static/images/timeline/：
     gf-avatar.jpg, hashbrown.jpg, potato.jpg -->
