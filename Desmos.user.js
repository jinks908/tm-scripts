// ==UserScript==
// @name         Desmos Enhancements
// @namespace    SkyColtNinja/userscripts
// @version      1.0.1
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Desmos.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Desmos.user.js
// @description  Enhancements for Desmos graphing calculator
// @author       SkyColtNinja
// @match        https://www.desmos.com/calculator*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @run-at       document-idle
// @grant        GM_addStyle
// ==/UserScript==


(function() {
    'use strict';

    function clickElement(el) {
        el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        el.dispatchEvent(new MouseEvent('mouseup',   { bubbles: true }));
        el.dispatchEvent(new MouseEvent('click',     { bubbles: true }));
    }

    function waitForElement(selector) {
        return new Promise((resolve) => {
            const el = document.querySelector(selector);
            if (el) { resolve(el); return; }

            const observer = new MutationObserver(() => {
                const el = document.querySelector(selector);
                if (el) {
                    observer.disconnect();
                    resolve(el);
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        });
    }

    async function toggleDarkMode() {
        const wrench = await waitForElement('i.dcg-icon-wrench');

        clickElement(wrench);
        // Give Desmos time to finish its initial render before interacting
        await new Promise(r => setTimeout(r, 1000));

        const checkbox = await waitForElement('label.dcg-reverse-contrast-checkbox .dcg-checkbox__box');
        clickElement(checkbox);
    }

    toggleDarkMode();

})();
