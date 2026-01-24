// ==UserScript==
// @name         YouTube Player
// @namespace    SkyColtNinja/userscripts
// @version      1.5.5-stable
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

    // Setup AudioContext for volume boosting on a video element
    function setupVolumeBooster(video) {
        if (!video || video.audioCtx) return;

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

        // Apply current volume booster state
        video.gainNode.gain.value = volumeBoosterEnabled ? 4.0 : 1.0;
        console.log('Volume booster setup complete, state:', volumeBoosterEnabled);
    }

    // Boost volume beyond 100%
    function toggleVolumeBooster() {

        // Query the YouTube video player
        const video = document.querySelector('video');

        // Setup AudioContext if not already present
        if (!video.audioCtx) {
            setupVolumeBooster(video);
        };

        // Toggle volume booster
        if (volumeBoosterEnabled) {
            // Disable volume booster
            video.gainNode.gain.value = 1.0;
            volumeBoosterEnabled = false;
            showIndicator('Volume Boost Off  ', 'decrease');
            return;
        } else {
            // Boost volume by 400%
            video.gainNode.gain.value = 4.0;
            volumeBoosterEnabled = true;
            showIndicator('Volume Booster On  ', 'increase');
            return;
        };
    };

    // Initialize state variables (will be synced when video element is detected)
    let currentVolume = null;
    let currentMuteState = null;
    let currentVideoElement = null;
    let muteToggleInProgress = false;  // Flag to prevent YouTube from undoing our mute

    // Increase/decrease volume
    function updateVolume(change) {
        const video = document.querySelector('video');
        if (!video) return;

        // Calculate new volume
        let newVolume = Math.round((video.volume + change) * 100) / 100;
        newVolume = Math.max(0.0, Math.min(1.0, newVolume));

        // Set new volume
        video.volume = newVolume;
        currentVolume = newVolume;

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
        const newMuteState = !video.muted;
        video.muted = newMuteState;
        currentMuteState = newMuteState;

        // Set flag to prevent YouTube from undoing our change
        // We'll actively re-enforce the mute state during this period
        muteToggleInProgress = true;
        
        // Aggressively re-enforce the mute state for 1 second
        let enforceAttempts = 0;
        const enforceInterval = setInterval(() => {
            if (enforceAttempts >= 10) {
                clearInterval(enforceInterval);
                muteToggleInProgress = false;
                return;
            }
            
            const currentVideo = document.querySelector('video');
            if (currentVideo && currentVideo.muted !== newMuteState) {
                console.log(`Re-enforcing mute state (attempt ${enforceAttempts + 1}):`, newMuteState);
                currentVideo.muted = newMuteState;
            }
            enforceAttempts++;
        }, 100);  // Check every 100ms for 1 second total

        // Show mute indicator
        if (video.muted) {
            showIndicator('󰖁 ', 'decrease');
        } else {
            showIndicator('  ', 'increase');
        };
    };

    // Set default playback speed (will be synced when video element is detected)
    let currentSpeed = null;

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

    // Play/Pause toggle
    function playPauseVideo() {
        const video = document.querySelector('video');
        if (!video) return;

        if (video.paused) {
            video.play();
            showIndicator(' Play', 'normal');
        } else {
            video.pause();
            showIndicator(' Pause', 'normal');
        };
    };

    // Show current chapter title
    function showChapterTitle() {
        const video = document.querySelector('video');
        if (!video) return;

        const chapterTitle = document.querySelector('div.ytp-chapter-container button.ytp-chapter-title.ytp-button div.ytp-chapter-title-content[title="View chapter"]');
        if (!chapterTitle) {
            showIndicator('No chapter title found', 'decrease');
            return;
        } else {
            showIndicator(`  ${chapterTitle.textContent}`, 'normal');
            return;
        };
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
        // Show chapter title when seeking
        if (e.altKey && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
            setTimeout(() => {
                showChapterTitle();
                return;
            }, 100)
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
            case '=':
                e.preventDefault();
                updateVolume(0.05);
                break;
            case '-':
                e.preventDefault();
                updateVolume(-0.05);
                break;
            case 'm':
                e.preventDefault();
                toggleMute();
                break;
            case 'k':
                e.preventDefault();
                playPauseVideo();
                break;
            case 'j':
                showIndicator(`Skip 󰴪 `, 'decrease');
                break;
            case 'l':
                showIndicator(`Skip 󰵱 `, 'increase');
                break;
            case 'ArrowLeft':
                showIndicator(`Skip 󱇹 `, 'decrease');
                break;
            case 'ArrowRight':
                showIndicator(`Skip 󱇸 `, 'increase');
                break;
        };
    }, true);

    // Event handlers for syncing with YouTube's native controls
    function handleRateChange(e) {
        const video = e.target;
        // Only update our tracking if the change didn't come from our updateSpeed function
        // We detect this by checking if there's a small timing window
        if (Math.abs(video.playbackRate - currentSpeed) > 0.01) {
            currentSpeed = video.playbackRate;
            console.log('Synced playback rate from YouTube UI:', currentSpeed);
        }
    }

    function handleVolumeChange(e) {
        const video = e.target;
        
        // Skip syncing if we're actively enforcing a mute change
        if (muteToggleInProgress) {
            return;
        }

        // Check if this is a mute state change (volume may not change, but muted property does)
        if (video.muted !== currentMuteState) {
            currentMuteState = video.muted;
            console.log('Synced mute state from YouTube UI:', currentMuteState);
        }
        // Only update volume if the actual volume changed (not just mute state)
        if (Math.abs(video.volume - currentVolume) > 0.01) {
            currentVolume = video.volume;
            console.log('Synced volume from YouTube UI:', currentVolume);
        }
    }

    // Setup video element with event listeners and apply stored settings
    function setupVideoElement(video) {
        if (!video) return;

        // Remove listeners from previous video element if it exists
        if (currentVideoElement && currentVideoElement !== video) {
            cleanupVideoElement(currentVideoElement);
        }

        currentVideoElement = video;

        // Apply stored settings to new video (persist across navigation)
        if (currentSpeed !== null) {
            video.playbackRate = currentSpeed;
            console.log('Applied stored playback rate:', currentSpeed);
        } else {
            // First time initialization
            currentSpeed = video.playbackRate;
            console.log('Initialized playback rate:', currentSpeed);
        }

        if (currentVolume !== null) {
            video.volume = currentVolume;
            console.log('Applied stored volume:', currentVolume);
        } else {
            // First time initialization
            currentVolume = video.volume;
            console.log('Initialized volume:', currentVolume);
        }

        if (currentMuteState !== null) {
            video.muted = currentMuteState;
            console.log('Applied stored mute state:', currentMuteState);
        } else {
            // First time initialization
            currentMuteState = video.muted;
            console.log('Initialized mute state:', currentMuteState);
        }

        // Setup volume booster if it was previously enabled
        if (volumeBoosterEnabled) {
            setupVolumeBooster(video);
        }

        // Attach event listeners for bidirectional sync
        video.addEventListener('ratechange', handleRateChange);
        video.addEventListener('volumechange', handleVolumeChange);

        console.log('Video element setup complete');
    }

    // Cleanup function to remove event listeners
    function cleanupVideoElement(video) {
        if (!video) return;
        video.removeEventListener('ratechange', handleRateChange);
        video.removeEventListener('volumechange', handleVolumeChange);
        console.log('Cleaned up old video element listeners');
    }

    // MutationObserver to detect video element changes (YouTube SPA navigation)
    function observeVideoElement() {
        // Try to setup initial video element
        const initialVideo = document.querySelector('video');
        if (initialVideo) {
            setupVideoElement(initialVideo);
        }

        // Watch for video element changes
        const observer = new MutationObserver((mutations) => {
            const video = document.querySelector('video');
            if (video && video !== currentVideoElement) {
                console.log('Detected new video element, setting up...');
                setupVideoElement(video);
            }
        });

        // Observe the entire document for video element changes
        // YouTube's player container can change during navigation
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        console.log('MutationObserver initialized');
    }

    // Initialize video element observation when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', observeVideoElement);
    } else {
        observeVideoElement();
    }

})();
