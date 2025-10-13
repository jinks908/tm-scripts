// ==UserScript==
// @name         Wiki Popup Hider
// @namespace    http://tampermonkey.net/
// @version      2024-01-27
// @description  Hide Wikipedia popups when using Tridactyl hints
// @author       SkyColtNinja
// @match        https://en.wikipedia.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wikipedia.org
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Hint mode active flag
    let hintModeActive = false;

    // Watch for Tridactyl hints appearing and disappearing
    const observer = new MutationObserver(() => {

        const hints = document.querySelectorAll('.TridactylHintElem');

        if (hints.length > 0) {
            hintModeActive = true;
        } else if (hintModeActive) {
            // Hints just disappeared (hint mode just exited)
            hintModeActive = false;

            // Hide any popups that appeared
            setTimeout(() => {
                const popups = document.querySelectorAll('.mwe-popups');
                popups.forEach(popup => {
                    popup.style.setProperty('display', 'none', 'important');
                    popup.remove(); // Also remove it from DOM
                });
            }, 800);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
