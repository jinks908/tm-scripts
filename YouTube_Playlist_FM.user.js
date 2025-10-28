// ==UserScript==
// @name         YouTube Playlist Float (Firemonkey compatible)
// @namespace    SkyColtNinja/userscripts
// @version      1.4.4-stable
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/YouTube_Playlist_FM.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/YouTube_Playlist_FM.user.js
// @description  Keep the "Save to playlist" menu open while selecting
// @match        https://www.youtube.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
        yt-sheet-view-model.ytSheetViewModelHost.ytSheetViewModelContextual {
            max-height: 75% !important;
            width: 90% !important;
        }
        yt-contextual-sheet-layout.ytContextualSheetLayoutHost {
            height: 60vh !important;
        }
    `);

    // Inject functional script into the page
    const script = document.createElement('script');
    script.textContent = '(' + function() {

        // Get bottom of viewport
        const winBottom = window.innerHeight || document.documentElement.clientHeight;

        // Initialize
        let menuObserver = null;
        let isPlaylistMenuOpen = false;
        let playlistMenuElement = null;
        let playlistToggleListeners = new Map();

        // SVG path data
        const savedIcon = 'M19 2H5a2 2 0 00-2 2v16.887c0 1.266 1.382 2.048 2.469 1.399L12 18.366l6.531 3.919c1.087.652 2.469-.131 2.469-1.397V4a2 2 0 00-2-2Z';
        const unsavedIcon = 'M19 2H5a2 2 0 00-2 2v16.887c0 1.266 1.382 2.048 2.469 1.399L12 18.366l6.531 3.919c1.087.652 2.469-.131 2.469-1.397V4a2 2 0 00-2-2ZM5 20.233V4h14v16.233l-6.485-3.89-.515-.309-.515.309L5 20.233Z';

        // Swap SVG icon state
        function toggleIcon(pathElement, saveToList) {
            if (saveToList) {
                pathElement.setAttribute('d', savedIcon);
            } else {
                pathElement.setAttribute('d', unsavedIcon);
            };
        };

        // Reset SVG icon to match current (official) state
        function resetToggle(pathElement, currentState) {
            if (currentState) {
                pathElement.setAttribute('d', savedIcon);
            } else {
                pathElement.setAttribute('d', unsavedIcon);
            };
        };

        // Function to keep menu open by overriding the close behavior
        function keepMenuOpen(menu) {
            if (!menu) return;

            // Find the iron-dropdown element which controls visibility
            const dropdown = menu;

            // Store YouTube's original close/hide methods
            if (dropdown.close) {
                dropdown._originalClose = dropdown.close;
                dropdown.close = function() {
                    // Prevent close
                };
            };

            if (dropdown.hide) {
                dropdown._originalHide = dropdown.hide;
                dropdown.hide = function() {
                    // Prevent hide
                };
            };

            // Prevent the opened attribute from being removed
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'opened') {
                        if (!dropdown.hasAttribute('opened')) {
                            dropdown.setAttribute('opened', '');
                        };
                    };
                });
            });

            observer.observe(dropdown, {
                attributes: true,
                attributeFilter: ['opened']
            });

            // Store observer so we can disconnect it later
            dropdown._keepOpenObserver = observer;

            // Remove old listeners first
            playlistToggleListeners.forEach((listener, element) => {
                element.removeEventListener('click', listener);
            });
            playlistToggleListeners.clear();

            // Reset all playlist icons to match their current state (in YouTube's UI)
            let playlistToggles = document.querySelectorAll('yt-list-item-view-model[role="listitem"]');
            playlistToggles.forEach(toggle => {
                const pathElement = toggle.querySelector('path');
                if (pathElement) {
                    resetToggle(pathElement, toggle.getAttribute('aria-pressed') === 'true');
                };
            });

            // Add our own click handlers for each playlist
            playlistToggles.forEach(toggle => {
                const clickHandler = function(event) {
                    event.stopPropagation();
                    event.preventDefault();

                    // Read current save state and toggle it
                    const currentState = this.getAttribute('aria-pressed') === 'true';
                    const newState = !currentState;

                    // Update the save icon
                    toggleIcon(this.querySelector('path'), newState);

                    // Manually trigger YouTube's save by clicking the inner button
                    const innerButton = this.querySelector('button');
                    if (innerButton) {
                        // Create and dispatch a new click event on the actual button
                        innerButton.dispatchEvent(new MouseEvent('click', { bubbles: false }));
                    };
                };

                // Attach the event listener and store it
                toggle.addEventListener('click', clickHandler);
                playlistToggleListeners.set(toggle, clickHandler);
            });
        };

        // Restore normal menu behavior
        function restoreMenuBehavior(menu) {
            if (!menu) return;

            if (menu._originalClose) {
                menu.close = menu._originalClose;
            };
            if (menu._originalHide) {
                menu.hide = menu._originalHide;
            };
            if (menu._keepOpenObserver) {
                menu._keepOpenObserver.disconnect();
            };

            // Remove previous 'bottom' setting
            menu.style.removeProperty('bottom');
        };

        // Wait for playlist menu to appear
        function watchForPlaylistMenu() {
            const observer = new MutationObserver(function(mutations) {
                let playlistMenu = null;
                // Look for the playlist menu popup
                const menus = document.querySelectorAll('span.yt-core-attributed-string');
                for (let menu of menus) {
                    if (menu.textContent.includes('Save to')) {
                        playlistMenu = menu.closest('tp-yt-iron-dropdown.style-scope.ytd-popup-container');
                        if (playlistMenu) {
                            break;
                        };
                    };
                };

                // If menu found, set it to open
                if (playlistMenu && !isPlaylistMenuOpen) {
                    isPlaylistMenuOpen = true;
                    playlistMenuElement = playlistMenu;

                    // Wait for render
                    setTimeout(() => {
                        const rect = playlistMenu.getBoundingClientRect();
                        // Adjust position if menu is off-screen
                        if (rect.bottom >= winBottom) {
                            playlistMenu.style.setProperty('bottom', '100px', 'important');
                            playlistMenu.style.removeProperty('top');
                        };
                        keepMenuOpen(playlistMenu);
                    }, 500);

                // If menu is gone and it was open, restore behavior
                } else if (!playlistMenu && isPlaylistMenuOpen) {
                    // Clear our custom event listeners
                    playlistToggleListeners.forEach((listener, element) => {
                        element.removeEventListener('click', listener);
                    });
                    playlistToggleListeners.clear();

                    // Declare menu closed
                    isPlaylistMenuOpen = false;
                    playlistMenuElement = null;
                };
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            return observer;
        };

        // Let clicks outside the menu close it
        document.addEventListener('click', function(e) {
            if (!isPlaylistMenuOpen || !playlistMenuElement) return;

            // If outside click, restore menu behavior and close
            if (!playlistMenuElement.contains(e.target)) {
                restoreMenuBehavior(playlistMenuElement);

                // Remove event listeners
                playlistToggleListeners.forEach((listener, element) => {
                    element.removeEventListener('click', listener);
                });
                playlistToggleListeners.clear();

                // Manually close the menu
                // Note: This reverts to YouTube's original close function (which we've blocked until now)
                if (playlistMenuElement._originalClose) {
                    playlistMenuElement._originalClose();
                } else if (playlistMenuElement.close) {
                    playlistMenuElement.close();
                };

                isPlaylistMenuOpen = false;
                playlistMenuElement = null;
            };
        }, true);

        // Start watching on page load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                menuObserver = watchForPlaylistMenu();
            });
        } else {
            menuObserver = watchForPlaylistMenu();
        };

    } + ')();';
    document.documentElement.appendChild(script);
    script.remove();
})();
