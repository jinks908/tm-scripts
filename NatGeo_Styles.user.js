// ==UserScript==
// @name         National Geographic Styles
// @namespace    SkyColtNinja/userscripts
// @version      1.1.1
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/NatGeo_Styles.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/NatGeo_Styles.user.js
// @description  Remove paywall popup
// @author       SkyColtNinja
// @match        www.nationalgeographic.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Remove dark filter over page content
    GM_addStyle('.Modal {background: none !important;}');
    // Remove paywall popup
    GM_addStyle('.ModalInner__Content {display: none !important;}');

})();
