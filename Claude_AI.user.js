// ==UserScript==
// @name         Claude AI
// @namespace    SkyColtNinja/userscripts
// @version      1.1.5
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

    function handleEnterKey(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            console.log('Ctrl+Enter detected - allowing');
            return true;
        } else if (e.shiftKey && e.key === 'Enter') {
            console.log('Shift+Enter detected - allowing');
            return true;
        } else if (e.key === 'Enter') {
            console.log('Enter detected - blocking');
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }
    }

    function attachToChatInput() {
        const chatInput = document.querySelector('[data-testid="chat-input"]');

        if (chatInput && !chatInput.dataset.enterHandlerAttached) {
            chatInput.addEventListener('keydown', handleEnterKey, true);
            chatInput.dataset.enterHandlerAttached = 'true';
            console.log('Enter key handler attached to chat input');
        }
    }

    // Watch for the chat input to appear/change
    const observer = new MutationObserver(() => {
        attachToChatInput();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Try attaching immediately
    attachToChatInput();

})();
