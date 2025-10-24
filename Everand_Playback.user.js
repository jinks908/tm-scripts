// ==UserScript==
// @name         Everand Playback
// @namespace    SkyColtNinja/userscripts
// @version      1.2.8-stable
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Everand_Playback.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Everand_Playback.user.js
// @description  Enhanced playback controls w/ keybindings
// @author       SkyColtNinja
// @match        https://www.everand.com/listen/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Set to true to enable debug features
    let DEBUG = false;

    // Set default playback speed
    let currentSpeed = 1.0;

    // Set custom playback speed
    function updateSpeed(change) {
        const audio = document.querySelector('audio');
        if (!audio) return;

        // Add/subtract increment to current speed and ensure two decimal places
        currentSpeed = Math.round((audio.playbackRate + change) * 100) / 100;
        // Restrict between 0.25x and 4.0x (standard HTML5 audio limits)
        currentSpeed = Math.max(0.25, Math.min(4.0, currentSpeed));

        audio.playbackRate = currentSpeed;

        // Show speed indicator
        showIndicator(currentSpeed + 'x', 'speed');
    }

    // Set custom volume
    function updateVolume(change) {
        const audio = document.querySelector('audio');
        if (!audio) return;

        let newVolume = Math.round((audio.volume + change) * 100) / 100;
        newVolume = Math.max(0.0, Math.min(1.0, newVolume)); // Clamp between 0 and 1

        audio.volume = newVolume;

        // Show volume indicator
        showIndicator(Math.round(newVolume * 100) + '%', 'volume');
    }

    // Play/Pause toggle
    function togglePlayPause() {
        const audio = document.querySelector('audio');
        if (!audio) return;

        if (audio.paused) {
            audio.play();
            showIndicator('▶ Play', 'media');  // ▶ = U+25B6
        } else {
            audio.pause();
            showIndicator('⏸ Pause', 'media'); // ⏸ = U+23F8
        }
    }

    // Skip forward/backward
    function skipTime(seconds) {
        const audio = document.querySelector('audio');
        if (!audio) return;

        audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + seconds));

        const direction = seconds > 0 ? '⏭ ' : '⏮ ';  // ⏭ = U+23ED, ⏮ = U+23EE
        const action = seconds > 0 ? 'Forward' : 'Back';
        showIndicator(`${direction} ${action} ${Math.abs(seconds)}s`, 'media');
    }

    // Convert track information (i.e., MM:SS) to seconds
    function timeToSeconds(timeStr) {
        const [m, s] = timeStr.split(':').map(Number);
        return m * 60 + s;
    };

    // Seek to specific position in the current track (0-9)
    function jumpToSection(section) {
        const audio = document.querySelector('audio');
        if (!audio) return;

        // Get current track time info (to the left/right of the slider)
        // Note: This will be in MM:SS format
        const timeElapsed = document.querySelector('div.current_time span').nextElementSibling.textContent;
        const timeRemaining = document.querySelector('div.time_remaining span').nextElementSibling.textContent.substring(1);

        // Calculate total TRACK duration and section length
        // Note: audio.duration stores the total audiobook length, NOT the current track length
        const trackDuration = timeToSeconds(timeElapsed) + timeToSeconds(timeRemaining);
        const trackSectionLength = trackDuration / 10;

        // Recall that currentTime is in TOTAL seconds for the ENTIRE audiobook
        // This essentially resets the current time to start of current track, then adds the section offset
        audio.currentTime = (audio.currentTime - timeToSeconds(timeElapsed)) + (trackSectionLength * section);

        showIndicator(`${section}`, 'media');
    }

    function showIndicator(text, type) {
        // Remove existing indicator
        const existing = document.getElementById('speed-indicator');
        if (existing) existing.remove();

        // Create new indicator
        const indicator = document.createElement('div');
        indicator.id = 'speed-indicator';
        indicator.textContent = text;

        // Set colors based on type
        let bgColor;
        switch(type) {
            case 'volume':
                bgColor = '#00aeff';
                break;
            case 'media':
                bgColor = '#f7c143';
                break;
            default: // speed
                bgColor = '#52e3c3';
        }

        // Style the indicator float
        indicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: #000000;
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
                }
            }, 300);
        }, 2000);
    }

    // Keybindings
    document.addEventListener('keydown', function(e) {
        // Only trigger if not focused on input/textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        switch(e.key) {
            case '>':
                e.preventDefault();
                updateSpeed(0.05); // Increase speed by 0.05x
                break;
            case '<':
                e.preventDefault();
                updateSpeed(-0.05); // Decrease speed by 0.05x
                break;
            case '=':
                e.preventDefault();
                const audio = document.querySelector('audio');
                if (audio) {
                    currentSpeed = 1.0;
                    audio.playbackRate = currentSpeed;
                    showIndicator(currentSpeed + 'x', 'speed');
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                updateVolume(0.05);// Increase volume by 5%
                break;
            case 'ArrowDown':
                e.preventDefault();
                updateVolume(-0.05); // Decrease volume by 5%
                break;
            case 'k':
                e.preventDefault();
                togglePlayPause();
                break;
            case 'j':
                e.preventDefault();
                skipTime(-15); // Go back 15 seconds
                break;
            case 'l':
                e.preventDefault();
                skipTime(15); // Go forward 15 seconds
                break;
            default:
                // Jump to section 0-9
                if (/^[0-9]$/.test(e.key)) {
                    e.preventDefault();
                    jumpToSection(parseInt(e.key));
                }
                break;
        }
    }, true);

    // Prevent default volume control with 0-9 keys (uses `keyup`)
    document.addEventListener('keyup', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (['0','1','2','3','4','5','6','7','8','9'].includes(e.key)) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
    });

    // Sync with actual playback rate periodically
    // NOTE: This handles cases where speed is changed via UI controls
    // N> and/or switching to/from other audiobooks
    setInterval(() => {
        const audio = document.querySelector('audio');
        if (audio && Math.abs(audio.playbackRate - currentSpeed) > 0.01) {
            audio.playbackRate = currentSpeed;
        }
    }, 1000);

    // Expose for debugging
    if (DEBUG) {
        unsafeWindow.everandDebug = {
        get currentSpeed() { return currentSpeed; },
        set currentSpeed(val) { currentSpeed = val; },
        updateSpeed,
        updateVolume,
        togglePlayPause,
        skipTime,
        jumpToSection,
        timeToSeconds,
        showIndicator,
        getAudio: () => document.querySelector('audio')
    };
    console.log('Everand Playback Debug enabled. Access via: everandDebug');

}})();
