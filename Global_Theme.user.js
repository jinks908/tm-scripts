// ==UserScript==
// @name         Global Theme
// @namespace    http://tampermonkey.net/
// @version      1.1.1
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

   GM_addStyle('html {::selection {background-color: #bcd788 !important; color: #303030 !important;}');

})();
