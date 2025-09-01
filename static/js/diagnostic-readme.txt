若非首頁仍出現外露：
`)(); const target = nowDark ? 'light':'dark'; apply(target); ...`

永久排查：
1. grep -R "nowDark ? 'light'" ./layouts ./themes
2. grep -R "const target = nowDark" ./layouts ./themes
3. grep -R "m.classList.remove('open')" ./layouts ./themes
4. 若使用 theme (themes/PaperMod 或 fork)，檢查 theme 的 partials/header.html 是否仍舊版被 baseof.html 引入
5. 搜尋 baseof.html 是否同時 {{ partial "header.html" . }} 又含舊 inline script
6. 查看 public/zh-hant/index.html 直接檢查輸出有幾段 <script>（應只有 2 段：主題 + 清理）
7. 清快取: hugo --ignoreCache && 瀏覽器 Ctrl+F5；若有 SW：Application → Unregister
8. CDN 或反向代理是否長時間快取 header (加 ?v=4 測試)

暫時保底：
- header 內已加強化清理 (MutationObserver + 多輪計時)
- 可以刪除此檔案；僅維護說明


若仍出現外露：
  nowDark ? 'light':'dark'
  m.classList.remove('open')
  const target = nowDark
  }); })();

排查：
1. grep -R "}); })();" ./layouts ./themes
2. grep -R "m.classList.remove('open')" ./layouts ./themes
3. grep -R "const target = nowDark" ./layouts ./themes
4. baseof.html / 其它 partial 是否殘留舊 inline script (特別是 theme 目錄)
5. 確認 public/ 某子頁輸出只有一次 <script> (主題 + 清理)
6. hugo serve --ignoreCache -D 強制重建；清瀏覽器 + SW

前端已加：
- header 內多輪 sweep + MutationObserver 清理
- footer 去重
