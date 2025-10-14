// ==UserScript==
// @name         All Poetry Theme
// @namespace    http://tampermonkey.net/
// @version      1.1.1
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/All_Poetry_Theme.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/All_Poetry_Theme.user.js
// @description  Correct transparent background for Dark Mode
// @author       SkyColtNinja
// @match        https://allpoetry.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle('.items_group, .main_poem, div.sub, .poem_body, .fonted {color: #ffffff !important; background-color: #000000 !important;}');

})();
