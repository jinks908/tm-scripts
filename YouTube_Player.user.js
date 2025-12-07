// ==UserScript==
// @name         YouTube Player
// @namespace    SkyColtNinja/userscripts
// @version      1.0.0-alpha
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/YouTube_Player.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/YouTube_Player.user.js
// @description  YouTube video player keybindings and enhancements
// @author       SkyColtNinja
// @match        https://www.youtube.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    /* TODO
        [ ] Add: Indicator float notifications
        [ ] Add: Player control keybindings
            [ ] Select default playback rate
            [ ] Focus video player
            [ ] Toggle volume booster
    */

    // Focus player to enable keybindings
    function focusVideoPlayer() {
        const video = document.querySelector('video');
        if (!video) {
            return;
        };
        video.focus({ preventScroll: true });
        video.click();

        showIndicator('Focused');
    };

    // Boost volume beyond 100%
    function toggleVolumeBooster() {
        // Query the YouTube video player
        const video = document.querySelector('video');

        // Create AudioContext and GainNode for volume boosting
        const audioCtx = new AudioContext();
        const gainNode = audioCtx.createGain();
        // Feed the video element into the AudioContext
        const source = audioCtx.createMediaElementSource(video);

        // Connect source to gainNode and gainNode to destination
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        if (gainNode.gain.value > 1.0) {
            // Disable volume booster
            gainNode.gain.value = 1.0;
            showIndicator('Volume Booster Off', 'boost-off');
            return;
        };

        // Boost volume by 400%
        gainNode.gain.value = 4.0;
        showIndicator('Volume Booster On: 400%', 'boost-on');
        return;
    };

    // Reset playback speed to 1.0x
    function defaultPlaybackRate() {
        const video = document.querySelector('video');
        if (!video) return;

        video.playbackRate = 1.0;
        showIndicator('Playback Speed: 1.0x', 'speed');
    };

    // Show indicator float
    function showIndicator(text, type) {
        // Remove existing indicator
        const existing = document.getElementById('float-indicator');
        if (existing) existing.remove();

        // Create new indicator
        const indicator = document.createElement('div');
        indicator.id = 'float-indicator';
        indicator.textContent = text;

        // Set colors based on type
        let bgColor, fgColor;
        switch(type) {
            case 'speed':
                fgColor = '#000000';
                bgColor = '#00aeff';
                break;
            case 'boost-on':
                fgColor = '#000000';
                bgColor = '#f7768e';
                break;
            case 'boost-off':
                fgColor = '#000000';
                bgColor = '#52e3c3';
                break;
            default: // focus
                fgColor = '#000000';
                bgColor = '#52e3c3';
        }

        // Style the indicator float
        indicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: ${fgColor};
            padding: 8px 12px;
            border-radius: 4px;
            font-family: "Poppins", sans-serif !important;
            font-weight: 600;
            font-size: 16px;
            z-index: 10000;
            transition: opacity 0.3s;
        `;

        document.body.appendChild(indicator);

        // Auto-hide float after 2 seconds
        setTimeout(() => {
            if (indicator) indicator.style.opacity = '0';
            setTimeout(() => {
                if (indicator && indicator.parentNode) {
                    indicator.parentNode.removeChild(indicator);
                };
            }, 300);
        }, 2000);
    };

    // Keybindings
    document.addEventListener('keydown', function(e) {
        // Only trigger if not focused on input/textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        // Focus player
        if (e.code === 'KeyF' && e.altKey && e.shiftKey) {
            e.preventDefault();
            focusVideoPlayer();
            return;
        };
        // Toggle volume booster
        if (e.code === 'KeyB' && e.altKey && e.shiftKey) {
            e.preventDefault();
            toggleVolumeBooster();
            return;
        };
        // Reset playback speed
        if (e.code === 'KeyK' && e.ctrlKey && e.shiftKey) {
            e.preventDefault();
            defaultPlaybackRate();
            return;
        };

        // Other bindings
        switch(e.key) {
            case 'ArrowUp':
                e.preventDefault();
                updateVolume(0.05);
                break;
            case 'ArrowDown':
                e.preventDefault();
                updateVolume(-0.05);
                break;
        };
    }, true);

})();
