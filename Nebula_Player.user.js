// ==UserScript==
// @name         Nebula Player Controls
// @namespace    SkyColtNinja/userscripts
// @version      1.3.1
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

    // Get the active video element
    function getActiveVideo() {
        const videos = document.querySelectorAll('video');
        for (const v of videos) {
            if (v.readyState >= 1 && isFinite(v.duration) && v.duration > 0) {
                return v;
            }
        }
        return null;
    }

    // Focus player to enable keybindings
    function focusVideoPlayer() {
        const video = getActiveVideo();
        if (!video) {
            return;
        };
        video.focus({ preventScroll: true });
        video.click();

        showIndicator('Focused');
    };

    // Set custom volume
    function updateVolume(change) {
        const video = getActiveVideo();
        if (!video) return;

        let newVolume = Math.round((video.volume + change) * 100) / 100;
        newVolume = Math.max(0.0, Math.min(1.0, newVolume)); // Clamp between 0 and 1

        video.volume = newVolume;

        showIndicator(`${newVolume}`, 'volume');
    };

    // Timestamp tracker for "previous" position
    let prevTime;

    // Jump to 10%, 20%, 30%, ..., 90%
    function jumpToSection(section) {
        const video = getActiveVideo();
        if (!video) return;

        // Mark current track position
        prevTime = video.currentTime;

        // Calculate section intervals
        const duration = video.duration;
        const sectionLength = duration / 10;

        // Jump to section
        video.currentTime = section * sectionLength;
        showIndicator(`Section ${section}`, 'forward');
    };

    // Jump to previous spot
    function jumpToLast() {
        const video = getActiveVideo();
        if (!video) return;

        if (!prevTime) return;
        video.currentTime = prevTime;
    }

    // Show indicator float
    function showIndicator(text, type) {
        // Remove existing indicator
        const existing = document.getElementById('speed-indicator');
        if (existing) existing.remove();

        // Create new indicator
        const indicator = document.createElement('div');
        indicator.id = 'speed-indicator';
        indicator.textContent = text;

        // Set colors based on type
        let bgColor, fgColor;
        switch(type) {
            case 'volume':
                fgColor = '#000000';
                bgColor = '#00aeff';
                break;
            case 'play':
                fgColor = '#000000';
                bgColor = '#f7c143';
                break;
            case 'back':
                fgColor = '#000000';
                bgColor = '#f7768e';
                break;
            case 'forward':
                fgColor = '#000000';
                bgColor = '#52e3c3';
                break;
            default: // speed
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
            case 'ArrowLeft':
                showIndicator('⏮  5s', 'back');
                break;
            case 'ArrowRight':
                showIndicator('⏭  5s', 'forward');
                break;
            case 'j':
                showIndicator('⏮  15s', 'back');
                break;
            case 'l':
                showIndicator('⏭  15s', 'forward');
                break;
            case 'k':
                showIndicator('Play/Pause', 'play');
                break;
            case 'Backspace':
                e.preventDefault();
                jumpToLast();
                showIndicator('Previous', 'back');
                break;
            default:
                // Jump to section 0-9
                if (/^[0-9]$/.test(e.key)) {
                    e.preventDefault();
                    jumpToSection(parseInt(e.key));
                }
                break;
        };
    }, true);

})();
