若仍出現外露字串：
`()(); const target = nowDark ? 'light':'dark'; apply(target); ...`

排查：
1. grep -R "nowDark ? 'light'" ./layouts ./themes
2. grep -R "toggleTheme" ./layouts ./themes
3. grep -R "apply(target)" ./layouts ./themes
4. 檢查 layouts/_default/baseof.html 與任何 footer / extra partial 是否嵌入舊 header 片段
5. 清除快取：hugo serve --ignoreCache -D
6. 停用/更新 Service Worker 或 CDN
7. 確認最終輸出 public/ 對應頁面只出現一次 header.html

前端自動清理：/js/stray-cleanup.js 已三次掃描（0/120/500ms）移除殘留。仍存在表示有新片段在 500ms 之後注入。

本檔僅供維護人員參考，可刪除。
