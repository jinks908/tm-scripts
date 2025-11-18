// ==UserScript==
// @name         Global Theme
// @namespace    SkyColtNinja/userscripts
// @version      1.1.2
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Global_Theme.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Global_Theme.user.js
// @description  Global styles/colors for Firefox
// @author       SkyColtNinja
// @match        *://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Custom Selection Colors
    GM_addStyle('html {::selection {background-color: #bcd788 !important; color: #303030 !important;}');
    // Hide Nord tracking shield icon on Google search results
    GM_addStyle('span[name="tp-shield"] {display: none !important;}');

})();
