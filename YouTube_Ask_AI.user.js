// ==UserScript==
// @name         YouTube Ask AI
// @namespace    SkyColtNinja/userscripts
// @version      1.2.2-alpha
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
            background: #f44336;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            font-size: 14px;
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

        .yt-ask-ai-toast.fadeOut {
            animation: fadeOut 0.3s ease-out forwards;
        }

        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translateY(20px);
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
            toast.classList.add('fadeOut');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    function askAI() {
        console.log('askAI triggered');
        // Look for the "Ask" button directly on page
        const askButtons = document.querySelectorAll('button[aria-label="Ask"]');
        if (askButtons.length > 0) {
            console.log('Found Ask button directly on page');
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
                } else {
                    console.log('Could not find Ask input field');
                }
            }, 500);
            return;
        }

        // Otherwise look for the ⋮ button (action menu)
        const menuButtons = document.querySelectorAll('div#menu button[aria-label="More actions"]');
        console.log('Menu buttons found:', menuButtons.length);
        if (menuButtons.length > 0) {
            // The action menu is usually the second item in the menu
            console.log(menuButtons[1]);
            const actionMenu = menuButtons[1];
            actionMenu.click();
            // Wait for menu to appear
            setTimeout(() => {
                const btns = document.querySelectorAll('yt-formatted-string.ytd-menu-service-item-renderer');
                console.log(btns);

                // Search for the "Ask" button and click it
                let foundAsk = false;
                for (let btn of btns) {
                    if (btn.textContent.includes('Ask')) {
                        console.log('Found Ask button in menu');
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
                            } else {
                                console.log('Could not find Ask input field');
                            }
                        }, 500);
                        break;
                    }
                    actionMenu.click();
                }

                if (!foundAsk) {
                    // Close the menu and show toast notification

                    setTimeout(() => {
                        showToast('Ask AI not available for this video');
                    }, 300);
                }
            }, 300);
        }
    }

    // Listen for keyboard shortcut (Ctrl+A)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'a') {
            e.preventDefault();
            askAI();
        }
    });
})();
