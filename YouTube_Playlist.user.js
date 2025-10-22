// ==UserScript==
// @name         YouTube Playlist Float
// @namespace    SkyColtNinja/userscripts
// @version      1.2.1-alpha
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/YouTube_Playlist.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/YouTube_Playlist.user.js
// @description  Fix icon toggles for other playlists within the same DOM load
// @author       SkyColtNinja
// @match        https://www.youtube.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // TODO
    // #:: Refresh the playlist menu/contents when a different playlist menu is selected

    let menuObserver = null;
    let isPlaylistMenuOpen = false;
    let playlistMenuElement = null;
    let playlistToggleListeners = new Map();

    // Function to keep menu open by overriding the close behavior
    function keepMenuOpen(menu) {
        if (!menu) return;
        console.log('Keeping menu open');

        // Find the iron-dropdown element which controls visibility
        const dropdown = menu;

        // Override the close/hide methods
        if (dropdown.close) {
            dropdown._originalClose = dropdown.close;
            dropdown.close = function() {
                console.log('Close prevented');
                // Don't actually close
            };
        }

        if (dropdown.hide) {
            dropdown._originalHide = dropdown.hide;
            dropdown.hide = function() {
                console.log('Hide prevented');
                // Don't actually hide
            };
        }

        // Prevent the opened attribute from being removed
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'opened') {
                    if (!dropdown.hasAttribute('opened')) {
                        console.log('Re-opening dropdown');
                        dropdown.setAttribute('opened', '');
                    }
                }
            });
        });

        observer.observe(dropdown, {
            attributes: true,
            attributeFilter: ['opened']
        });

        // Store observer so we can disconnect it later
        dropdown._keepOpenObserver = observer;

        function toggleIcon(pathElement, saved) {
            if (saved) {
                pathElement.setAttribute('d', 'M18 4v15.06l-5.42-3.87-.58-.42-.58.42L6 19.06V4h12m1-1H5v18l7-5 7 5V3z');
                console.log('Video removed from playlist');
            } else {
                pathElement.setAttribute('d', 'M19 3H5v18l7-5 7 5V3z');
                console.log('Video saved to playlist');
            }
        }

        // TODO -> Assign unique IDs to each playlist
        // ! -------------------------------------------------------------

        // Get all icon spans
        const playlistToggles = document.querySelectorAll('yt-list-item-view-model[role="listitem"]');
        const playlistToggleNames = new Set();
        // console.log(playlistToggles);

        // Assign unique IDs based on playlist names
        for (let i = 0; i < playlistToggles.length; i++) {
            const idName = playlistToggles[i]._signalValues[3].replaceAll(' ', '').replaceAll(',', '');
            playlistToggles[i].setAttribute('id', idName);
        };

        // ! -------------------------------------------------------------

        // Remove old event listeners first
        playlistToggleListeners.forEach((listener, element) => {
            element.removeEventListener('click', listener);
        });
        playlistToggleListeners.clear();

        // Add click event listener to each span
        playlistToggles.forEach(span => {
            const clickHandler = function(event) {
                let isSaved = this.getAttribute('aria-pressed') === 'true';
                console.log('Saved to ' + this.getAttribute('aria-label') + ': ', isSaved);
                this.setAttribute('aria-pressed', isSaved ? 'false' : 'true');
                console.log('Toggled aria-pressed to: ', !isSaved);
                toggleIcon(this.querySelector('path'), isSaved);
            };

            span.addEventListener('click', clickHandler);
            playlistToggleListeners.set(span, clickHandler);
        });
    }


    // Function to restore normal menu behavior
    function restoreMenuBehavior(menu) {
        if (!menu) return;
        console.log('Restoring normal menu behavior');

        if (menu._originalClose) {
            menu.close = menu._originalClose;
        }
        if (menu._originalHide) {
            menu.hide = menu._originalHide;
        }
        if (menu._keepOpenObserver) {
            menu._keepOpenObserver.disconnect();
        }
    }

    // Watch for playlist menu to appear
    function watchForPlaylistMenu() {
        console.log('Starting to watch for playlist menu');
        const observer = new MutationObserver(function(mutations) {
            // Look for the playlist menu popup
            let playlistMenu = null;

            const menus = document.querySelectorAll('span.yt-core-attributed-string');
            for (let menu of menus) {
                if (menu.textContent.includes('Save to')) {
                    playlistMenu = menu.closest('tp-yt-iron-dropdown.style-scope.ytd-popup-container');
                    if (playlistMenu) {
                        break;
                    }
                }
            }

            if (playlistMenu && !isPlaylistMenuOpen) {
                isPlaylistMenuOpen = true;
                playlistMenuElement = playlistMenu;
                console.log('Playlist menu detected, keeping it open');

                // Wait a moment for menu to fully render
                setTimeout(() => {
                    keepMenuOpen(playlistMenu);
                }, 100);
            } else if (!playlistMenu && isPlaylistMenuOpen) {
                isPlaylistMenuOpen = false;
                playlistMenuElement = null;
                console.log('Playlist menu closed');
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        return observer;
    }

    // Handle clicks outside the menu to allow manual closing
    document.addEventListener('click', function(e) {
        if (!isPlaylistMenuOpen || !playlistMenuElement) return;

        // Check if click is outside the menu
        if (!playlistMenuElement.contains(e.target)) {
            console.log('Click outside menu detected, allowing close');
            restoreMenuBehavior(playlistMenuElement);

            // Manually close the menu
            if (playlistMenuElement._originalClose) {
                playlistMenuElement._originalClose();
            } else if (playlistMenuElement.close) {
                playlistMenuElement.close();
            }

            isPlaylistMenuOpen = false;
            playlistMenuElement = null;
        }
    }, true);

    // Start watching when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            menuObserver = watchForPlaylistMenu();
        });
    } else {
        menuObserver = watchForPlaylistMenu();
    }
})();
