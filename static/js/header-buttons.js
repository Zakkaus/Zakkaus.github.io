(function(){
  if (window.__HB_INIT__) return; window.__HB_INIT__ = true;

  const LABELS = {
    en: {home:"Home", posts:"Posts", about:"About", search:"Search"},
    "zh-hant": {home:"首頁", posts:"文章", about:"關於我", search:"搜尋"}
  };

  function detectLang(){
    if (location.pathname.startsWith("/zh-hant/")) return "zh-hant";
    const htmlLang = (document.documentElement.lang || "").toLowerCase();
    if (htmlLang.startsWith("zh")) return "zh-hant";
    return "en";
  }
  function prefix(lang){
    return lang === "zh-hant" ? "/zh-hant" : "";
  }

  function ensureCSS(){
    if (document.querySelector('link[href*="header-buttons.css"]')) return;
    const l = document.createElement('link');
    l.rel = "stylesheet";
    l.href = "/css/header-buttons.css";
    document.head.appendChild(l);
  }

  function build(lang){
    const L = LABELS[lang] || LABELS.en;
    const p = prefix(lang);
    const wrap = document.createElement("div");
    wrap.className = "custom-topbuttons";
    wrap.innerHTML = `
      <button class="cb-toggle" aria-label="Toggle menu">☰</button>
      <nav class="cb-menu" aria-hidden="true">
        <a href="${p || '/'}" class="cb-btn" data-name="home">🏠 ${L.home}</a>
        <a href="${p}/posts/" class="cb-btn" data-name="posts">📚 ${L.posts}</a>
        <a href="${p}/about/" class="cb-btn" data-name="about">👤 ${L.about}</a>
        <a href="${p}/search/" class="cb-btn" data-name="search">🔍 ${L.search}</a>
      </nav>`;
    return wrap;
  }

  function highlight(container){
    const current = location.pathname.endsWith('/') ? location.pathname : location.pathname + '/';
    container.querySelectorAll('a.cb-btn').forEach(a=>{
      try{
        const u = new URL(a.href, location.origin).pathname;
        const norm = u.endsWith('/') ? u : u + '/';
        if (norm === current) a.classList.add('active');
      }catch(e){}
      a.addEventListener('click', ()=>{
        container.querySelectorAll('a.cb-btn').forEach(x=>x.classList.remove('active'));
        a.classList.add('active');
      });
    });
  }

  function addMobile(container){
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
    if (document.querySelector('.custom-topbuttons')) return;
    ensureCSS();
    const lang = detectLang();
    const el = build(lang);
    const header = document.querySelector('header.header, header.site-header, header');
    if (header){
      if (getComputedStyle(header).position === 'static') header.style.position = 'relative';
      el.style.position = 'absolute';
      // 盡量避開語言切換器
      const langSwitch = header.querySelector('.lang, .language, .i18n, .language-switcher, [data-language]');
      el.style.top = langSwitch ? '56px' : '12px';
      el.style.right = '12px';
      header.appendChild(el);
    } else {
      el.classList.add('fallback-fixed');
      document.body.appendChild(el);
    }
    highlight(el);
    addMobile(el);
  }

  function init(){
    if (document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', mount);
    } else {
      mount();
    }
  }

  try { init(); } catch(e){ console.error("header-buttons init error", e); }
})();
})();
