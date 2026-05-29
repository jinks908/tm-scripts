// ==UserScript==
// @name         Desmos Enhancements
// @namespace    SkyColtNinja/userscripts
// @version      1.0.0
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Desmos.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Desmos.user.js
// @description  Enhancements for Desmos graphing calculator
// @author       SkyColtNinja
// @match        https://www.desmos.com/calculator/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==


(function() {
    'use strict';

    function clickElement(el) {
        el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        el.dispatchEvent(new MouseEvent('mouseup',   { bubbles: true }));
        el.dispatchEvent(new MouseEvent('click',     { bubbles: true }));
    };

    function waitForElement(selector, callback) {
        const el = document.querySelector(selector);
        if (el) { callback(el); return; };

        const observer = new MutationObserver(() => {
            const el = document.querySelector(selector);
            if (el) {
                observer.disconnect();
                callback(el);
            };
        });
        observer.observe(document.body, { childList: true, subtree: true });
    };

    function toggleDarkMode() {
        // Step 1: wait for the wrench to appear, then click it
        waitForElement('i.dcg-icon-wrench', (wrench) => {
            clickElement(wrench);

            // Step 2: wait for the settings panel to render, then click the checkbox
            waitForElement('label.dcg-reverse-contrast-checkbox .dcg-checkbox__box', (checkbox) => {
                clickElement(checkbox);
            });
        });
    };

    toggleDarkMode();

})();
