(function(){
  if (window.__TOP_BTNS_INIT__) return; window.__TOP_BTNS_INIT__ = true;
  const LABELS = {
    en:   { home:"Home", posts:"Posts", about:"About", search:"Search" },
    "zh-hant": { home:"首頁", posts:"文章", about:"關於我", search:"搜尋" }
  };
  function langKey(){
    const raw = (document.documentElement.lang || "").toLowerCase();
    if (raw.startsWith("zh")) return "zh-hant";
    return "en";
  }
  function prefix(){
    return langKey()==="zh-hant" ? "/zh-hant" : "";
  }
  function ensureCSS(){
    if(document.querySelector('link[href*="header-buttons.css"]')) return;
    const l=document.createElement('link');
    l.rel="stylesheet"; l.href="/css/header-buttons.css";
    document.head.appendChild(l);
  }
  function buildContainer(){
    const lk = langKey();
    const L = LABELS[lk] || LABELS.en;
    const p = prefix();
    const c = document.createElement('div');
    c.className = "custom-topbuttons";
    c.innerHTML = `
      <button class="cb-toggle" aria-label="Toggle menu">☰</button>
      <nav class="cb-menu" aria-hidden="true">
        <a href="${p || '/'}" class="cb-btn" data-name="home">🏠 ${L.home}</a>
        <a href="${p}/posts/" class="cb-btn" data-name="posts">📚 ${L.posts}</a>
        <a href="${p}/about/" class="cb-btn" data-name="about">👤 ${L.about}</a>
        <a href="${p}/search/" class="cb-btn" data-name="search">🔍 ${L.search}</a>
      </nav>`;
    return c;
  }
  function highlightActive(container){
    const path = location.pathname.endsWith('/')? location.pathname : location.pathname + '/';
    container.querySelectorAll('a.cb-btn').forEach(a=>{
      try{
        const href = new URL(a.href, location.origin).pathname;
        const norm = href.endsWith('/')? href : href + '/';
        if (norm === path) a.classList.add('active');
      }catch(e){}
      a.addEventListener('click', ()=> {
        container.querySelectorAll('a.cb-btn').forEach(x=>x.classList.remove('active'));
        a.classList.add('active');
      });
    });
  }
  function addBehavior(container){
    const toggle = container.querySelector('.cb-toggle');
    const menu = container.querySelector('.cb-menu');
    toggle.addEventListener('click', e=>{
      e.stopPropagation();
      const open = menu.classList.toggle('open');
      toggle.classList.toggle('open', open);
      menu.setAttribute('aria-hidden', !open);
    });
    document.addEventListener('click', e=>{
      if(!container.contains(e.target)){
        menu.classList.remove('open');
        toggle.classList.remove('open');
        menu.setAttribute('aria-hidden', 'true');
      }
    });
  }
  function mount(){
    if(document.querySelector('.custom-topbuttons')) return;
    ensureCSS();
    const c = buildContainer();
    // Try insert inside existing header of PaperMod
    const header = document.querySelector('header.header, header.site-header, header');
    if(header){
      if(getComputedStyle(header).position==='static') header.style.position='relative';
      c.style.position="absolute";
      // 若 header 內有語言切換器，往下偏移
      const langSwitch = header.querySelector('.lang, .language, .i18n, .language-switcher, [data-language]');
      c.style.top = langSwitch ? '56px':'12px';
      c.style.right = '12px';
      c.style.zIndex = '9999';
      header.appendChild(c);
    } else {
      c.classList.add('fallback-fixed');
      document.body.appendChild(c);
    }
    highlightActive(c);
    addBehavior(c);
  }
  function init(){
    // 確保主題 DOM 大致載入後
    if(document.readyState === 'complete' || document.readyState === 'interactive'){
      mount();
    } else {
      document.addEventListener('DOMContentLoaded', mount);
    }
  }
  init();
})();
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  } catch (err) {
    // never break site
    console.error('header-buttons error', err);
  }
})();
