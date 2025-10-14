// ==UserScript==
// @name         Gutenberg Styles
// @namespace    http://tampermonkey.net/
// @version      2024-02-25
// @description  Hide annoying sticky banner
// @author       SkyColtNinja
// @match        www.gutenberg.org/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Main font/paragraph styles
    // Note: We may want different font-sizes for Macbook / iMac
    GM_addStyle('p {font-family: Cormorant !important; font-size: 32px !important; line-height: 45px !important; padding: 10px 30px 10px 30px !important; color: #cccccc !important;}');

    // Light theme colors (i.e., Dark Mode extension disabled)
    GM_addStyle('html, body {background-color: #0c1621 !important; color: #cccccc !important;}');
    GM_addStyle('h1, h2, h3, h4, h5, h6, section#pg-header {color: #cccccc !important;}');

    // Dark theme colors (i.e., Dark Mode extension enabled)
    // GM_addStyle('html, body {background-color: #1b1e1f !important;}');

})();
