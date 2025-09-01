---
title: "搜尋"
---

<input id="site-search" placeholder="搜尋..." autofocus />
<div id="search-results"></div>

<script>
(async()=>{
  try{
    const data = await fetch('/index.json').then(r=>r.json());
    const input = document.getElementById('site-search');
    const out = document.getElementById('search-results');
    function render(list){
      out.innerHTML = list.map(p=>`<div><a href="${p.url}"><strong>${p.title}</strong></a><p>${p.summary}</p></div>`).join('') || '<p>沒有結果</p>';
    }
    input.addEventListener('input', e=>{
      const q = e.target.value.trim().toLowerCase();
      if(!q){ out.innerHTML=''; return; }
      render(data.filter(p=> (p.title||'').toLowerCase().includes(q) || (p.content||'').toLowerCase().includes(q)).slice(0,40));
    });
  }catch(e){ console.error(e); }
})();
</script>
