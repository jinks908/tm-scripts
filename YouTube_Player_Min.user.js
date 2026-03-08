// ==UserScript==
// @name         YouTube Player (Minimal)
// @namespace    SkyColtNinja/userscripts
// @version      1.6.4-stable
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/YouTube_Player_Min.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/YouTube_Player_Min.user.js
// @description  YouTube video player keybindings and enhancements
// @author       SkyColtNinja
// @match        https://www.youtube.com/*
// @match        https://tv.youtube.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Focus player
    function focusVideoPlayer() {
        let player;

        // Check for YouTubeTV player
        if (document.querySelector('#id-player-main')) {
            player = document.querySelector('#id-player-main');
        // Check for YouTube player
        } else if (document.querySelector('#movie_player')) {
            player = document.querySelector('#movie_player');
        } else {
            return;
        };

        player.focus({ preventScroll: true });
    }

    document.addEventListener('keydown', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;

        if (e.code === 'KeyF' && e.altKey && e.shiftKey) {
            e.preventDefault();
            focusVideoPlayer();
        }
    }, true);

})();
