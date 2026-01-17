// ==UserScript==
// @name         YouTube Notifications
// @namespace    SkyColtNinja/userscripts
// @version      1.0.0-alpha
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
            overflow-y: auto;
            padding: 12px 0;
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

    // Wait for the notifications dropdown to appear
    function waitForElement(selector, callback, checkInterval = 100, timeout = 10000) {
        const startTime = Date.now();
        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(interval);
                callback(element);
            } else if (Date.now() - startTime > timeout) {
                clearInterval(interval);
            }
        }, checkInterval);
    }

    // Create and inject the Expand button
    function injectExpandButton() {
        const observer = new MutationObserver((mutations) => {
            const dropdown = document.querySelector('tp-yt-iron-dropdown[aria-label*="Notifications"]');
            if (!dropdown) return;

            // Check if button already exists
            if (dropdown.querySelector('#yt-notifications-expand-btn')) return;

            // Find the header/title area to inject the button
            const menuRenderer = dropdown.querySelector('ytd-multi-page-menu-renderer');
            if (!menuRenderer) return;

            // Look for the header section
            const header = menuRenderer.querySelector('#header');
            if (!header) return;

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

            // Insert the button into the header
            header.appendChild(expandBtn);
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
        const dropdown = document.querySelector('tp-yt-iron-dropdown[aria-label*="Notifications"]');
        if (!dropdown) return;

        createModal();

        const overlay = document.getElementById('yt-notifications-modal-overlay');
        const modalBody = document.getElementById('yt-notifications-modal-body');

        // Clone the notifications content
        const sectionsContainer = dropdown.querySelector('#sections');
        if (sectionsContainer) {
            // Clear previous content
            modalBody.innerHTML = '';

            // Clone the sections
            const clonedSections = sectionsContainer.cloneNode(true);
            modalBody.appendChild(clonedSections);

            // Make all links open in new tabs
            const links = modalBody.querySelectorAll('a');
            links.forEach(link => {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            });
        }

        // Show the modal
        overlay.classList.add('active');
    }

    // Close the modal
    function closeModal() {
        const overlay = document.getElementById('yt-notifications-modal-overlay');
        if (overlay) {
            overlay.classList.remove('active');
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
