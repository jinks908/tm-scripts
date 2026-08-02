// ==UserScript==
// @name         MPV Documentation Styles
// @namespace    SkyColtNinja/userscripts
// @version      1.0.0
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

    GM_addStyle(`
        div#banner {
            display: none !important;
        }
    `);

})();
