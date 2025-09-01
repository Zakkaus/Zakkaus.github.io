if (window.__THEME_TOGGLE_INIT) { /* 已初始化避免重複注入 */ }
else {
  window.__THEME_TOGGLE_INIT = true;
  function initThemeToggle(){
    const root = document.documentElement;
    const body = document.body;
    const isZH = (root.lang || '').toLowerCase().startsWith('zh');
    const KEY = 'site-theme';
    const btnDesktop = document.getElementById('themeToggle');
    const btnMobile  = document.getElementById('themeToggleMobile');

    function sysPref(){ return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark':'light'; }

    function labelFor(next){
      if(isZH) return next==='dark' ? '🌓 黑暗' : '🌞 明亮';
      return next==='dark' ? '🌓 Dark Mode' : '🌞 Light Mode';
    }

    function updateLabels(current){
      const next = current==='dark' ? 'light':'dark';
      const txt = labelFor(next);
      if(btnDesktop) btnDesktop.textContent = txt;
      if(btnMobile)  btnMobile.textContent  = txt;
    }

    function apply(mode){
      const dark = mode==='dark';
      root.classList.toggle('dark', dark);
      body.classList.toggle('dark', dark);
      updateLabels(mode);
    }

    function toggle(){
      apply(root.classList.contains('dark') ? 'light':'dark');
      localStorage.setItem(KEY, root.classList.contains('dark') ? 'dark':'light');
    }

    apply(localStorage.getItem(KEY) || sysPref());
    if(btnDesktop) btnDesktop.addEventListener('click', toggle);
    if(btnMobile)  btnMobile.addEventListener('click', toggle);

    addEventListener('resize', () => {
      if(innerWidth > 900){
        const m = document.getElementById('mobileMenu');
        if(m) m.classList.remove('open');
      }
    });
  }

  if(document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', initThemeToggle);
  else
    initThemeToggle();
}
  });
});
