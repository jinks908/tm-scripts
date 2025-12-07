// ==UserScript==
// @name         Claude AI
// @namespace    SkyColtNinja/userscripts
// @version      1.1.9-stable
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Claude_AI.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Claude_AI.user.js
// @description  Change default behavior for certain keybindings
// @author       SkyColtNinja
// @match        https://claude.ai/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function handleKeymaps(e) {
        // Block Claude.ai default bindings for 'Shift+Cmd+,' and 'Shift+Cmd+.'
        // NOTE: We dont use preventDefault() since we still need these handled at the browser level
        if (e.metaKey && e.shiftKey && (e.key === ',' || e.key === '.')) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            return;
        }
        // Only watch chat input box
        if (!e.target.closest('[data-testid="chat-input"]') && 
            !e.target.matches('[data-testid="chat-input"]')) {
            return;
        };
        // Allow 'Ctrl+Enter' or 'Shift+Enter'
        if (e.ctrlKey || e.shiftKey) {
            return;
        };
        // Block 'Enter' key
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        };
    };

    // Since we run at document-start, we run before page scripts
    document.addEventListener('keydown', handleKeymaps, true);

})();
