// ==UserScript==
// @name         Coolors.co Theme
// @namespace    SkyColtNinja/userscripts
// @version      1.0.0
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Coolors_Theme.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Coolors_Theme.user.js
// @description  Dark theme for Coolors.co
// @author       SkyColtNinja
// @match        https://coolors.co/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
        [style*="color: #0a0a0a"],
        [style*="color:#0a0a0a"],
        [style*="color: var(--color-smart-neutral-950)"],
        [style*="color:var(--color-smart-neutral-950)"],
        #explore-palettes_megasearch_input-container input[style*="color: var(--text-color)"],
        #explore-palettes_megasearch_input-container input[style*="color:var(--text-color)"] {
            color: #4da0ff !important;
        }
        #explore-palettes_results-container,
        #explore-palettes_inner,
        #explore-palettes_megasearch,
        #header,
        #megamenu {
            background-color: #001122 !important;
            color: #4da0ff !important;
        }
        #explore-palettes_megasearch_top,
        #explore-palettes_megasearch_input-container,
        #explore-palettes_megasearch_input-container span,
        #explore-palettes_megasearch_input-container a {
            background-color: #172741 !important;
            color: #4da0ff !important;
        }
        h1,
        .btn--transparent,
        #explore-palettes_megasearch_input-container input,
        #explore-palettes_megasearch_input-container input[type="text"],
        .new-page-title > div:first-child div:last-of-type {
            color: #4da0ff !important;
        }
        a[style*="background:var(--popover-bg)"],
        a[style*="background: var(--popover-bg)"] {
            display: none !important;
            z-index: -999 !important;
        }
    `)

})();
