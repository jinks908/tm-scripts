// ==UserScript==
// @name         Amazon Styles
// @namespace    http://tampermonkey.net/
// @version      1.1.1
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Amazon_Styles.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Amazon_Styles.user.js
// @description  Corrections and styles for Dark Mode Amazon theme
// @author       Clayton Jinks
// @match        https://www.amazon.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Fix darkened images on suggestion carousels
    document.querySelectorAll('*').forEach(element => {
        if (window.getComputedStyle(element).mixBlendMode === 'multiply') {
            element.style.mixBlendMode = 'normal';
        }
    });

    // Fix white backgrounds for divs and search fields
    // Fix darkened thumbnails on product images
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        .a-accordion .a-accordion-row, .a-accordion .a-accordion-row .a-accordion-active { background-color: #141414 !important; }
        .a-button-inner { display: flex !important; }
        .a-divider-inner { display: none !important; }
        html * input, html * textarea { color: #d0d3d0 !important; background-color: #000000 !important; }
`;
    document.head.appendChild(styleSheet);

})();
