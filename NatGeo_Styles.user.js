// ==UserScript==
// @name         National Geographic Styles
// @namespace    http://tampermonkey.net/
// @version      2024-02-25
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
