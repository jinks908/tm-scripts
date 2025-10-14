// ==UserScript==
// @name         Suspend All Other Workona Tabs
// @namespace    http://tampermonkey.net/
// @version      2024-03-01
// @description  Automatically suspends all tabs (except current) in Workona
// @author       SkyColtNinja
// @match        moz-extension://2c875abd-5a8a-474f-9c91-d1ad15f0e82a/popup.html
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    function clickSuspendOption() {
        // Method 1: Find by text content (most reliable)
        const suspendDiv = Array.from(document.querySelectorAll('div')).find(div => 
            div.textContent.includes('Suspend all other tabs')
        );

        if (suspendDiv) {
            console.log('Found suspend div, clicking...');
            suspendDiv.click();
            // Optional: close popup after clicking
            setTimeout(() => window.close(), 100);
            return true;
        }

        // Method 2: Fallback to class selector
        const suspendDivByClass = document.querySelector('.style_item_dyueh.style_itemPaddingRegular_QcaEz.style_largeText_r1pEL');
        if (suspendDivByClass && suspendDivByClass.textContent.includes('Suspend all other tabs')) {
            console.log('Found suspend div by class, clicking...');
            suspendDivByClass.click();
            setTimeout(() => window.close(), 100);
            return true;
        }

        return false;
    }

    // Try immediately if DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(clickSuspendOption, 50); // Small delay for rendering
        });
    } else {
        setTimeout(clickSuspendOption, 50);
    }
})();
