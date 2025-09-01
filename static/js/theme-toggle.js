document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const body = document.body;
  const isZH = (root.lang || '').toLowerCase().startsWith('zh');
  const KEY = 'site-theme';
  const btnDesktop = document.getElementById('themeToggle');
  const btnMobile  = document.getElementById('themeToggleMobile');

  function sysPref() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function labelFor(nextMode) {
    if (isZH) {
      // 中文僅顯示下一目標狀態：黑暗 / 明亮
      return (nextMode === 'dark' ? '🌓 黑暗' : '🌞 明亮');
    }
    return (nextMode === 'dark' ? '🌓 Dark Mode' : '🌞 Light Mode');
  }

  function updateLabels(currentMode) {
    const next = currentMode === 'dark' ? 'light' : 'dark';
    const text = labelFor(next);
    if (btnDesktop) btnDesktop.textContent = text;
    if (btnMobile)  btnMobile.textContent  = text;
  }

  function apply(mode) {
    if (mode === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
    }
    updateLabels(mode);
  }

  function toggle() {
    const target = root.classList.contains('dark') ? 'light' : 'dark';
    apply(target);
    localStorage.setItem(KEY, target);
  }

  apply(localStorage.getItem(KEY) || sysPref());

  if (btnDesktop) btnDesktop.addEventListener('click', toggle);
  if (btnMobile)  btnMobile.addEventListener('click', toggle);

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      const m = document.getElementById('mobileMenu');
      if (m) m.classList.remove('open');
    }
  });
});
