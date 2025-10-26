// ==UserScript==
// @name         Claude AI
// @namespace    SkyColtNinja/userscripts
// @version      1.0.1
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Claude_AI.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Claude_AI.user.js
// @description  Prevent <Enter> prompt submission without <Ctrl> key
// @author       SkyColtNinja
// @match        https://claude.ai/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Use capture phase to intercept before page scripts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            return true;
        } else if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        };
    }, true);

})();
