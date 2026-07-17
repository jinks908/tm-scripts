// ==UserScript==
// @name         YouTube Player (Minimal)
// @namespace    SkyColtNinja/userscripts
// @version      1.6.6
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

    // Timestamp tracker for "previous" position
    let prevTime;

    // Jump to 10%, 20%, 30%, ..., 90%
    function jumpToSection(section) {
        const video = document.querySelector('video.html5-main-video');
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
        const video = document.querySelector('video.html5-main-video');
        if (!video) return;

        if (!prevTime) return;
        video.currentTime = prevTime;
        showIndicator('Previous', 'back');
    }

    // Check if video is muted or unmuted
    function checkMute() {
        const video = document.querySelector('video.html5-main-video');
        if (!video) return;

        if (video.muted) {
            showIndicator('Unmute', 'forward');
        } else {
            showIndicator('Mute', 'back');
        }
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
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;

        if (e.code === 'KeyF' && e.altKey && e.shiftKey) {
            e.preventDefault();
            focusVideoPlayer();
        }
        switch(e.key) {
            case 'ArrowUp':
                showIndicator('+5%', 'forward');
                break;
            case 'ArrowDown':
                showIndicator('-5%', 'back');
                break;
            case 'm':
                checkMute();
                break;
            case 'j':
                showIndicator('⏮  10s', 'back');
                break;
            case 'l':
                showIndicator('⏭  10s', 'forward');
                break;
            case 'k':
                showIndicator('Play/Pause', 'play');
                break;
            case 'Backspace':
                e.preventDefault();
                jumpToLast();
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
