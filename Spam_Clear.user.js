// ==UserScript==
// @name         Spam Clear
// @namespace    SkyColtNinja/userscripts
// @version      1.0.0
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

    // TODO
    // #:: Add confirmation toast notification

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
