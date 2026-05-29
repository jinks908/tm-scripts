// ==UserScript==
// @name         Desmos Enhancements
// @namespace    SkyColtNinja/userscripts
// @version      1.0.4
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

    // Simulate mouse click event
    function clickElement(el) {
        el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        el.dispatchEvent(new MouseEvent('mouseup',   { bubbles: true }));
        el.dispatchEvent(new MouseEvent('click',     { bubbles: true }));
    };

    // Wait for an element to appear in the DOM
    function waitForElement(selector) {
        return new Promise((resolve) => {
            const el = document.querySelector(selector);
            if (el) { resolve(el); return; };

            const observer = new MutationObserver(() => {
                const el = document.querySelector(selector);
                if (el) {
                    observer.disconnect();
                    resolve(el);
                };
            });
            observer.observe(document.body, { childList: true, subtree: true });
        });
    };

    // Navigate the settings menu to toggle reverse contrast (dark mode) on/off
    async function toggleDarkMode() {
        const wrench = await waitForElement('i.dcg-icon-wrench');

        // Open settings menu
        clickElement(wrench);

        // Hide menu panel while toggling to avoid visual glitches
        const menuPanel = document.querySelector('.dcg-dropdown-popover__interior');
        menuPanel.style.display = 'none';

        // Let settings menu load before checking dark mode checkbox
        await new Promise(r => setTimeout(r, 1000));
        const checkbox = await waitForElement('label.dcg-reverse-contrast-checkbox .dcg-checkbox__box');
        clickElement(checkbox);

        // Wait for dark mode switch before closing settings menu
        await new Promise(r => setTimeout(r, 1000));
        clickElement(wrench);

        // Restore default menu panel visibility
        menuPanel.style.display = '';
    };

    // Run initial toggle
    toggleDarkMode();

    // Add keyboard shortcut (Ctrl + R) to toggle dark mode
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'r') {
            e.preventDefault();
            toggleDarkMode();
        };
    });

})();
