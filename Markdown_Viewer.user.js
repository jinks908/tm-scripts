// ==UserScript==
// @name         Markdown Viewer Enhancements
// @namespace    SkyColtNinja/userscripts
// @version      1.0.1
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

    /*
     * Styling the <html> element rather than the TOC container directly means the rule
     * survives Markdown Viewer swapping out the body - no MutationObserver needed, since
     * GM_addStyle injects into <head> and the class sits above anything the extension replaces.
    **/
    GM_addStyle(`
        html._toc-off .markdown-theme,
        html._toc-off ._width-wide,
        html._toc-off ._width-large,
        html._toc-off ._width-medium,
        html._toc-off ._width-small,
        html._toc-off ._width-tiny {
          width: 100% !important;
        }
        html._toc-off body._toc-left {
          padding-left: 0 !important;
        }
        html._toc-off #_toc {
          display: none !important;
        }
    `);

    // Check sidebar visibility on initial page load
    if (GM_getValue('tocOff', false)) {
        document.documentElement.classList.add('_toc-off');
    }

    // Toggle TOC sidebar with Ctrl + \
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === '\\') {
            e.preventDefault();
            const off = document.documentElement.classList.toggle('_toc-off');
            GM_setValue('tocOff', off);
        }
    });

})();
