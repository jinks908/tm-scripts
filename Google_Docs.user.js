// ==UserScript==
// @name         Google Docs Dark Theme
// @namespace    SkyColtNinja/userscripts
// @version      1.0.1
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Google_Docs.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Google_Docs.user.js
// @description  Dark theme for Google Docs editor
// @author       SkyColtNinja
// @match        https://docs.google.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {

    GM_addStyle(`
        .kix-page-content-block, .kix-canvas-tile-contentEditor
        .docs-texteventtarget-iframe, #docs-editor {
            color: #ffffff !important;
            background-color: #051626 !important;
        }
    `);

})();
