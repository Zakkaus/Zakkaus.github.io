---
title: "Timeline"
slug: "timeline"
toc: false
date: 2025-09-01
lastmod: 2025-09-01
---
<div class="days-page">
  <div class="days-grid">
    <div class="d-card d-couple tl-openable" data-key="couple" role="button" tabindex="0" aria-haspopup="dialog">
      <div class="d-media">
        <img class="avatar timeline-img" alt="Avatar" src="/images/timeline/f-avatar.webp">
      </div>
      <div class="d-body">
        <h3 data-i18n="coupleTitle">Days Together</h3>
        <p class="d-num" id="togetherDays">--</p>
        <p class="d-meta" data-i18n="since">Since 07/08/2025</p>
      </div>
    </div>
    <div class="d-card d-pet tl-openable" data-key="hash" role="button" tabindex="0" aria-haspopup="dialog">
      <div class="d-media">
        <img class="pet-img timeline-img" alt="Hash Brown" src="/images/timeline/hashbrown.webp">
      </div>
      <div class="d-body">
        <h3 data-i18n="hashTitle">Hash Brown Age (days)</h3>
        <p class="d-num" id="hashDays">--</p>
        <p class="d-meta" data-i18n="hashSince">Birthday: 24/06/2025</p>
      </div>
    </div>
    <div class="d-card d-pet tl-openable" data-key="potato" role="button" tabindex="0" aria-haspopup="dialog">
      <div class="d-media">
        <img class="pet-img timeline-img" alt="Potato" src="/images/timeline/potato.webp">
      </div>
      <div class="d-body">
        <h3 data-i18n="potatoTitle">Potato Age (days)</h3>
        <p class="d-num" id="potatoDays">--</p>
        <p class="d-meta" data-i18n="potatoSince">Birthday: 27/07/2025</p>
      </div>
    </div>
  </div>
  <div class="tz-line">
    <span class="tz-note" data-i18n="tzNote">Based on Australia time UTC+10 (AEST) ❄️</span>
  </div>
</div>

<!-- 直接複製 zh-hant 已清理好的 style / script（語系自動判斷） -->
<!-- 為避免重複，這裡不再貼出；請從 zh-hant 版本複製同一段 <style> 與 <script> 到此檔案 -->
<style>
/* 與 zh-hant 完全一致的版面與裁切設定 */
:root{
  --tl-accent:var(--hb-active,#e1306c);
  --tl-img-size:180px;
  --tl-img-radius:22px;
  --tl-card-radius:24px;
  --tl-gap:1.65rem;
}
.days-page{max-width:1180px;margin:0 auto;padding:1.4rem 0 3rem;font-size:1rem;line-height:1.55;}
.days-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:var(--tl-gap);}
@media (max-width:1020px){.days-grid{grid-template-columns:repeat(2,1fr);} }
@media (max-width:640px){.days-grid{grid-template-columns:1fr;gap:1.1rem;} :root{--tl-img-size:150px;} }
@media (max-width:420px){:root{--tl-img-size:132px;} }
.d-card{display:flex;flex-direction:column;align-items:center;text-align:center;padding:1.25rem 1.15rem 1.45rem;background:#fff;border:1px solid rgba(0,0,0,.08);border-radius:var(--tl-card-radius);box-shadow:0 2px 4px -2px rgba(0,0,0,.05);transition:transform .28s,border-color .25s,box-shadow .28s,background .25s;position:relative;}
body.dark .d-card{background:#26272b;border-color:rgba(255,255,255,.12);box-shadow:0 4px 10px -6px rgba(0,0,0,.55);}
.d-card:hover{transform:translateY(-6px);border-color:var(--tl-accent);box-shadow:0 10px 22px -10px rgba(0,0,0,.18);}
body.dark .d-card:hover{box-shadow:0 14px 34px -14px rgba(0,0,0,.65);}
.d-media{width:var(--tl-img-size);height:var(--tl-img-size);border-radius:var(--tl-img-radius);overflow:hidden;background:#f2f3f5;display:flex;justify-content:center;align-items:center;margin:0 0 .95rem;}
body.dark .d-media{background:#34363b;}
.d-media img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .55s;}
.d-card:hover .d-media img{transform:scale(1.05);}
.d-body{max-width:420px;width:100%;display:flex;flex-direction:column;align-items:center;}
.d-body h3{margin:0 0 .55rem;font-size:1rem;font-weight:600;letter-spacing:.55px;color:var(--tl-accent);}
body.dark .d-body h3{color:#ff8fb7;}
.d-num{margin:0 0 .5rem;font-size:2.85rem;line-height:1.05;font-weight:800;letter-spacing:1.1px;color:var(--tl-accent);}
body.dark .d-num{color:#ff8fb7;}
.d-meta{margin:0;font-size:.7rem;letter-spacing:.45px;opacity:.68;font-weight:500;}
body.dark .d-meta{opacity:.76;}
.tz-line{margin:2.1rem 0 0;}
.tz-note{font-size:.68rem;letter-spacing:.5px;padding:.25rem 0 .25rem .75rem;border-left:4px solid var(--tl-accent);font-weight:600;background:none!important;opacity:.7;line-height:1.25;}
body.dark .tz-note{opacity:.78;}
@media (max-width:640px){
  .d-card{padding:1.1rem 1rem 1.25rem;}
  .d-body h3{font-size:.95rem;}
  .d-num{font-size:2.35rem;}
  .d-meta{font-size:.64rem;}
  .tz-note{font-size:.62rem;}
}
@media (prefers-reduced-motion:reduce){.d-card,.d-media img{transition:none!important;transform:none!important;}}
/* Modal 樣式與 zh-hant 同步 */
.tl-modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.38);backdrop-filter:blur(4px);display:flex;align-items:flex-start;justify-content:center;padding:4.5vh 1rem 3vh;z-index:1200;opacity:0;pointer-events:none;transition:opacity .22s;}
.tl-modal-backdrop.open{opacity:1;pointer-events:auto;}
.tl-modal{width:100%;max-width:520px;background:#fff;border:1px solid rgba(0,0,0,.1);border-radius:22px;padding:1.35rem 1.35rem 1.55rem;box-shadow:0 18px 50px -16px rgba(0,0,0,.35);position:relative;display:flex;flex-direction:column;gap:.85rem;}
body.dark .tl-modal{background:#2c2d31;border-color:rgba(255,255,255,.14);box-shadow:0 22px 60px -20px rgba(0,0,0,.75);}
.tl-modal h2{margin:0;font-size:1.05rem;letter-spacing:.6px;font-weight:600;color:var(--tl-accent);}
body.dark .tl-modal h2{color:#ff8fb7;}
.tl-modal .tl-meta{font-size:.68rem;letter-spacing:.45px;opacity:.68;margin:-.25rem 0 .2rem;}
body.dark .tl-modal .tl-meta{opacity:.75;}
.tl-modal .tl-body{font-size:.85rem;line-height:1.55;color:#333;}
body.dark .tl-modal .tl-body{color:#d6d7da;}
.tl-modal .tl-body a{color:var(--tl-accent);font-weight:600;text-decoration:none;border-bottom:1px solid transparent;transition:color .18s,border-color .18s;}
.tl-modal .tl-body a:hover{border-color:var(--tl-accent);}
.tl-modal .tl-actions{margin-top:.4rem;display:flex;gap:.6rem;flex-wrap:wrap;}
.tl-btn{background:#f4f5f7;border:1px solid rgba(0,0,0,.12);padding:.55rem .85rem .58rem;font-size:.68rem;letter-spacing:.45px;line-height:1;border-radius:8px;font-weight:600;cursor:pointer;transition:background .2s,border-color .2s,color .2s;}
.tl-btn:hover{background:var(--tl-accent);color:#fff;border-color:var(--tl-accent);}
body.dark .tl-btn{background:#3a3c42;border-color:rgba(255,255,255,.18);color:#ddd;}
body.dark .tl-btn:hover{background:var(--tl-accent);color:#fff;border-color:var(--tl-accent);}
.tl-close{position:absolute;top:.55rem;right:.55rem;background:transparent;border:1px solid transparent;width:34px;height:34px;border-radius:10px;cursor:pointer;font-size:.9rem;font-weight:600;color:#666;display:flex;align-items:center;justify-content:center;transition:background .2s,color .2s;}
.tl-close:hover{background:rgba(0,0,0,.06);color:#222;}
body.dark .tl-close{color:#bbb;}
body.dark .tl-close:hover{background:rgba(255,255,255,.12);color:#fff;}
.tl-openable{cursor:pointer;}
.tl-openable:focus-visible{outline:2px solid var(--tl-accent);outline-offset:3px;}
@media (max-width:560px){.tl-modal{padding:1.15rem 1.05rem 1.3rem;border-radius:20px;}.tl-modal h2{font-size:1rem;}}
@media (prefers-reduced-motion:reduce){.tl-modal-backdrop{transition:none!important;}}
</style>

<script>
/* 同 zh-hant：日數 + Modal (英語字典在此) */
(function(){
  const lang=(document.documentElement.lang||'').toLowerCase();
  const t={
    zh:{coupleTitle:'我們在一起的天數',since:'自 07/08/2025 起',hashTitle:'薯餅天數歲數',hashSince:'生日：24/06/2025',potatoTitle:'馬鈴薯天數歲數',potatoSince:'生日：27/07/2025',tzNote:'根據澳洲時間 UTC+10 (AEST) ❄️',more:'更多',viewAbout:'查看 About',close:'關閉',
      cards:{couple:{head:'關係',meta:'起始日 07/08/2025',body:'我們生活在不同地點（澳洲 / 台灣），都是泛性戀 🩷💛🩵。更多於 <a href="/zh-hant/about/">關於我</a>。',link:'/zh-hant/about/'},
             hash:{head:'薯餅（Hash Brown）',meta:'生日 24/06/2025',body:'純種泰迪天竺鼠，名字靈感 <a href="https://mcdonalds.com.hk/product/hash-browns/" target="_blank" rel="noopener">麥當勞脆薯餅</a>。詳見 <a href="/zh-hant/about/">關於我</a>。',link:'/zh-hant/about/'},
             potato:{head:'馬鈴薯（Potato）',meta:'生日 27/07/2025',body:'純種泰迪天竺鼠。與薯餅一同成長。詳見 <a href="/zh-hant/about/">關於我</a>。',link:'/zh-hant/about/'}}},
    en:{coupleTitle:'Days Together',since:'Since 07/08/2025',hashTitle:'Hash Brown Age (days)',hashSince:'Birthday: 24/06/2025',potatoTitle:'Potato Age (days)',potatoSince:'Birthday: 27/07/2025',tzNote:'Based on Australia time UTC+10 (AEST) ❄️',more:'More',viewAbout:'View About',close:'Close',
      cards:{couple:{head:'Relationship',meta:'Started 07/08/2025',body:'Pansexual couple (Australia / Taiwan). More on the <a href="/about/">About page</a>.',link:'/about/'},
             hash:{head:'Hash Brown',meta:'Birthday 24/06/2025',body:'Purebred Teddy guinea pig. Name idea from <a href="https://mcdonalds.com.hk/en/product/hash-browns/" target="_blank" rel="noopener">McDonald’s Hash Browns</a>. See <a href="/about/">About page</a>.',link:'/about/'},
             potato:{head:'Potato',meta:'Birthday 27/07/2025',body:'Purebred Teddy guinea pig. Growing with Hash Brown. See <a href="/about/">About page</a>.',link:'/about/'}}}
  };
  const dict=lang.startsWith('zh')?t.zh:t.en;
  document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.getAttribute('data-i18n');if(dict[k])el.textContent=dict[k];});

  const TZ_OFFSET_H=10,MS_DAY=86400000;
  const parseDMY=s=>{const[a,b,c]=s.split('/').map(Number);return{d:a,m:b,y:c};};
  const makeAEST=(y,m,d)=>new Date(Date.UTC(y,m-1,d,10,0,0));
  const inclusiveDays=start=>{
    const {d,m,y}=parseDMY(start);
    const startDate=makeAEST(y,m,d);
    const nowAEST=new Date(Date.now()+TZ_OFFSET_H*3600*1000);
    const todayAEST=makeAEST(nowAEST.getUTCFullYear(),nowAEST.getUTCMonth()+1,nowAEST.getUTCDate());
    return Math.floor((todayAEST-startDate)/MS_DAY)+1;
  };
  ['togetherDays:07/08/2025','hashDays:24/06/2025','potatoDays:27/07/2025'].forEach(pair=>{
    const [id,date]=pair.split(':');const el=document.getElementById(id);if(el)el.textContent=inclusiveDays(date).toLocaleString();
  });

  /* Modal */
  let backdrop=null,modal=null,lastFocus=null;
  const build=()=>{
    if(backdrop)return;
    backdrop=document.createElement('div');
    backdrop.className='tl-modal-backdrop';
    backdrop.innerHTML=`<div class="tl-modal" role="dialog" aria-modal="true" aria-labelledby="tlModalTitle">
      <button class="tl-close" type="button" aria-label="${dict.close}">✕</button>
      <h2 id="tlModalTitle"></h2>
      <p class="tl-meta"></p>
      <div class="tl-body"></div>
      <div class="tl-actions">
        <a class="tl-btn tl-about" href="#" target="_self" rel="noopener">${dict.viewAbout}</a>
        <button type="button" class="tl-btn tl-close-btn">${dict.close}</button>
      </div></div>`;
    document.body.appendChild(backdrop);
    modal=backdrop.querySelector('.tl-modal');
    backdrop.addEventListener('click',e=>{if(e.target===backdrop)close();});
    backdrop.querySelectorAll('.tl-close,.tl-close-btn').forEach(b=>b.addEventListener('click',close));
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape')close();
      if(e.key==='Tab'&&backdrop.classList.contains('open'))trap(e);
    });
  };
  const open=key=>{
    build();
    const data=dict.cards[key];if(!data)return;
    lastFocus=document.activeElement;
    modal.querySelector('#tlModalTitle').innerHTML=data.head;
    modal.querySelector('.tl-meta').textContent=data.meta;
    modal.querySelector('.tl-body').innerHTML=data.body;
    modal.querySelector('.tl-about').href=data.link;
    backdrop.classList.add('open');
    setTimeout(()=>modal.querySelector('.tl-close').focus(),10);
  };
  const close=()=>{
    if(!backdrop)return;
    backdrop.classList.remove('open');
    if(lastFocus&&lastFocus.focus)lastFocus.focus();
  };
  const trap=e=>{
    const f=modal.querySelectorAll('a[href],button:not([disabled])');
    if(!f.length)return;
    const first=f[0],last=f[f.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  };
  document.querySelectorAll('.tl-openable').forEach(card=>{
    card.addEventListener('click',()=>open(card.dataset.key));
    card.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault();open(card.dataset.key);}
    });
  });
})();
</script>
<!-- Images: /static/images/timeline/f-avatar.webp hashbrown.webp potato.webp -->
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
/* 與 zh-hant 相同，請複製上方 zh-hant 的整段 JS */
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
