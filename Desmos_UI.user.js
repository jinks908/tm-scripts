// ==UserScript==
// @name         Desmos UI Functions
// @namespace    SkyColtNinja/userscripts
// @version      1.0.0
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Desmos_UI.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Desmos_UI.user.js
// @description  Functional enhancement for Desmos graphing calculator
// @author       SkyColtNinja
// @match        https://www.desmos.com/calculator*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @run-at       document-idle
// @grant        GM_addStyle
// ==/UserScript==


(function() {
    'use strict';

    const savedViewport = {
      top: 0.7915600621885994,
      bottom: -0.811623885105982,
      left: -1.9319813793923517,
      right: 1.959801920806429,
    }


    let currentViewport = {};

    function saveViewport(currentViewport) {
        for (let coordinate of savedViewport) {
            savedViewport.coordinate = currentViewport.coordinate;
        }
    }

    function loadViewport() {
        Calc.setMathBounds(savedViewport);
    }

    saveViewport(Calc.graphpaperBounds.mathCoordinates;)

    // Add keyboard shortcut (Ctrl + R) to toggle dark mode
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 's') {
            e.preventDefault();
            savedViewport();
        };
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'r') {
            e.preventDefault();
            loadViewport();
        };
    });

})();
