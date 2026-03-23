// ==UserScript==
// @name         Google Docs
// @namespace    SkyColtNinja/userscripts
// @version      1.2.1
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Google_Docs.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Google_Docs.user.js
// @description  Automatically set zoom to "Fit" using keybinding
// @author       SkyColtNinja
// @match        https://docs.google.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {

    // Simulate mouse click sequence --> mousedown, mouseup, click
    function simulateClick(element) {
        // Pass the element's window to ensure correct event context
        const elementWindow = element.ownerDocument.defaultView;
        ['mousedown', 'mouseup', 'click'].forEach(eventType => {
            element.dispatchEvent(new MouseEvent(eventType, {
                bubbles: true,
                cancelable: true,
                view: elementWindow,
            }));
        });
    };

    // Wait for the menu to appear by observing DOM changes and style changes
    function waitForMenu(callback) {
        const observer = new MutationObserver(() => {
            const item = [...document.querySelectorAll('.goog-menuitem')]
                .find(el => el.offsetParent !== null);
            if (item) {
                observer.disconnect();
                callback();
            };
        });
        // Watch for both DOM additions and style attribute changes
        observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });
    };

    // Main function
    function setZoomFit() {
        const zoomInput = document.querySelector('#zoomSelect input.goog-toolbar-combo-button-input');
        if (!zoomInput) {
            console.log('Zoom input not found');
            return;
        };

        zoomInput.focus();
        zoomInput.click();

        // After clicking, wait for the menu to appear and then find the visible "Fit" option
        waitForMenu(() => {
            // Search for 'Fit' option in dropdown menu
            const fitOption = [...document.querySelectorAll('.goog-menuitem')]
                .find(el => el.offsetParent !== null && el.textContent.trim().startsWith('Fit'));

            if (fitOption) {
                simulateClick(fitOption); // Ensure it's focused
                setTimeout(() => {
                    fitOption.focus();
                    // NOTE: We still need to press 'Esc' to close the menu
                    fitOption.dispatchEvent(new KeyboardEvent('keydown', {
                        key: 'ArrowUp',
                        code: 'ArrowUp',
                        keyCode: 38,
                        which: 38,
                        bubbles: true,
                        cancelable: true,
                    }));
                }, 500);
            } else {
                console.log('Fit option not found in visible menu');
            };
        });
    };

    // Attach key listener to the iframe where the editor is loaded
    function attachKeyListener(iframe) {
        iframe.contentWindow.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                setZoomFit();
            };
        });
        console.log('Key listener attached to iframe');
    };

    // Watch for the iframe to be added to the DOM and attach the key listener
    function watchForIframe() {
        // Check if the iframe already exists (in case the script runs after it has loaded)
        const existing = document.querySelector('.docs-texteventtarget-iframe');
        if (existing) attachKeyListener(existing);

        // Observe DOM changes to find the iframe when it is added
        const observer = new MutationObserver(() => {
            const iframe = document.querySelector('.docs-texteventtarget-iframe');
            if (iframe && !iframe.dataset.listenerAttached) {
                iframe.dataset.listenerAttached = 'true';
                attachKeyListener(iframe);
            };
        });

        observer.observe(document.body, { childList: true, subtree: true });
    };

    // Start watching for the iframe
    watchForIframe();

    // Wait for DOM to load, then initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setZoomFit);
    } else {
        setZoomFit(); // Set zoom to Fit on initial load
    };

})();
