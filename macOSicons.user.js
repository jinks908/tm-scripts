// ==UserScript==
// @name         macOSicons
// @namespace    http://tampermonkey.net/
// @version      2024-02-25
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