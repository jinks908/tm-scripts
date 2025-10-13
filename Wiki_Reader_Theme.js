// ==UserScript==
// @name         Wiki Reader Theme
// @namespace    http://tampermonkey.net/
// @version      2024-01-27
// @description  A distraction-free reading theme for Wikipedia.
// @author       skycoltninja
// @match        https://en.wikipedia.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wikipedia.org
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    /* Hide Wikipedia hyperlinks */
    GM_addStyle('#mw-content-text.mw-body-content div.mw-content-ltr.mw-parser-output a {color: #202122 !important; text-decoration: none !important;}');

})();
