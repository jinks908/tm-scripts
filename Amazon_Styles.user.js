// ==UserScript==
// @name         Amazon Styles
// @namespace    SkyColtNinja/userscripts
// @version      1.2.3-alpha
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Amazon_Styles.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Amazon_Styles.user.js
// @resource     customCSS https://raw.githubusercontent.com/jinks908/tm-scripts/main/Amazon_Styles.css
// @description  Corrections and styles for Dark Mode Amazon theme
// @author       Clayton Jinks
// @match        https://www.amazon.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

(function() {
    'use strict';

    // Inject the external CSS
    const customCSS = GM_getResourceText('customCSS');

    // Get root styles
    const computedStyle = getComputedStyle(document.documentElement);

    function injectStyles() {
        // Fix darkened images on suggestion carousels
        document.querySelectorAll('*').forEach(element => {
            if (window.getComputedStyle(element).mixBlendMode === 'multiply') {
                element.style.mixBlendMode = 'normal';
            }
        });

        GM_addStyle(customCSS);

        // Injected styles
        // const styleSheet = document.createElement('style');
        // styleSheet.innerHTML = ``;
        // document.documentElement.appendChild(styleSheet);
    };

    // If Dark Mode is enabled, inject custom styles
    if (computedStyle.colorScheme === 'dark') {
        console.log("Dark Mode detected");
        injectStyles();
    };

})();
