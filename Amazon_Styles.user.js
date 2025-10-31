// ==UserScript==
// @name         Amazon Styles
// @namespace    SkyColtNinja/userscripts
// @version      1.2.6-stable
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Amazon_Styles.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Amazon_Styles.user.js
// @resource     customCSS https://raw.githubusercontent.com/jinks908/tm-scripts/main/Amazon_Styles.css
// @description  Enhanced styles for Amazon Dark Mode
// @author       Clayton Jinks
// @match        https://www.amazon.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_getResourceText
// ==/UserScript==

(function() {
    'use strict';

    // Get root styles (for dark mode check)
    const computedStyle = getComputedStyle(document.documentElement);

    function injectStyles() {
        // Fix darkened images on suggestion carousels
        document.querySelectorAll('*').forEach(element => {
            if (window.getComputedStyle(element).mixBlendMode === 'multiply') {
                element.style.mixBlendMode = 'normal';
            }
        });

        window.addEventListener('load', function() {
            const customCSS = GM_getResourceText('customCSS');
            const styleSheet = document.createElement('style');
            styleSheet.innerHTML = customCSS;
            // styleSheet.innerHTML += ` `;
            document.documentElement.appendChild(styleSheet);
        });
    };

    // If Dark Mode is enabled, inject custom styles
    if (computedStyle.colorScheme === 'dark') {
        console.log("Dark Mode detected");
        injectStyles();
    };

})();
