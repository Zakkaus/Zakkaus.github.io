(function(){
  try {
    const CSS_HREF = '/css/header-buttons.css';
    const ID_LINK = 'custom-topbuttons-css';

    function ensureCSS(){
      if(document.getElementById(ID_LINK)) return;
      const l = document.createElement('link');
      l.id = ID_LINK;
      l.rel = 'stylesheet';
      l.href = CSS_HREF;
      document.head.appendChild(l);
    }

    function createButtons(){
      if(document.querySelector('.custom-topbuttons')) return;

      const container = document.createElement('div');
      container.className = 'custom-topbuttons';
      container.setAttribute('aria-hidden', 'false');

      container.innerHTML = [
        '<button class="cb-toggle" aria-label="Toggle menu">☰</button>',
        '<nav class="cb-menu" aria-hidden="true">',
          '<a href="/" class="cb-btn" data-name="home">🏠 首頁</a>',
          '<a href="/posts/" class="cb-btn" data-name="posts">📚 文章</a>',
          '<a href="/about/" class="cb-btn" data-name="about">👤 關於我</a>',
          '<a href="/search/" class="cb-btn" data-name="search">🔍 搜尋</a>',
        '</nav>'
      ].join('');

      // Insert into header if exists (prefer), else body fixed
      const header = document.querySelector('header, .site-header, .topbar, .header');
      if(header){
        // avoid breaking header layout
        if(getComputedStyle(header).position === 'static') header.style.position = 'relative';

        // detect language / locale buttons inside header to offset
        const langEl = header.querySelector('[data-language], .lang, .language, .i18n, .locale, .locale-switcher, .language-switcher');
        const topOffset = langEl ? 56 : 12; // px
        container.style.position = 'absolute';
        container.style.top = topOffset + 'px';
        container.style.right = '12px';
        container.style.zIndex = '9999';
        header.appendChild(container);
      } else {
        container.style.position = 'fixed';
        container.style.top = '12px';
        container.style.right = '12px';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
      }

      const toggle = container.querySelector('.cb-toggle');
      const menu = container.querySelector('.cb-menu');

      // highlight active link
      const path = location.pathname.endsWith('/') ? location.pathname : location.pathname + '/';
      container.querySelectorAll('a.cb-btn').forEach(a=>{
        try{ if(path === a.getAttribute('href')) a.classList.add('active'); }catch(e){}
        a.addEventListener('click', ()=> {
          container.querySelectorAll('a.cb-btn').forEach(x=>x.classList.remove('active'));
          a.classList.add('active');
          // close menu on mobile after click
          menu.classList.remove('open');
          toggle.classList.remove('open');
          menu.setAttribute('aria-hidden', 'true');
        });
      });

      // toggle for mobile
      toggle.addEventListener('click', (ev)=>{
        ev.stopPropagation();
        const isOpen = menu.classList.toggle('open');
        toggle.classList.toggle('open', isOpen);
        menu.setAttribute('aria-hidden', !isOpen);
      });

      // close when clicking outside
      document.addEventListener('click', (ev)=>{
        if(!container.contains(ev.target)){
          menu.classList.remove('open');
          toggle.classList.remove('open');
          menu.setAttribute('aria-hidden', 'true');
        }
      });
    }

    function init(){
      ensureCSS();
      // defer to idle so theme can load first
      if('requestIdleCallback' in window){
        requestIdleCallback(createButtons, {timeout:500});
      } else {
        setTimeout(createButtons, 300);
      }
    }

    if(document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  } catch (err) {
    // never break site
    console.error('header-buttons error', err);
  }
})();
