// ==UserScript==
// @name         macOSicons
// @namespace    SkyColtNinja/userscripts
// @version      1.1.1
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/macOSicons.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/macOSicons.user.js
// @description  Hide annoying sticky banner
// @author       SkyColtNinja
// @match        https://macosicons.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Hide popup box at the bottom of the page
    var bottomBox = document.getElementById('stickyBanner');
    if (bottomBox) {
        bottomBox.style.display = "none";
    }

})();
