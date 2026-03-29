// ==UserScript==
// @name         Monkeytype Keybindings
// @namespace    SkyColtNinja/userscripts
// @version      1.0.1
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Monkeytype.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Monkeytype.user.js
// @description  Adds keybindings to Monkeytype for easier navigation and control
// @author       SkyColtNinja
// @match        https://monkeytype.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {

    const restartBtn = document.querySelector('button#restartTestButton');
    function restartTest() {
        restartBtn.click();
    };

    /*
     * NOTE: The default binding for restarting the test is `Tab + Enter`, but since I've remapped `Tab` to `Ctrl`
     * when used as a modifier, we need to explicitly define this binding for Monkeytpe.
    */
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            restartTest();
        };
    });

})();
