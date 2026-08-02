// ==UserScript==
// @name         eBay Styles
// @namespace    SkyColtNinja/userscripts
// @version      1.0.0
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/eBay_Styles.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/eBay_Styles.user.js
// @description  Enhanced styles for eBay Dark Mode
// @author       Clayton Jinks
// @match        https://www.ebay.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
        :root {
            /* Amazon Colors */
            --amzn-prime-blue: #1176ec;
            --amzn-accent-blue: #146eb4;
            --amzn-orange: #FF9900;
            --amzn-smoke: #37475a;
            --amzn-dark-smoke: #1c1f26;
            --amzn-dark: #18202a;
            --amzn-red: #f93c3c;
            --amzn-green: #0adbaa;
            --white: #ffffff;
            --light-grey: #bbbbbb;
            --black: #000000;

            /* TPR Colors */
            --tpr-default: #e3dede;
            --tpr-skyblue: #9ec6ea;
            --tpr-seafoam: #52e3c3;
            --tpr-orange: #fc8530;
            --tpr-yellow: #fec339;
            --tpr-green: #a5fa69;
            --tpr-blue: #00bfff;
            --tpr-purple: #d573ff;
            --tpr-pink: #ff70e2;
            --tpr-red: #ff596f;
            --tpr-comment: #5997a3;
            --tpr-grey: #a9b6bd;
            --tpr-dark-grey: #5d6f6f;
            --tpr-bg: #0c1621;
            --tpr-bg-alt: #111f2e;
        }

        /* Dark Mode Styles */
        input {
            background-color: var(--amzn-dark) !important;
            color: var(--white) !important;
        }
    `);

})();
