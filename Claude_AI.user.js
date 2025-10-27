// ==UserScript==
// @name         Claude AI
// @namespace    SkyColtNinja/userscripts
// @version      1.1.8-stable
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Claude_AI.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Claude_AI.user.js
// @description  Prevent <Enter> prompt submission without <Ctrl> key
// @author       SkyColtNinja
// @match        https://claude.ai/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function handleEnterKey(e) {
        // Only watch chat input box
        if (!e.target.closest('[data-testid="chat-input"]') && 
            !e.target.matches('[data-testid="chat-input"]')) {
            return;
        };
        // Allow Ctrl+Enter or Shift+Enter
        if (e.ctrlKey || e.shiftKey) {
            return;
        };
        // Block Enter key
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        };
    };

    // Since we run at document-start, we run before page scripts
    document.addEventListener('keydown', handleEnterKey, true);

})();
