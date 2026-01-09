// ==UserScript==
// @name         YouTube Clear Playlist
// @namespace    SkyColtNinja/userscripts
// @version      1.0.0-alpha
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

    // Function to show toast notification
    function showToast(message, persist = false) {

        // Create toast element
        const toast = document.createElement('div');

        toast.className = 'youtube-clear-playlist-toast';
        toast.textContent = message;
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

    function clearWatchLater() {
        // To stop process, set `stop = true;` in the console
        if (stop) {
            console.log('Script stopped by user');
            showToast('Script stopped by user', false);
            return;
        }

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
                    }
                }

                // Method 2: Fallback - look for any element with "Remove from" text
                if (!removeButton) {
                    const allElements = document.querySelectorAll('ytd-menu-renderer *');
                    for (let element of allElements) {
                        if (element.textContent && element.textContent.includes('Remove from')) {
                            removeButton = element.closest('[role="menuitem"]') || element.closest('button') || element.closest('a') || element;
                            break;
                        }
                    }
                }

                if (removeButton) {
                    removeButton.click();
                    console.log('Removed video from Watch Later');
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
            setTimeout(() => {
                showToast('All videos cleared.', false);
            }, 500);
        }
    }

    // Keybinding (Ctrl+d)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            clearWatchLater();
        };
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            // Killswitch
            stop = true;
        };
    });

})();
