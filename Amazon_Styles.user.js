// ==UserScript==
// @name         Amazon Styles
// @namespace    SkyColtNinja/userscripts
// @version      1.2.2-alpha
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
        const styleSheet = document.createElement('style');
        styleSheet.innerHTML = `
            .a-accordion .a-accordion-row, .a-accordion .a-accordion-row .a-accordion-active {
                background-color: #141414 !important;
            }
            .a-button-inner {
                display: flex !important; 
            }
            .a-divider-inner {
                display: none !important;
            }
            html * input, html * textarea {
                color: #d0d3d0 !important; background-color: #000000 !important;
            }
            a:link {
                color: #4291ee !important;
            }
            .a-section a.popover-trigger {
                color: #232F3E !important;
            }
            .a-carousel-header-row .a-carousel-container h2.a-carousel-heading, .audible h2 {
                color: #0578ff !important;
            }
            [style*="color:#c10015!important"], [style*="color: #c10015 !important"], [style*="color:#ff0000!important"],
            [style*="color: #ff0000 !important"], [style*="color:#f00!important"], [style*="color: #f00 !important"] {
                color: #f93c3c !important; 
            }
            .r4m-sou-comparison-header-price *, .a-color-price, .bia-price,  .a-price[data-a-color='base'],
            #gw-asin-popover .pricing .price, #gw-asin-popover .pricing .price .a-color-price {
                color: #f93c3c !important;
            }
            html * input, html * textarea {
                background: none !important;
            }
        `;

        document.documentElement.appendChild(styleSheet);
    };

    // If Dark Mode is enabled, inject custom styles
    if (computedStyle.colorScheme === 'dark') {
        console.log("Dark Mode detected");
        injectStyles();
    };

})();
