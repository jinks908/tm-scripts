// ==UserScript==
// @name         Notion Theme
// @namespace    SkyColtNinja/userscripts
// @version      1.3.8-alpha
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Notion_Dark_Theme.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Notion_Dark_Theme.user.js
// @resource     customCSS https://raw.githubusercontent.com/jinks908/tm-scripts/main/Notion_Dark_Theme.css
// @description  A nicer dark theme for Notion
// @author       SkyColtNinja
// @match        https://www.notion.so/skycoltninja/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==


(function() {
    'use strict';

    // Apply CSS
    const customCSS = GM_getResourceText('customCSS');
    GM_addStyle(customCSS);

    // #;# ------------------------------------------------------------ #
    // #:# JavaScript
    // #;# ------------------------------------------------------------ #

    // ## Fixes and Features
    // #& ------------------------------------------------------------ #
    // Fix div colors being overridden by Notion's inline styles (e.g., in databases)
    const targetDivs = document.querySelectorAll('.notion-scroller.vertical div div div div div div');

    targetDivs.forEach(div => {
        // Get the current color of the div
        const currentColor = window.getComputedStyle(div).color;

        // Reapply the color with !important
        div.style.setProperty('color', currentColor, 'important');
    });

    // ## Back to Top Button
    // #& ------------------------------------------------------------ #
    // Create "Back To Top" scroll button
    function createBackToTopButton() {
        const button = document.createElement('button');
        button.className = 'back-to-top-btn';
        // Draw up arrow
        button.innerHTML = `
            <svg viewBox="0 0 16 16" fill="var(--tpr-seafoam)">
                <path d="M8 4.414l-4.293 4.293-1.414-1.414L8 1.586l5.707 5.707-1.414 1.414L8 4.414z"/>
                <path d="M7 14V5h2v9H7z"/>
            </svg>
            Back to Top
        `;

        // Create smooth scroll-to-top event on click
        button.addEventListener('click', () => {
            // Grab Notion's scroller container
            const scrollContainer = document.querySelector('.notion-frame .notion-scroller');
            if (scrollContainer) {
                scrollContainer.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
        return button;
    }

    // Inject button into the sidebar
    function injectBackToTopButton() {
        // Wait for the sidebar to load
        const sidebar = document.querySelector('.notion-sidebar');
        if (!sidebar) {
            setTimeout(injectBackToTopButton, 1000);
            return;
        }

        // Check if button already exists
        if (document.querySelector('.back-to-top-btn')) {
            return;
        }

        // Create and inject button
        const button = createBackToTopButton();

        // Find the bottom section of the sidebar
        const sidebarBottom = sidebar.querySelector('[style*="margin-top: auto"]');
        if (sidebarBottom) {
            sidebarBottom.parentNode.insertBefore(button, sidebarBottom);
        } else {
            sidebar.appendChild(button);
        }
    }

    // Initial injection
    injectBackToTopButton();

    // Re-inject on URL changes (for SPA navigation)
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === 'childList') {
                injectBackToTopButton();
            }
        }
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
