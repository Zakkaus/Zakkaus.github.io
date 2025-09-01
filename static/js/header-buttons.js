(function(){
  function addCSS(){
    if(document.getElementById('custom-topbuttons-css')) return;
    const l = document.createElement('link');
    l.id='custom-topbuttons-css';
    l.rel='stylesheet';
    l.href='/css/header-buttons.css';
    document.head.appendChild(l);
  }
  function createButtons(){
    if(document.querySelector('.custom-topbuttons')) return;
    const container = document.createElement('div');
    container.className = 'custom-topbuttons';
    container.innerHTML = `
      <a href="/" class="cb-btn" data-name="home">首頁</a>
      <a href="/posts/" class="cb-btn" data-name="posts">文章</a>
      <a href="/about/" class="cb-btn" data-name="about">關於我</a>
      <a href="/search/" class="cb-btn" data-name="search">🔍 搜尋</a>
    `;
    document.body.appendChild(container);
    // highlight active
    const path = (location.pathname.endsWith('/') ? location.pathname : location.pathname + '/');
    const els = container.querySelectorAll('a.cb-btn');
    els.forEach(a=>{
      if(path === a.getAttribute('href')) a.classList.add('active');
      a.addEventListener('click', ()=> {
        els.forEach(x=>x.classList.remove('active'));
        a.classList.add('active');
      });
    });
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ()=>{
      addCSS(); createButtons();
    });
  } else {
    addCSS(); createButtons();
  }
})();
