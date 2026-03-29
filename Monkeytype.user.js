// ==UserScript==
// @name         Monkeytype Keybindings
// @namespace    SkyColtNinja/userscripts
// @version      1.0.0
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Monkeytype.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Monkeytype.user.js
// @description  Adds keybindings to Monkeytype for easier navigation and control
// @author       SkyColtNinja
// @match        https://monkeytype.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {

    const TIMEOUT = 1000; // ms to wait for follow-up key
    let leaderActive = false;
    let leaderTimer = null;

    function activateLeader() {
        leaderActive = true;
        clearTimeout(leaderTimer);
        leaderTimer = setTimeout(() => { leaderActive = false; }, TIMEOUT);
    }

    document.addEventListener('keydown', (e) => {
        // Detect Ctrl+` as leader
        if (e.ctrlKey && e.key === '`') {
            e.preventDefault();
            activateLeader();
            return;
        }

        if (leaderActive) {
            leaderActive = false;
            clearTimeout(leaderTimer);

            switch (e.key) {
                case 'k':
                    e.preventDefault();
                    // restart
                    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Tab', keyCode: 9, bubbles: true}));
                    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', keyCode: 13, bubbles: true}));
                    break;
                case 'j':
                    e.preventDefault();
                    document.querySelector('button.textButton[mode="time"]')?.click();
                    break;
                case 'l':
                    e.preventDefault();
                    document.querySelector('button.textButton[mode="quote"]')?.click();
                    break;
            }
        }
    }, true); // capture phase so we get it before Monkeytype does

})();
