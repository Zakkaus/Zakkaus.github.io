---
title: "時間線"
slug: "timeline"
toc: false
date: 2025-09-01
lastmod: 2025-09-01
---

<div class="tl-scope">
  <div class="tl-grid">
    <!-- 關係 -->
    <div class="tl-card tl-open" data-key="couple" tabindex="0" role="button" aria-haspopup="dialog">
      <div class="tl-media">
        <img loading="lazy" src="/images/timeline/f-avatar.webp" alt="女友頭像">
      </div>
      <h3 data-i18n="coupleTitle">我們在一起的天數</h3>
      <p class="tl-num" id="togetherDays">0</p>
      <p class="tl-meta" data-i18n="since">自 07/08/2025 起</p>
    </div>
    <!-- 薯餅 -->
    <div class="tl-card tl-open" data-key="hash" tabindex="0" role="button" aria-haspopup="dialog">
      <div class="tl-media">
        <img loading="lazy" src="/images/timeline/hashbrown.webp" alt="薯餅">
      </div>
      <h3 data-i18n="hashTitle">薯餅天數歲數</h3>
      <p class="tl-num" id="hashDays">0</p>
      <p class="tl-meta" data-i18n="hashSince">生日：24/06/2025</p>
    </div>
    <!-- 馬鈴薯 -->
    <div class="tl-card tl-open" data-key="potato" tabindex="0" role="button" aria-haspopup="dialog">
      <div class="tl-media">
        <img loading="lazy" src="/images/timeline/potato.webp" alt="馬鈴薯">
      </div>
      <h3 data-i18n="potatoTitle">馬鈴薯天數歲數</h3>
      <p class="tl-num" id="potatoDays">0</p>
      <p class="tl-meta" data-i18n="potatoSince">生日：27/07/2025</p>
    </div>
  </div>

  <p class="tl-tz" data-i18n="tzNote">根據澳洲時間 UTC+10 (AEST) ❄️</p>
</div>

<noscript><p style="font-size:12px;opacity:.7">（JavaScript 已停用，無法計算天數與顯示詳細資訊）</p></noscript>

<style>
/* ===== Timeline Scoped Reset ===== */
.tl-scope *{box-sizing:border-box;}
.tl-scope{
  --tl-accent:var(--hb-active,#e1306c);
  --tl-bg:#fff;
  --tl-bg-dark:#26272b;
  --tl-radius:22px;
  --tl-media-size:180px;
  --tl-gap:1.6rem;
  font-size:16px;
  line-height:1.55;
  max-width:1180px;
  margin:0 auto;
  padding:1.4rem 0 3rem;
}
body.dark .tl-scope{--tl-bg:var(--tl-bg-dark);}
.tl-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:var(--tl-gap);
}
@media (max-width:1020px){
  .tl-grid{grid-template-columns:repeat(2,1fr);}
}
@media (max-width:640px){
  .tl-grid{grid-template-columns:1fr;gap:1.1rem;}
  .tl-scope{--tl-media-size:150px;}
}
@media (max-width:420px){
  .tl-scope{--tl-media-size:132px;}
}

.tl-card{
  background:var(--tl-bg);
  border:1px solid rgba(0,0,0,.08);
  border-radius:var(--tl-radius);
  padding:1.15rem 1.05rem 1.35rem;
  display:flex;
  flex-direction:column;
  align-items:center;
  text-align:center;
  position:relative;
  transition:transform .28s,border-color .25s,box-shadow .28s;
  cursor:pointer;
  outline:none;
  box-shadow:0 2px 4px -2px rgba(0,0,0,.05);
}
body.dark .tl-card{
  border-color:rgba(255,255,255,.12);
  box-shadow:0 4px 12px -6px rgba(0,0,0,.55);
}
.tl-card:hover,.tl-card:focus-visible{
  transform:translateY(-6px);
  border-color:var(--tl-accent);
  box-shadow:0 10px 24px -10px rgba(0,0,0,.2);
}
body.dark .tl-card:hover,
body.dark .tl-card:focus-visible{
  box-shadow:0 14px 34px -14px rgba(0,0,0,.65);
}

.tl-media{
  width:var(--tl-media-size);
  height:var(--tl-media-size);
  border-radius:20px;
  overflow:hidden;
  background:#f2f3f5;
  margin:0 0 .85rem;
  display:flex;
  justify-content:center;
  align-items:center;
}
body.dark .tl-media{background:#34363b;}
.tl-media img{
  width:100%;
  height:100%;
  object-fit:cover;
  transition:transform .55s;
  display:block;
}
.tl-card:hover .tl-media img{transform:scale(1.05);}

.tl-card h3{
  margin:0 0 .55rem;
  font-size:1rem;
  font-weight:600;
  letter-spacing:.55px;
  color:var(--tl-accent);
}
body.dark .tl-card h3{color:#ff8fb7;}

.tl-num{
  margin:0 0 .45rem;
  font-size:2.65rem;
  line-height:1.05;
  font-weight:800;
  letter-spacing:1.1px;
  color:var(--tl-accent);
}
body.dark .tl-num{color:#ff8fb7;}

.tl-meta{
  margin:0;
  font-size:.68rem;
  letter-spacing:.45px;
  opacity:.68;
  font-weight:500;
}
body.dark .tl-meta{opacity:.76;}

.tl-tz{
  margin:2rem 0 0;
  font-size:.66rem;
  letter-spacing:.5px;
  padding:.25rem 0 .25rem .7rem;
  border-left:4px solid var(--tl-accent);
  font-weight:600;
  opacity:.72;
  background:none;
  line-height:1.25;
}
body.dark .tl-tz{opacity:.8;}

@media (prefers-reduced-motion:reduce){
  .tl-card,.tl-media img{transition:none!important;transform:none!important;}
}

/* ===== Modal ===== */
.tl-modal-backdrop{
  position:fixed;inset:0;
  background:rgba(0,0,0,.38);
  backdrop-filter:blur(4px);
  display:flex;
  align-items:flex-start;
  justify-content:center;
  padding:4.5vh 1rem 3vh;
  z-index:1200;
  opacity:0;
  pointer-events:none;
  transition:opacity .22s;
}
.tl-modal-backdrop.open{
  opacity:1;
  pointer-events:auto;
}
.tl-modal{
  width:100%;
  max-width:520px;
  background:#fff;
  border:1px solid rgba(0,0,0,.1);
  border-radius:22px;
  padding:1.35rem 1.35rem 1.55rem;
  box-shadow:0 18px 50px -16px rgba(0,0,0,.35);
  display:flex;
  flex-direction:column;
  gap:.85rem;
  position:relative;
}
body.dark .tl-modal{
  background:#2c2d31;
  border-color:rgba(255,255,255,.14);
  box-shadow:0 22px 60px -20px rgba(0,0,0,.75);
}
.tl-modal h2{
  margin:0;
  font-size:1.05rem;
  font-weight:600;
  letter-spacing:.6px;
  color:var(--tl-accent);
}
body.dark .tl-modal h2{color:#ff8fb7;}
.tl-modal .tl-meta{
  margin:-.25rem 0 .15rem;
  font-size:.68rem;
  letter-spacing:.45px;
  opacity:.68;
}
body.dark .tl-modal .tl-meta{opacity:.75;}
.tl-modal .tl-body{
  font-size:.85rem;
  line-height:1.55;
  color:#333;
}
body.dark .tl-modal .tl-body{color:#d6d7da;}
.tl-modal .tl-body a{
  color:var(--tl-accent);
  font-weight:600;
  text-decoration:none;
  border-bottom:1px solid transparent;
  transition:color .18s,border-color .18s;
}
.tl-modal .tl-body a:hover{
  border-color:var(--tl-accent);
}
.tl-actions{
  margin-top:.4rem;
  display:flex;
  gap:.6rem;
  flex-wrap:wrap;
}
.tl-btn{
  background:#f4f5f7;
  border:1px solid rgba(0,0,0,.12);
  padding:.55rem .85rem .58rem;
  font-size:.68rem;
  letter-spacing:.45px;
  line-height:1;
  border-radius:8px;
  font-weight:600;
  cursor:pointer;
  transition:background .2s,border-color .2s,color .2s;
}
.tl-btn:hover{
  background:var(--tl-accent);
  border-color:var(--tl-accent);
  color:#fff;
}
body.dark .tl-btn{
  background:#3a3c42;
  border-color:rgba(255,255,255,.18);
  color:#ddd;
}
body.dark .tl-btn:hover{
  background:var(--tl-accent);
  color:#fff;
  border-color:var(--tl-accent);
}
.tl-close{
  position:absolute;
  top:.55rem;
  right:.55rem;
  width:36px;
  height:36px;
  background:transparent;
  border:1px solid transparent;
  border-radius:10px;
  cursor:pointer;
  font-size:.9rem;
  font-weight:600;
  color:#666;
  display:flex;
  align-items:center;
  justify-content:center;
  transition:background .2s,color .2s;
}
.tl-close:hover{background:rgba(0,0,0,.06);color:#222;}
body.dark .tl-close{color:#bbb;}
body.dark .tl-close:hover{background:rgba(255,255,255,.12);color:#fff;}

@media (max-width:560px){
  .tl-modal{padding:1.15rem 1.05rem 1.3rem;border-radius:20px;}
  .tl-modal h2{font-size:1rem;}
}
@media (prefers-reduced-motion:reduce){
  .tl-modal-backdrop{transition:none!important;}
}
</style>

<script>
(function(){
  if(window.__TL_PAGE_INIT__) return;
  window.__TL_PAGE_INIT__=true;

  const lang=(document.documentElement.lang||'').toLowerCase();
  const dicts={
    zh:{
      coupleTitle:'我們在一起的天數',
      since:'自 07/08/2025 起',
      hashTitle:'薯餅天數歲數',
      hashSince:'生日：24/06/2025',
      potatoTitle:'馬鈴薯天數歲數',
      potatoSince:'生日：27/07/2025',
      tzNote:'根據澳洲時間 UTC+10 (AEST) ❄️',
      viewAbout:'查看 About',
      close:'關閉',
      cards:{
        couple:{head:'關係',meta:'起始日 07/08/2025',body:'我們生活在不同地點（澳洲 / 台灣），都是泛性戀 🩷💛🩵。更多背景與日常請見 <a href="/zh-hant/about/">關於我</a>。',link:'/zh-hant/about/'},
        hash:{head:'薯餅（Hash Brown）',meta:'生日 24/06/2025',body:'純種泰迪天竺鼠。活潑好奇，喜歡探索新躲避屋。名字靈感：<a href="https://mcdonalds.com.hk/product/hash-browns/" target="_blank" rel="noopener">麥當勞脆薯餅</a>。更多見 <a href="/zh-hant/about/">關於我</a>。',link:'/zh-hant/about/'},
        potato:{head:'馬鈴薯（Potato）',meta:'生日 27/07/2025',body:'純種泰迪天竺鼠，性格溫和，與薯餅一起成長。更多介紹見 <a href="/zh-hant/about/">關於我</a>。',link:'/zh-hant/about/'}
      }
    },
    en:{
      coupleTitle:'Days Together',
      since:'Since 07/08/2025',
      hashTitle:'Hash Brown Age (days)',
      hashSince:'Birthday: 24/06/2025',
      potatoTitle:'Potato Age (days)',
      potatoSince:'Birthday: 27/07/2025',
      tzNote:'Based on Australia time UTC+10 (AEST) ❄️',
      viewAbout:'View About',
      close:'Close',
      cards:{
        couple:{head:'Relationship',meta:'Started 07/08/2025',body:'Pansexual (Australia / Taiwan). More on the <a href="/about/">About page</a>.',link:'/about/'},
        hash:{head:'Hash Brown',meta:'Birthday 24/06/2025',body:'Purebred Teddy guinea pig. Name from <a href="https://mcdonalds.com.hk/en/product/hash-browns/" target="_blank" rel="noopener">McDonald’s Hash Browns</a>. See <a href="/about/">About page</a>.',link:'/about/'},
        potato:{head:'Potato',meta:'Birthday 27/07/2025',body:'Purebred Teddy guinea pig growing with Hash Brown. See <a href="/about/">About page</a>.',link:'/about/'}
      }
    }
  };
  const D=lang.startsWith('zh')?dicts.zh:dicts.en;

  /* 文案注入 */
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.getAttribute('data-i18n');
    if(D[k]) el.textContent=D[k];
  });

  /* AEST 天數計算 (inclusive) */
  const TZ=10, MS_DAY=86400000;
  const parseDMY=s=>{
    const parts=s.split('/');
    if(parts.length!==3) return null;
    const [d,m,y]=parts.map(Number);
    if(!d||!m||!y) return null;
    return {d,m,y};
  };
  const makeAEST=(y,m,d)=>new Date(Date.UTC(y,m-1,d,10,0,0)); // 固定 +10h anchor
  const inclusiveDays=s=>{
    const o=parseDMY(s); if(!o) return 0;
    const start=makeAEST(o.y,o.m,o.d);
    const nowAEST=new Date(Date.now()+TZ*3600*1000);
    const today=makeAEST(nowAEST.getUTCFullYear(),nowAEST.getUTCMonth()+1,nowAEST.getUTCDate());
    const diff=Math.floor((today-start)/MS_DAY);
    if(diff<0) return 0;
    return diff+1;
  };
  const setNum=(id,date)=> {
    const el=document.getElementById(id);
    if(el){ try{ el.textContent=inclusiveDays(date).toLocaleString(); }catch{ el.textContent='0'; } }
  };
  setNum('togetherDays','07/08/2025');
  setNum('hashDays','24/06/2025');
  setNum('potatoDays','27/07/2025');

  /* Modal */
  let backdrop,modal,lastFocus;
  function buildModal(){
    if(backdrop) return;
    backdrop=document.createElement('div');
    backdrop.className='tl-modal-backdrop';
    backdrop.innerHTML=`<div class="tl-modal" role="dialog" aria-modal="true" aria-labelledby="tlModalTitle">
      <button class="tl-close" type="button" aria-label="${D.close}">✕</button>
      <h2 id="tlModalTitle"></h2>
      <p class="tl-meta"></p>
      <div class="tl-body"></div>
      <div class="tl-actions">
        <a class="tl-btn tl-about" href="#" rel="noopener">${D.viewAbout}</a>
        <button type="button" class="tl-btn tl-close-btn">${D.close}</button>
      </div>
    </div>`;
    document.body.appendChild(backdrop);
    modal=backdrop.querySelector('.tl-modal');
    backdrop.addEventListener('click',e=>{if(e.target===backdrop) closeModal();});
    backdrop.querySelector('.tl-close').addEventListener('click',closeModal);
    backdrop.querySelector('.tl-close-btn').addEventListener('click',closeModal);
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape') closeModal();
      if(e.key==='Tab' && backdrop.classList.contains('open')) trapFocus(e);
    });
  }
  function openModal(key){
    const data=D.cards[key];
    if(!data) return;
    buildModal();
    lastFocus=document.activeElement;
    modal.querySelector('#tlModalTitle').innerHTML=data.head;
    modal.querySelector('.tl-meta').textContent=data.meta;
    modal.querySelector('.tl-body').innerHTML=data.body;
    modal.querySelector('.tl-about').href=data.link;
    backdrop.classList.add('open');
    setTimeout(()=>modal.querySelector('.tl-close').focus(),20);
  }
  function closeModal(){
    if(!backdrop) return;
    backdrop.classList.remove('open');
    if(lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function trapFocus(e){
    const f=modal.querySelectorAll('a[href],button:not([disabled])');
    if(!f.length) return;
    const first=f[0], last=f[f.length-1];
    if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
  }
  document.querySelectorAll('.tl-card.tl-open').forEach(card=>{
    card.addEventListener('click',()=>openModal(card.dataset.key));
    card.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){
        e.preventDefault();
        openModal(card.dataset.key);
      }
    });
  });
})();
</script>
    });
    backdrop.querySelectorAll('.tl-close,.tl-close-btn').forEach(btn=>{
      btn.addEventListener('click',closeModal);
    });
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape') closeModal();
      if(e.key==='Tab' && backdrop.classList.contains('open')){
        trapFocus(e);
      }
    });
  };
  const openModal=key=>{
    buildModal();
    const data=dict.cards[key];
    if(!data) return;
    lastFocus=document.activeElement;
    modal.querySelector('#tlModalTitle').innerHTML=data.head;
    modal.querySelector('.tl-meta').textContent=data.meta;
    modal.querySelector('.tl-body').innerHTML=data.body;
    const aboutLink=modal.querySelector('.tl-about');
    aboutLink.setAttribute('href',data.link);
    backdrop.classList.add('open');
    setTimeout(()=>modal.querySelector('.tl-close').focus(),10);
  };
  const closeModal=()=>{
    if(!backdrop) return;
    backdrop.classList.remove('open');
    if(lastFocus && typeof lastFocus.focus==='function') lastFocus.focus();
  };
  const trapFocus=e=>{
    const focusables=modal.querySelectorAll('a[href],button:not([disabled])');
    if(!focusables.length) return;
    const first=focusables[0], last=focusables[focusables.length-1];
    if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
  };

  /* 綁定卡片 */
  document.querySelectorAll('.tl-openable').forEach(card=>{
    card.addEventListener('click',()=>openModal(card.dataset.key));
    card.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' ') {e.preventDefault();openModal(card.dataset.key);}
    });
  });

})();
</script>
<!-- 確保圖檔存在: /static/images/timeline/f-avatar.webp hashbrown.webp potato.webp -->
