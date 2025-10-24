// ==UserScript==
// @name         Wiki Popup / Styles
// @namespace    SkyColtNinja/userscripts
// @version      1.2.3
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Wiki_Scripts.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Wiki_Scripts.user.js
// @description  Hide Wikipedia popups when using Tridactyl hints
// @author       SkyColtNinja
// @match        https://en.wikipedia.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wikipedia.org
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // #:# Fix MathML/SVG expression backgrounds
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        if (table.querySelector('.mwe-math-element')) {
            // Note that Wiki's native dark theme inverts colors, hence 'white' -> 'black'
            table.style.setProperty('background-color', 'white', 'important');
        };
    });


    // #:# Fix popup persistence when using Tridactyl hints
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
        };
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
