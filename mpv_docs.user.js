// ==UserScript==
// @name         MPV Documentation Styles
// @namespace    SkyColtNinja/userscripts
// @version      1.1.1
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/mpv_docs.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/mpv_docs.user.js
// @description  Enhanced styles for MPV Documentation Dark Mode
// @author       Clayton Jinks
// @match        https://mpv-player-mpv.mintlify.app/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Tailwind v4 routes every text-* utility through these variables,
    // so overriding them scales all type without touching rem-based layout.
    GM_addStyle(`
        :root {
            --text-xs:   1rem;
            --text-sm:   1rem;
            --text-base: 1.125rem;
            --text-lg:   1.25rem;
            --text-xl:   1.375rem;
            --text-2xl:  1.625rem;
            --text-3xl:  2rem;
            --text-4xl:  2.375rem;
            --text-5xl:  3.125rem;
        }
        @layer components {
            .prose {
                font-size: var(--text-base);
            }
        }
        @layer utilities {
            .leading-6 {
                /* 1.6rem  */
                line-height: calc(var(--spacing)*6.5);
            }
        }
        @layer components {
            .prose :where(table):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
                font-size: var(--text-xs);
                line-height: calc(var(--text-xs)*1.25);
            }
        }
        @layer components {
            .prose :where(tbody code):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
                font-size: var(--text-xs);
            }
        }
        /* Hide annoying white banner at the top of the page */
        header#navbar div#banner {
            opacity: 0 !important;
        }
    `);

    // Function to toggle the left sidebar
    function toggleSidebar() {
        const sidebarBtn = document.querySelector('nav#sidebar-content button.absolute');
        if (sidebarBtn) {
            sidebarBtn.click();
        }
    }

    // Toggle sidebar with Ctrl+\
    document.addEventListener('keydown', function(e) {
        // Don't trigger if the user is typing in an input or textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.ctrlKey && e.key === '\\') {
            e.preventDefault();
            toggleSidebar();
        }
    });

})();
