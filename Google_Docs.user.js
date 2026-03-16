// ==UserScript==
// @name         Google Docs Dark Theme
// @namespace    SkyColtNinja/userscripts
// @version      1.0.0
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
        body {
            color: #ffffff !important;
            background-color: #051626 !important;
        }
        p, p, h1, h2, h3, h4, h5, h6 {
            color: #ffffff !important;
        }
    `);

})();
