---
title: "Search"
---

<div class="search-page">
  <input id="site-search" placeholder="搜尋文章..." autofocus />
  <div id="search-results"></div>
</div>

<script>
(async function(){
  try{
    const res = await fetch('/index.json');
    if(!res.ok) throw new Error('index.json not found');
    const data = await res.json();
    const input = document.getElementById('site-search');
    const results = document.getElementById('search-results');

    function render(items){
      if(!items.length){ results.innerHTML = '<p>沒有搜尋結果</p>'; return; }
      results.innerHTML = items.map(i=>`<div class="result"><a href="${i.url}"><h3>${i.title}</h3></a><p>${i.summary}</p></div>`).join('');
    }

    input.addEventListener('input', e=>{
      const q = e.target.value.trim().toLowerCase();
      if(!q){ results.innerHTML = ''; return; }
      const filtered = data.filter(d=>{
        return (d.title && d.title.toLowerCase().includes(q))
          || (d.content && d.content.toLowerCase().includes(q))
          || (d.summary && d.summary.toLowerCase().includes(q));
      }).slice(0, 30);
      render(filtered);
    });
  } catch(err) {
    document.getElementById('search-results').innerHTML = '<p>無法載入搜尋索引</p>';
    console.error(err);
  }
})();
</script>
