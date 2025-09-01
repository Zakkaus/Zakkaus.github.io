若仍出現外露字串：
`()(); const target = nowDark ? 'light':'dark'; apply(target); ...`
請執行：
1. grep -R "nowDark ? 'light'" ./layouts ./themes
2. grep -R "toggleTheme" ./layouts ./themes
3. 檢查 layouts/_default/baseof.html / footer.html 是否又包含舊版 header 片段或殘缺 <script>.
4. 清除瀏覽器與 Service Worker 快取。
本檔僅供維護人員參考，可刪除。
