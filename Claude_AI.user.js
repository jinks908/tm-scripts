// ==UserScript==
// @name         Claude AI
// @namespace    SkyColtNinja/userscripts
// @version      1.1.2
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

    function setupEnterKeyHandler() {
        // Remove existing listener to avoid duplicates
        document.removeEventListener('keydown', handleEnterKey, true);
        // Add new listener
        document.addEventListener('keydown', handleEnterKey, true);
    };

    // Use capture phase to intercept before page scripts
    function handleEnterKey(e) {
        // Reverts to Karabiner mapping for Ctrl+Enter
        if (e.ctrlKey && e.key === 'Enter') {
            return true;
        // Allow Shift+Enter for new lines
        } else if (e.shiftKey && e.key === 'Enter') {
            return true;
        // Block Enter key to prevent prompt submission
        } else if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        };
    };

    // Initial setup
    setupEnterKeyHandler();

    // Intercept history changes to reapply handler
    ['pushState', 'replaceState'].forEach(method => {
        const original = history[method];
        history[method] = function() {
            original.apply(this, arguments);
            setupEnterKeyHandler();
        };
    });

    // Handle back/forward navigation
    window.addEventListener('popstate', setupEnterKeyHandler);

})();
