// ==UserScript==
// @name         Markdown Viewer Enhancements
// @namespace    SkyColtNinja/userscripts
// @version      1.0.2
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Markdown_Viewer.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Markdown_Viewer.user.js
// @author       SkyColtNinja
// @match        file:///*
// @match        https://firefox.localhost/*
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @connect      *
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    GM_xmlhttpRequest({
        method: 'GET',
        url: 'file:///Users/jinks908/themes/skycoltninja_markdown.css',
        onload: (res) => GM_addStyle(res.responseText)
    });

    const head = document.head || document.getElementsByTagName('head')[0];
    // Link custom CSS file to the document head
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'file:///Users/jinks908/themes/skycoltninja_markdown.css';
    head.appendChild(link);

    /*
     * Styling the <html> element rather than the TOC container directly means the rule
     * survives Markdown Viewer swapping out the body - no MutationObserver needed, since
     * GM_addStyle injects into <head> and the class sits above anything the extension replaces.
    **/
    GM_addStyle(`
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');
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
