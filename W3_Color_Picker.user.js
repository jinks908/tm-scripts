// ==UserScript==
// @name         Color Picker Dark Theme (For W3 Schools)
// @namespace    SkyColtNinja/userscripts
// @version      1.0.0
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/W3_Color_Picker.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/W3_Color_Picker.user.js
// @description  Dark theme for color picker which preserves the color palettes
// @author       SkyColtNinja
// @match        https://*w3schools.com/colors/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
        .w3-white, [style*="color:#000 !important"], [style*="color: #000 !important"] {
            color: #ffffff !important;
        }
        .w3-white, [style*="background-color:#fff !important"], [style*="background-color: #fff !important"] {
            color: #000000 !important;
        }
    `);

})();
