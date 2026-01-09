// ==UserScript==
// @name         YouTube Clear Playlist
// @namespace    SkyColtNinja/userscripts
// @version      1.2.8
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/YouTube_Clear_Playlist.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/YouTube_Clear_Playlist.user.js
// @description  Clear all videos from a YouTube playlist
// @author       SkyColtNinja
// @match        https://www.youtube.com/playlist*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==


(function() {
    'use strict';

    // Killswitch
    let stop = false;

    // Progress tracking
    let totalVideos = null;
    let videosRemoved = 0;
    let progressElement = null;

    // Toast notification styles
    GM_addStyle(`
        .youtube-clear-playlist-toast {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #121c2a;
            color: #ffffff;
            font-size: 20px;
            font-weight: 500;
            padding: 24px;
            border-radius: 12px;
            font-family: "Google Sans", "Roboto", sans-serif;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            z-index: 10000;
            min-width: 300px;
            text-align: center;
            animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .youtube-clear-playlist-toast.fadeOut {
            animation: fadeOut 0.3s ease-out forwards;
        }
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translateY(20px);
            }
        }
        .youtube-clear-playlist-progress {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #121c2a;
            color: #ffffff;
            padding: 24px;
            border-radius: 12px;
            font-family: "Google Sans", "Roboto", sans-serif;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            z-index: 10000;
            min-width: 300px;
            text-align: center;
            animation: slideIn 0.3s ease-out;
        }
        .youtube-clear-playlist-progress.fadeOut {
            animation: fadeOut 0.3s ease-out forwards;
        }
        .youtube-clear-playlist-progress-bar {
            width: 100%;
            height: 8px;
            background: #e0e0e0;
            border-radius: 4px;
            margin-top: 16px;
            overflow: hidden;
        }
        .youtube-clear-playlist-progress-fill {
            height: 100%;
            width: 0%;
            transition: width 0.3s ease;
        }
        .youtube-clear-playlist-progress-text {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 8px;
        }
    `);

    // Function to show toast notification
    function showToast(message, textColor, persist = false) {

        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'youtube-clear-playlist-toast';
        toast.textContent = message;
        toast.style.color = textColor || '#ffffff';
        document.body.appendChild(toast);

        if (!persist) {
            setTimeout(() => {
                toast.classList.add('fadeOut');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, 3000);
        };
    };

    // Function to extract total video count from playlist metadata
    function getTotalVideoCount() {
        let metadataStats = document.querySelector('.metadata-stats');

        // Watch Later playlist
        if (metadataStats) {
            // Look for video count under video metadata
            const spans = metadataStats.querySelectorAll('span.style-scope.yt-formatted-string');

            for (let span of spans) {
                const text = span.textContent.trim();
                // Match numbers only
                const match = text.match(/^\d+$/);
                if (match) {
                    return parseInt(match[0]);
                };
            };

        } else {
            // Other playlists
            const metadataRows = document.querySelectorAll('div.yt-content-metadata-view-model__metadata-row')

            if (metadataRows.length < 2) return null;

            metadataStats = metadataRows[1];
            const spans = metadataStats.querySelectorAll('span.yt-core-attributed-string');

            for (let span of spans) {
                const text = span.textContent.trim();
                // Match pattern "<num> videos"
                let match = text.match(/(\d+)\s+videos/);
                if (match) {
                    return parseInt(match[0]);
                };
            };

        };

        // If video count not found, fallback to counting (visible) menu buttons
        // NOTE: This may be inaccurate if not all videos are loaded
        const menuButtons = document.querySelectorAll('div#contents button[aria-label="Action menu"]');
        if (menuButtons.length > 0) {
            return menuButtons.length;
        };

        return null;
    };

    // Function to show/update progress meter
    function showProgressMeter(current, total) {
        if (!progressElement) {
            progressElement = document.createElement('div');
            progressElement.className = 'youtube-clear-playlist-progress';
            progressElement.innerHTML = `
                <div class="youtube-clear-playlist-progress-text"></div>
                <div class="youtube-clear-playlist-progress-bar">
                    <div class="youtube-clear-playlist-progress-fill"></div>
                </div>
            `;
            document.body.appendChild(progressElement);
        };

        const textElement = progressElement.querySelector('.youtube-clear-playlist-progress-text');
        const fillElement = progressElement.querySelector('.youtube-clear-playlist-progress-fill');

        // Set progress color based on completion percentage
        function getProgressColor(percentage) {
            if (percentage < 35) return '#ff5f5f';
            if (percentage < 50) return '#ff875f';
            if (percentage < 80) return '#f6be55';
            if (percentage < 90) return '#a6e87d';
            return '#46fc8f';
        };

        if (total) {
            const percentage = (current / total) * 100;
            textElement.textContent = `${current}/${total} videos removed`;
            fillElement.style.width = `${percentage}%`;
            fillElement.style.backgroundColor = getProgressColor(percentage);
            fillElement.style.transition = 'width 0.3s ease, background-color 0.5s ease';
        } else {
            textElement.textContent = `${current} videos removed`;
        };
    };

    // Function to hide progress meter
    function hideProgressMeter() {
        if (progressElement) {
            progressElement.classList.add('fadeOut');
            setTimeout(() => {
                if (progressElement && progressElement.parentNode) {
                    progressElement.remove();
                };
                progressElement = null;
            }, 300);
        };
    };

    function clearWatchLater() {
        // To stop process, set `stop = true;` in the console
        if (stop) {
            console.log('Process Stopped (Ctrl+K to resume)');
            hideProgressMeter();
            showToast('Process Stopped (Ctrl+K to resume)', '#f6be55', false);
            stop = false;
            videosRemoved = 0;
            totalVideos = null;
            return;
        };

        // Look for the three-dot menu buttons on each video
        const menuButtons = document.querySelectorAll('div#contents button[aria-label="Action menu"]');

        if (menuButtons.length > 0) {
            // Click the first menu button
            menuButtons[0].click();

            // Wait for menu to appear, then find "Remove from Watch later" option
            setTimeout(() => {
                // Try multiple selectors to find the remove button
                let removeButton = null;

                // Method 1: Look for span containing "Remove from " text
                const spans = document.querySelectorAll('ytd-menu-service-item-renderer span.yt-formatted-string');
                for (let span of spans) {
                    // Note the space after "from" to avoid partial matches
                    if (span.textContent.includes('Remove from ')) {
                        // Find the clickable parent element (often a role="menuitem", but in this case it's role="option")
                        removeButton = span.closest('[role="option"]') || span.closest('button') || span.closest('a');
                        break;
                    };
                };

                // Method 2: Fallback - look for any element with "Remove from" text
                if (!removeButton) {
                    const allElements = document.querySelectorAll('ytd-menu-renderer *');
                    for (let element of allElements) {
                        if (element.textContent && element.textContent.includes('Remove from')) {
                            removeButton = element.closest('[role="menuitem"]') || element.closest('button') || element.closest('a') || element;
                            break;
                        };
                    };
                };

                if (removeButton) {
                    removeButton.click();
                    console.log('Removed video from Watch Later');
                    videosRemoved++;
                    showProgressMeter(videosRemoved, totalVideos);
                    // Wait a bit then call function again for next video
                    setTimeout(clearWatchLater, 500);
                } else {
                    console.log('Could not find Remove button, trying again...');
                    // Try again after a short delay in case the menu hasn't fully loaded
                    setTimeout(clearWatchLater, 1000);
                }
            }, 300); // Increased delay slightly
        } else {
            console.log('All videos cleared.');

            hideProgressMeter();
            videosRemoved = 0;
            totalVideos = null;

            setTimeout(() => {
                showToast('Process Complete (All videos cleared)', '#6cefa0', false);
            }, 500);

            // Restore popup visibility
            GM_addStyle(`
                ytd-popup-container.style-scope.ytd-app {
                    visibility: visible;
                }
            `);

        };
    };

    // Keybinding (Ctrl+d)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            // Initialize progress meter
            totalVideos = getTotalVideoCount();
            videosRemoved = 0;
            showProgressMeter(0, totalVideos);
            clearWatchLater();
            // Hide popup visibility
            GM_addStyle(`
                ytd-popup-container.style-scope.ytd-app {
                    visibility: hidden;
                }
            `);
        };
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            // Killswitch
            stop = true;
            // Restore popup visibility
            GM_addStyle(`
                ytd-popup-container.style-scope.ytd-app {
                    visibility: visible;
                }
            `);
        };
    });

})();
