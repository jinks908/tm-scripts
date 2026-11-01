// ==UserScript==
// @name         Desmos UI Enhancements
// @namespace    SkyColtNinja/userscripts
// @version      2.0.1
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

    const defaults = {
        colors: {},
        accentColor: "",
    }

    const palette = {
        // Note: This color palette is designed for dark mode (i.e., reversed contrast),
        // thus each value is actually the inverted hex of the desired color.
        //       INVERSE      RESULT
        // -------------------------------
        RED:    "#009973", // #ff668c
        BLUE:   "#b25f01", // #4da0ff
        GREEN:  "#760083", // #89ff7c
        ORANGE: "#0086b2", // #ff794d
        PURPLE: "#558d0c", // #aa71f4
        BLACK:  "#3f350a"  // #c0caf5
    };

    // Default state
    const settings = {
        colorsOn: true,
        invertedColors: true,
        customColors: palette,
        accentColor: palette.GREEN,
        viewport: {
            left: -10,
            right: 10,
            top: 5,
            bottom: -5
        }
    };

    // NOTE: This replaces "Delete All" with "Reset" (restores to defaultState)
    function saveDefaultState() {
        // Save the current state of a calculator instance
        let newDefaultState = Calc.getState();
        // Set a new default state to match the current state
        Calc.setDefaultState(newDefaultState);
    };

    // Store Desmos default colorscheme
    function saveColors(currentColors) {
        for (const [name, hex] of Object.entries(settings.customColors)) {
            defaults.colors[name] = currentColors[name];
        };
        defaults.accentColor = Calc.graphSettings.accentColor;
    };

    function setColors(on) {
        Calc.updateSettings({ colors: on ? settings.customColors : defaults.colors});
        Calc.updateSettings({ accentColor: on ? settings.accentColor : defaults.accentColor })
        settings.colorsOn = on;
    };

    // Toggle custom colorscheme
    function toggleColors() {
        setColors(!settings.colorsOn);
    };

    // Save the current viewport state
    function saveViewport(currentViewport) {
        for (const [dir, coord] of Object.entries(settings.viewport)) {
            settings.viewport[dir] = currentViewport[dir];
        };
    };

    // Restore saved viewport (automatically toggles viewport lock)
    function loadViewport() {
        Calc.setMathBounds(settings.viewport);
        Calc.updateSettings({ lockViewport: true });
    }

    // Run callback once Desmos has created Calc
    function waitForCalc(callback) {
        const timer = setInterval(() => {
            if (typeof Calc !== 'undefined' && Calc.graphSettings) {
                clearInterval(timer);
                callback();
            }
        }, 50);
    }

    // Initialize on page load
    waitForCalc(() => {
        // Enable dark mode (reversed contrast)
        Calc.updateSettings({ invertedColors: settings.invertedColors });
        // Cache default colorscheme
        saveColors(Calc.graphSettings.colors);
        // True at startup
        setColors(settings.colorsOn);
    });

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
        // Toggle custom colorscheme (Ctrl + Shift + G)
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'g') {
            e.preventDefault();
            e.stopPropagation();
            toggleColors();
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
