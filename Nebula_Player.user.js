// ==UserScript==
// @name         Nebula Player Controls
// @namespace    SkyColtNinja/userscripts
// @version      1.0.0-alpha
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Nebula_Player.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Nebula_Player.user.js
// @description  Custom keybindings for the Nebula video player
// @author       SkyColtNinja
// @match        https://nebula.tv/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Focus player to enable keybindings
    function focusVideoPlayer() {
        const video = document.querySelector('video');
        if (!video) {
            return;
        };
        video.focus({ preventScroll: true });
        video.click();
    };

    // Set custom volume
    function updateVolume(change) {
        const video = document.querySelector('video');
        if (!video) return;

        let newVolume = Math.round((video.volume + change) * 100) / 100;
        newVolume = Math.max(0.0, Math.min(1.0, newVolume)); // Clamp between 0 and 1

        video.volume = newVolume;
    };

    // Keybindings
    document.addEventListener('keydown', function(e) {
        // Only trigger if not focused on input/textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        switch(e.key) {
            case (e.altKey && e.ctrlKey && e.key === 'f'):
                e.preventDefault();
                focusVideoPlayer(); // Focus the video player
                break;
            case 'ArrowUp':
                e.preventDefault();
                updateVolume(0.05); // Increase volume by 5%
                break;
            case 'ArrowDown':
                e.preventDefault();
                updateVolume(-0.05); // Decrease volume by 5%
                break;
        };
    }, true);

})();
