// ==UserScript==
// @name         Desmos UI Functions
// @namespace    SkyColtNinja/userscripts
// @version      1.1.0
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Desmos_UI.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Desmos_UI.user.js
// @description  Functional enhancement for Desmos graphing calculator
// @author       SkyColtNinja
// @match        https://www.desmos.com/calculator*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @run-at       document-start
// @grant        GM_addStyle
// ==/UserScript==


(function() {
    'use strict';

    // TODO
    // [ ] Could we utilize browser storage for saving viewport coordinates?

    // Default state
    const viewport = {
        left: -10,
        right: 10,
        top: 5,
        bottom: -5
    };

    // Save the current viewport state
    function saveViewport(currentViewport) {
        for (const [dir, coord] of Object.entries(viewport)) {
            viewport[dir] = currentViewport[dir];
        };
    };

    // Restore saved viewport (automatically toggles viewport lock)
    function loadViewport() {
        Calc.setMathBounds(viewport);
        Calc.updateSettings({ lockViewport: true });
    }

    // Keybindings
    document.addEventListener('keydown', function(e) {
        // Save current viewport state (Ctrl + Shift + S)
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') {
            e.preventDefault();
            e.stopPropagation();
            saveViewport(Calc.graphpaperBounds.mathCoordinates);
        };
        // Load saved viewport state (Ctrl + Shift + R)
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'r') {
            e.preventDefault();
            e.stopPropagation();
            loadViewport();
        };
        // Toggle viewport lock
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l') {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            // Flip current lock status
            Calc.updateSettings({ lockViewport: !Calc.graphSettings.lockViewport });
        };
    });

})();
