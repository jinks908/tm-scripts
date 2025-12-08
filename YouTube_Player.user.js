// ==UserScript==
// @name         YouTube Player
// @namespace    SkyColtNinja/userscripts
// @version      1.4.4-stable
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

    // Load NerdFontSymbols for icons
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://www.nerdfonts.com/assets/css/webfont.css';
    document.head.appendChild(link);

    // Confirm font loaded
    document.fonts.ready.then(() => {
        console.log('NerdFontSymbols loaded');
    });

    // Focus player to enable keybindings
    function focusVideoPlayer() {
        const video = document.querySelector('video');
        if (!video) {
            return;
        };
        video.focus({ preventScroll: true });

        showIndicator('Focused  ', 'normal');
    };

    // Create toggle variable
    let volumeBoosterEnabled = false;

    // Boost volume beyond 100%
    function toggleVolumeBooster() {

        // Query the YouTube video player
        const video = document.querySelector('video');

        // Check for existing AudioContext
        if (!video.audioCtx) {
            // Create AudioContext and GainNode for volume boosting
            const audioCtx = new AudioContext();
            // Attach to video element
            video.audioCtx = audioCtx;
            video.gainNode = video.audioCtx.createGain();
            // Feed the video element into the AudioContext
            video.source = video.audioCtx.createMediaElementSource(video);

            // Connect source to gainNode and gainNode to destination
            video.source.connect(video.gainNode);
            video.gainNode.connect(video.audioCtx.destination);
        };

        // Reset volume booster
        if (volumeBoosterEnabled) {
            // Disable volume booster
            video.gainNode.gain.value = 1.0;
            volumeBoosterEnabled = false;
            showIndicator('Volume Boost Off  ', 'decrease');
            return;
        } else {
            // Boost volume by 400%
            video.gainNode.gain.value = 4.0;
            volumeBoosterEnabled = true;
            showIndicator('Volume Booster On  ', 'increase');
            return;
        };
    };

    // Increase/decrease volume
    function updateVolume(change) {
        const video = document.querySelector('video');
        if (!video) return;

        // Calculate new volume
        let newVolume = Math.round((video.volume + change) * 100) / 100;
        newVolume = Math.max(0.0, Math.min(1.0, newVolume));

        // Set new volume
        video.volume = newVolume;

        // Show volume indicator
        if (change > 0) {

            showIndicator(`  Volume: ${Math.round(newVolume * 100)}%`, 'increase');
        } else {
            showIndicator(` Volume: ${Math.round(newVolume * 100)}%`, 'decrease');
        };
    };

    // Mute/unmute volume
    function toggleMute() {
        const video = document.querySelector('video');
        if (!video) return;

        // Toggle mute
        video.muted = !video.muted;

        // Show mute indicator
        if (video.muted) {
            showIndicator('󰖁 ', 'decrease');
        } else {
            showIndicator('  ', 'increase');
        };
    };

    // Set default playback speed
    let currentSpeed = 1.0;

    // Set custom playback speed
    function updateSpeed(change) {
        const video = document.querySelector('video');
        if (!video) return;

        // Add/subtract increment to current speed and ensure two decimal places
        currentSpeed = Math.round((video.playbackRate + change) * 100) / 100;
        // Restrict between 0.25x and 4.0x (standard HTML5 audio limits)
        currentSpeed = Math.max(0.25, Math.min(4.0, currentSpeed));

        // Apply new playback speed
        video.playbackRate = currentSpeed;

        // Show speed indicator
        if (change > 0) {
            showIndicator('󰓅 ' + currentSpeed + 'x', 'increase');
        } else {
            showIndicator('󰾆 ' + currentSpeed + 'x', 'decrease');
        };
    };

    // Reset playback speed to 1.0x
    function defaultPlaybackRate() {
        const video = document.querySelector('video');
        if (!video) return;

        // Reset playback speed
        video.playbackRate = 1.0;

        // Update global variable
        currentSpeed = 1.0;
        showIndicator('󰾅 Speed: 1.0x', 'normal');
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
            case 'normal':
                fgColor = '#000000';
                bgColor = '#00aeff';
                break;
            case 'decrease':
                fgColor = '#000000';
                bgColor = '#f7768e';
                break;
            case 'increase':
                fgColor = '#000000';
                bgColor = '#52e3c3';
                break;
            default: // focus
                fgColor = '#000000';
                bgColor = '#f7c143';
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
            font-family: "NerdFontsSymbols Nerd Font", "Poppins", sans-serif !important;
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
        // Only trigger if not focused on input fields
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;

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

        // Volume controls
        switch(e.key) {
            case '>':
                e.preventDefault();
                updateSpeed(0.05); // Increase speed by 0.05x
                break;
            case '<':
                e.preventDefault();
                updateSpeed(-0.05); // Decrease speed by 0.05x
                break;
            case 'ArrowUp':
                e.preventDefault();
                updateVolume(0.05);
                break;
            case 'ArrowDown':
                e.preventDefault();
                updateVolume(-0.05);
                break;
            case 'm':
                e.preventDefault();
                toggleMute();
                break;
        };
    }, true);

    // Sync with actual playback rate periodically
    // NOTE: This handles cases where speed is changed via UI controls
    // N> and/or switching to/from other audiobooks
    setInterval(() => {
        const video = document.querySelector('video');
        if (video && Math.abs(video.playbackRate - currentSpeed) > 0.01) {
            video.playbackRate = currentSpeed;
        };
    }, 1000);

})();
