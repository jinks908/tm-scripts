// ==UserScript==
// @name         YouTube Ask AI
// @namespace    SkyColtNinja/userscripts
// @version      1.2.3-stable
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/YouTube_Ask_AI.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/YouTube_Ask_AI.user.js
// @description  Keyboard shortcut to open YouTube's Ask AI
// @author       SkyColtNinja
// @match        https://www.youtube.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Add styles for the toast notification
    GM_addStyle(`
        .yt-ask-ai-toast {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #ff5f5f;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            font-size: 16px;
            font-family: "YouTube Sans", "Roboto", sans-serif;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        .yt-ask-ai-toast.slideOut {
            animation: slideOut 0.3s ease-out;
        }

        @keyframes slideOut {
            to {
                opacity: 0;
                transform: translateX(400px);
            }
        }
    `);

    // Function to show toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'yt-ask-ai-toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('slideOut');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    };

    function askAI() {
        // Look for the "Ask" button directly on page
        const askButtons = document.querySelectorAll('button[aria-label="Ask"]');
        if (askButtons.length > 0) {
            askButtons[0].click();

            setTimeout(() => {
                // Auto-focus on the AI input field
                const inputField = document.querySelector('textarea.chatInputViewModelChatInput');
                if (inputField) {
                    inputField.focus();
                    // Re-attempt in case YouTube steals focus
                    setTimeout(() => {
                        inputField.focus();
                    }, 100);
                };
            }, 500);
            return;
        };

        // Otherwise look for ⋮ buttons (action menus)
        const menuButtons = document.querySelectorAll('div#menu button[aria-label="More actions"]');
        if (menuButtons.length > 0) {
            // The one we want is the second item in the menu
            const actionMenu = menuButtons[1];
            actionMenu.click();
            // Wait for menu to appear
            setTimeout(() => {
                // Look for the "Ask" button in the dialog menu
                const btns = document.querySelectorAll('yt-formatted-string.ytd-menu-service-item-renderer');
                let foundAsk = false;
                for (const btn of btns) {
                    if (btn.textContent.includes('Ask')) {
                        btn.click();
                        foundAsk = true;

                        setTimeout(() => {
                            // Auto-focus on the AI input field
                            const inputField = document.querySelector('textarea.chatInputViewModelChatInput');
                            if (inputField) {
                                inputField.focus();
                                // Re-attempt in case YouTube steals focus
                                setTimeout(() => {
                                    inputField.focus();
                                }, 100);
                            };
                        }, 500);
                        break;
                    };
                    // Close action menu
                    actionMenu.click();
                };

                // Notify missing Ask button
                if (!foundAsk) {
                    setTimeout(() => {
                        showToast('Ask AI not available for this video');
                    }, 300);
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
