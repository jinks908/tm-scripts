// ==UserScript==
// @name         YouTube Keep Playlist Menu Open
// @namespace    SkyColtNinja/userscripts
// @version      1.0.0
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/YouTube_Keep_Playlist_Menu_Open.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/YouTube_Keep_Playlist_Menu_Open.user.js
// @description  Keeps the Save to Playlist menu open when selecting playlists
// @author       SkyColtNinja
// @match        https://www.youtube.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let menuObserver = null;
    let isPlaylistMenuOpen = false;

    // Function to prevent menu from closing
    function preventMenuClose(menu) {
        if (!menu) return;
        console.log('Playlist menu found')

        // Find all playlist checkboxes
        const checkboxes = menu.querySelectorAll('yt-list-item-view-model.yt-list-item-view-model');

        checkboxes.forEach(checkbox => {
            // Remove existing listeners by cloning
            const newCheckbox = checkbox.cloneNode(true);
            checkbox.parentNode.replaceChild(newCheckbox, checkbox);

            // Add new click handler that stops propagation
            newCheckbox.addEventListener('click', function(e) {
                e.stopPropagation();
                // Toggle the checkbox manually
                if (newCheckbox.hasAttribute('checked')) {
                    newCheckbox.removeAttribute('checked');
                } else {
                    newCheckbox.setAttribute('checked', '');
                }
            }, true);
        });


        // Also prevent clicks on the menu items from closing
        const menuItems = menu.querySelectorAll('toggleable-list-item-view-model');
        menuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
            }, true);
        });
    }

    // Watch for playlist menu to appear
    function watchForPlaylistMenu() {
        console.log('Starting to watch for playlist menu');
        const observer = new MutationObserver(function(mutations) {
            // Look for the playlist menu popup
            const menus = document.querySelectorAll('span.yt-core-attributed-string')
            for (let menu of menus) {
                // Check if span contains at least "Save to"
                if (menu.textContent.includes('Save to')) {
                    const playlistMenu = menu.closest('tp-yt-iron-dropdown.style-scope.ytd-popup-container');
                    console.log('Found playlist menu');
                };
            };

            if (playlistMenu && !isPlaylistMenuOpen) {
                isPlaylistMenuOpen = true;
                console.log('Playlist menu detected, preventing auto-close');

                // Wait a moment for menu to fully render
                setTimeout(() => {
                    preventMenuClose(playlistMenu);
                }, 100);
            } else if (!playlistMenu && isPlaylistMenuOpen) {
                isPlaylistMenuOpen = false;
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
        const playlistMenu = document.querySelector('ytd-add-to-playlist-renderer');
        if (playlistMenu && !playlistMenu.contains(e.target)) {
            // Click is outside the menu, allow it to close naturally
            isPlaylistMenuOpen = false;
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
