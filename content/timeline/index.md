---
title: "Days"
slug: "timeline"
toc: false
date: 2025-09-01
lastmod: 2025-09-01
---

<div class="days-page">
  <div class="days-cards">
    <div class="d-card couple">
      <img src="/girlfriend-avatar.jpg" alt="Avatar" class="avatar">
      <div class="d-content">
        <h3 data-i18n="coupleTitle">我們在一起的天數</h3>
        <p class="d-num" id="togetherDays">--</p>
        <p class="d-start" data-i18n="since">自 07/08/2025 起</p>
      </div>
    </div>
    <div class="d-card pet">
      <img src="/hashbrown.jpg" alt="薯餅" class="pet-img">
      <div class="d-content">
        <h3 data-i18n="hashTitle">薯餅天數歲數</h3>
        <p class="d-num" id="hashDays">--</p>
        <p class="d-start" data-i18n="hashSince">生日：24/06/2025</p>
      </div>
    </div>
    <div class="d-card pet">
      <img src="/potato.jpg" alt="馬鈴薯" class="pet-img">
      <div class="d-content">
        <h3 data-i18n="potatoTitle">馬鈴薯天數歲數</h3>
        <p class="d-num" id="potatoDays">--</p>
        <p class="d-start" data-i18n="potatoSince">生日：27/07/2025</p>
      </div>
    </div>
  </div>
</div>

<style>
.days-page{
  max-width:980px;
  margin:0 auto;
  padding:1.2rem 0 2.5rem;
  font-size:1rem;
  line-height:1.55;
}
.days-cards{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
  gap:1.4rem;
}
.d-card{
  position:relative;
  padding:1.1rem 1.05rem 1.2rem;
  border:1px solid rgba(0,0,0,.1);
  border-radius:18px;
  background:rgba(255,255,255,.82);
  backdrop-filter:blur(6px);
  display:flex;
  gap:.95rem;
  align-items:center;
  overflow:hidden;
  transition:background .28s,border-color .28s,transform .25s,box-shadow .28s;
}
body.dark .d-card{
  border-color:rgba(255,255,255,.16);
  background:rgba(42,42,46,.78);
}
.d-card:hover{
  transform:translateY(-4px);
  box-shadow:0 10px 28px -10px rgba(0,0,0,.28);
  border-color:var(--hb-active,#e1306c);
  background:rgba(255,255,255,.95);
}
body.dark .d-card:hover{
  background:rgba(58,58,64,.9);
  box-shadow:0 14px 34px -14px rgba(0,0,0,.65);
}
.d-card img.avatar,
.d-card img.pet-img{
  width:70px;
  height:70px;
  object-fit:cover;
  border-radius:16px;
  flex:0 0 70px;
  box-shadow:0 4px 14px -6px rgba(0,0,0,.3);
  border:2px solid rgba(255,255,255,.85);
}
body.dark .d-card img.avatar,
body.dark .d-card img.pet-img{
  border-color:rgba(255,255,255,.25);
}
.d-content h3{
  margin:.1rem 0 .4rem;
  font-size:.9rem;
  letter-spacing:.5px;
  font-weight:600;
  color:var(--hb-active,#e1306c);
}
body.dark .d-content h3{color:#ff81af;}
.d-num{
  font-size:2.2rem;
  font-weight:700;
  margin:0 0 .25rem;
  letter-spacing:1px;
  line-height:1.05;
  background:linear-gradient(90deg,var(--hb-active,#e1306c),#ff7aa5);
  -webkit-background-clip:text;
  color:transparent;
}
body.dark .d-num{
  background:linear-gradient(90deg,#ff8fb8,#ffa7c9);
  -webkit-background-clip:text;
  color:transparent;
}
.d-start{
  margin:0;
  font-size:.65rem;
  letter-spacing:.4px;
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
      potatoSince:'生日：27/07/2025'
    },
    en:{
      coupleTitle:'Days Together',
      since:'Since 07/08/2025',
      hashTitle:'Hash Brown Age (days)',
      hashSince:'Birthday: 24/06/2025',
      potatoTitle:'Potato Age (days)',
      potatoSince:'Birthday: 27/07/2025'
    }
  };
  const dict=lang.startsWith('zh')?t.zh:t.en;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.getAttribute('data-i18n');
    if(dict[k]) el.textContent=dict[k];
  });
  const oneDay=86400000;
  const inclusiveDays=(startStr)=>{
    const [d,m,y]=startStr.split('/').map(Number);
    const start=new Date(y,m-1,d);
    const today=new Date();
    // 只比較日期，不受時間影響
    const utcStart=Date.UTC(start.getFullYear(),start.getMonth(),start.getDate());
    const utcToday=Date.UTC(today.getFullYear(),today.getMonth(),today.getDate());
    return Math.floor((utcToday-utcStart)/oneDay)+1;
  };
  const set=(id,start)=> {
    const el=document.getElementById(id);
    if(el) el.textContent=inclusiveDays(start).toLocaleString();
  };
  set('togetherDays','07/08/2025');
  set('hashDays','24/06/2025');
  set('potatoDays','27/07/2025');
})();
</script>

> 備註：請將 /girlfriend-avatar.jpg、/hashbrown.jpg、/potato.jpg 換成實際檔案名稱。
