// ==UserScript==
// @name         Vim Colorschemes Styles
// @namespace    SkyColtNinja/userscripts
// @version      1.0.0
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/VimThemes.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/VimThemes.user.js
// @description  Font and Styles for Vim Colorschemes
// @author       SkyColtNinja
// @match        https://vimcolorschemes.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
        div.index-module__nCnU7W__content {
            font-family: 'Victor Mono', monospace !important;
        }
    `);

})();
