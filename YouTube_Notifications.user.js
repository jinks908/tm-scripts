// ==UserScript==
// @name         YouTube Notifications
// @namespace    SkyColtNinja/userscripts
// @version      1.1.3-alpha
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/YouTube_Notifications.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/YouTube_Notifications.user.js
// @description  Expands notifications panel to full page for easier viewing
// @author       SkyColtNinja
// @match        https://www.youtube.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==


(function() {
    'use strict';

    // Store reference to original parent for restoration
    let originalParent = null;
    let movedContainer = null;

    // Add custom styles for the modal overlay
    GM_addStyle(`
        #yt-notifications-modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 9999;
            justify-content: center;
            align-items: center;
        }

        #yt-notifications-modal-overlay.active {
            display: flex;
        }

        #yt-notifications-modal-content {
            width: 90%;
            height: 90%;
            background-color: var(--yt-spec-menu-background);
            border-radius: 12px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            box-shadow: 0 4px 32px rgba(0, 0, 0, 0.4);
        }

        #yt-notifications-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 24px;
            border-bottom: 1px solid var(--yt-spec-10-percent-layer);
        }

        #yt-notifications-modal-header h2 {
            margin: 0;
            font-size: 20px;
            font-weight: 500;
            color: var(--yt-spec-text-primary);
        }

        #yt-notifications-modal-close {
            background: none;
            border: none;
            cursor: pointer;
            padding: 8px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--yt-spec-text-secondary);
        }

        #yt-notifications-modal-close:hover {
            background-color: var(--yt-spec-badge-chip-background);
        }

        #yt-notifications-modal-body {
            flex: 1;
            overflow: hidden;
            padding: 0;
            position: relative;
            display: flex;
            flex-direction: column;
        }

        /* Let container handle its own scrolling for infinite scroll to work */
        #yt-notifications-modal-body #container {
            height: 100%;
            width: 100%;
            overflow-y: auto !important;
            overflow-x: hidden !important;
            max-height: none !important;
        }

        #yt-notifications-modal-body #sections {
            max-height: none !important;
        }

        #yt-notifications-expand-btn {
            cursor: pointer;
            padding: 8px;
            margin-left: 8px;
            background: none;
            border: none;
            color: var(--yt-spec-text-secondary);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
        }

        #yt-notifications-expand-btn:hover {
            background-color: var(--yt-spec-badge-chip-background);
        }

        #yt-notifications-expand-btn svg {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }
    `);

    // Create and inject the Expand button
    function injectExpandButton() {
        const observer = new MutationObserver((mutations) => {
            // Use the specific menu-style attribute to identify notifications dropdown
            const notificationsMenu = document.querySelector(
                'ytd-multi-page-menu-renderer[menu-style="multi-page-menu-style-type-notifications"]'
            );

            if (!notificationsMenu) return;

            // Check if button already exists
            if (notificationsMenu.querySelector('#yt-notifications-expand-btn')) return;

            // Find the buttons container in the header
            const buttonsContainer = notificationsMenu.querySelector('#header #buttons');
            if (!buttonsContainer) return;

            // Create expand button
            const expandBtn = document.createElement('button');
            expandBtn.id = 'yt-notifications-expand-btn';
            expandBtn.title = 'Expand notifications';
            expandBtn.innerHTML = `
                <svg viewBox="0 0 24 24">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
            `;

            expandBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openExpandedView();
            });

            // Insert the button before the Settings button (as first child)
            buttonsContainer.insertBefore(expandBtn, buttonsContainer.firstChild);
        });

        // Observe the document for the dropdown appearing
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Create the modal overlay
    function createModal() {
        if (document.getElementById('yt-notifications-modal-overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'yt-notifications-modal-overlay';

        const modalContent = document.createElement('div');
        modalContent.id = 'yt-notifications-modal-content';

        const modalHeader = document.createElement('div');
        modalHeader.id = 'yt-notifications-modal-header';
        modalHeader.innerHTML = `
            <h2>Notifications</h2>
            <button id="yt-notifications-modal-close" title="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
            </button>
        `;

        const modalBody = document.createElement('div');
        modalBody.id = 'yt-notifications-modal-body';

        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        overlay.appendChild(modalContent);
        document.body.appendChild(overlay);

        // Close button handler
        document.getElementById('yt-notifications-modal-close').addEventListener('click', closeModal);

        // Click outside to close
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // Open the expanded view
    function openExpandedView() {
        console.log('Opening expanded view...');

        // Use the specific menu-style attribute to find notifications
        const notificationsMenu = document.querySelector(
            'ytd-multi-page-menu-renderer[menu-style="multi-page-menu-style-type-notifications"]'
        );

        if (!notificationsMenu) {
            console.error('Notifications menu not found');
            return;
        }
        console.log('Notifications menu found:', notificationsMenu);

        createModal();

        const overlay = document.getElementById('yt-notifications-modal-overlay');
        const modalBody = document.getElementById('yt-notifications-modal-body');

        // Find the container to move
        const container = notificationsMenu.querySelector('#container');
        console.log('Container found:', container);

        if (container) {
            // Clear previous content
            modalBody.innerHTML = '';

            // Store reference to original parent for restoration
            originalParent = container.parentElement;
            movedContainer = container;

            console.log('Original parent:', originalParent);

            // MOVE the container (not clone) - this preserves all shadow DOM and functionality
            modalBody.appendChild(container);

            console.log('Container moved to modal');

            // Make all links open in new tabs
            const links = modalBody.querySelectorAll('a');
            console.log('Found links:', links.length);
            links.forEach(link => {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            });
        } else {
            console.error('Container not found in notifications menu');
        }

        // Show the modal
        overlay.classList.add('active');
        console.log('Modal should now be visible');
    }

    // Close the modal
    function closeModal() {
        console.log('Closing modal...');

        const overlay = document.getElementById('yt-notifications-modal-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }

        // Restore the container back to its original location
        if (movedContainer && originalParent) {
            console.log('Restoring container to original location');
            originalParent.appendChild(movedContainer);

            // Reset references
            movedContainer = null;
            originalParent = null;

            console.log('Container restored');
        }
    }

    // Initialize the script
    function init() {
        injectExpandButton();
    }

    // Wait for YouTube to load, then initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
