// ==UserScript==
// @name         ChatGPT
// @namespace    SkyColtNinja/userscripts
// @version      1.0.0
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/ChatGPT.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/ChatGPT.user.js
// @description  Prevent <Enter> prompt submission without <Ctrl> key
// @author       SkyColtNinja
// @match        https://chatgpt.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function handleEnterKey(e) {
        // Only watch chat input box
        if (!e.target.closest('#prompt-textarea') && 
            !e.target.matches('#prompt-textarea')) {
            return;
        };
        // Allow Ctrl+Enter or Shift+Enter
        if (e.ctrlKey || e.shiftKey) {
            return;
        };

        // [ ] Add: Todo tasks for git repos
        // [x] Feat: More tasks
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
