// ==UserScript==
// @name         Markdown Viewer Enhancements
// @namespace    SkyColtNinja/userscripts
// @version      1.0.0
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Markdown_Viewer.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Markdown_Viewer.user.js
// @author       SkyColtNinja
// @match        file:///*
// @match        https://firefox.localhost/*
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    let sidebarVisible = true;

    GM_addStyle(`
        html._toc-off .markdown-theme,
        html._toc-off ._width-wide,
        html._toc-off ._width-large,
        html._toc-off ._width-medium,
        html._toc-off ._width-small,
        html._toc-off ._width-tiny {
          width: 100% !important;
        }
        html._toc-off body._theme-custom._toc-left {
          padding-left: 0 !important;
        }
        html._toc-off #_toc {
          display: none !important;
        }
    `);

    function toggleSidebar() {
        if (sidebarVisible) {
            document.documentElement.classList.add('_toc-off');
            sidebarVisible = false;
        } else {
            document.documentElement.classList.toggle('_toc-off');
        }
    }

    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === '\\') {
            e.preventDefault();
            toggleSidebar();
        };
    });

})();
