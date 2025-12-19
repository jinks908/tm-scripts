// ==UserScript==
// @name         Color Picker Dark Theme
// @namespace    SkyColtNinja/userscripts
// @version      1.0.0
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/Color_Picker.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/Color_Picker.user.js
// @description  Dark theme for color picker which preserves the color palettes
// @author       SkyColtNinja
// @match        https://htmlcolorcodes.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle('.bg-white {background-color: #101628 !important;}');

})();
