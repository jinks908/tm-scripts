// ==UserScript==
// @name         Spam Clear
// @namespace    SkyColtNinja/userscripts
// @version      1.2.1
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Spam_Clear.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Spam_Clear.user.js
// @description  Auto-delete all spam emails
// @author       SkyColtNinja
// @match        https://mail.google.com/mail/u/0/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Toast notification styles
    GM_addStyle(`
        .gmail-spam-clear-toast {
            position: fixed;
            top: 200px;
            right: 50px;
            background: #ff5f5f;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            font-size: 16px;
            font-family: "Google Sans", "Roboto", sans-serif;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
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

        .gmail-spam-clear-toast.fadeOut {
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
    function showToast(message, persist = false) {

        // First check if Dark Mode is enabled
        const checkFilter = window.getComputedStyle(document.documentElement).filter;
        const darkMode = checkFilter && checkFilter.includes('invert'); 

        // Create toast element
        const toast = document.createElement('div');

        // Apply invert filter for dark mode
        if (darkMode) {
            toast.style.filter = 'invert(1)';
        };

        toast.className = 'gmail-spam-clear-toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        if (!persist) {
            setTimeout(() => {
                toast.classList.add('fadeOut');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, 3000);
        }
    }

    // Uncomment to expose showToast globally for debugging
    // unsafeWindow.showToast = showToast;

    function clearSpam() {
        // Find spam link
        const spamLink = document.querySelector('a[href="https://mail.google.com/mail/u/0/#spam"]');
        if (spamLink) {
            spamLink.click();
            setTimeout(() => {
                // Find "Delete all spam messages now" button
                const links = document.querySelectorAll('span[role="button"]');
                links.forEach(link => {
                    if (link.innerText.includes("Delete all spam messages now")) {
                        link.click();
                        setTimeout(() => {
                            // Confirm deletion
                            const confirmButton = document.querySelector('button[data-mdc-dialog-action="ok"]');
                            if (confirmButton) {
                                confirmButton.click();
                            };
                        }, 500);
                    };
                });
            }, 800);
        };

        // Return to inbox
        const inboxLink = document.querySelector('a[href="https://mail.google.com/mail/u/0/#inbox"]');
        if (inboxLink) {
            setTimeout(() => {
                inboxLink.click();
                // Notify user
                setTimeout(() => {
                    showToast('All spam messages have been deleted.', false);
                }, 500);
            }, 800);
        };

    };

    // Listen for keyboard shortcut (Ctrl+D)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            clearSpam();
        };
    });

})();
