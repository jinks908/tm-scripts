// ==UserScript==
// @name         YouTube Ask AI
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Keyboard shortcut to open YouTube's Ask AI
// @author       SkyColtNinja
// @match        https://www.youtube.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    function askAI() {
        // Look for the 󰇘 button (action menu)
        const menuButtons = document.querySelectorAll('div#menu button[aria-label="More actions"]');
        if (menuButtons.length > 0) {
            // The "Ask" option is the second item in the menu
            menuButtons[1].click();
            // Wait for menu to appear
            setTimeout(() => {
                const btns = document.querySelectorAll('yt-formatted-string.ytd-menu-service-item-renderer');

                // Search for the "Ask" button and click it
                for (let btn of btns) {
                    if (btn.textContent.includes('Ask')) {
                        btn.click();

                        setTimeout(() => {
                            // Auto-focus on the AI input field
                            const inputField = document.querySelector('textarea.chatInputViewModelChatInput');
                            if (inputField) {
                                inputField.focus();
                                // Re-attempt in case YouTube steals focus
                                setTimeout(() => {
                                    inputField.focus();
                                }, 100);
                            } else {
                                console.log('Could not find Ask input field');
                            };
                        }, 500);
                    break;
                    };
                };
            }, 300);
        };
    };

    // Listen for keyboard shortcut (Ctrl+A)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'a') {
            e.preventDefault();
            askAI();
        };
    });
})();
