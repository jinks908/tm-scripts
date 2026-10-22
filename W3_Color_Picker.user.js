// ==UserScript==
// @name         Color Picker Dark Theme (For W3 Schools)
// @namespace    SkyColtNinja/userscripts
// @version      1.1.0
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/W3_Color_Picker.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/W3_Color_Picker.user.js
// @description  Dark theme for color picker which preserves the color palettes
// @author       SkyColtNinja
// @match        https://*w3schools.com/colors/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap';
    document.head.appendChild(link);

    GM_addStyle(`
        :root {
            /* Colors */
            --white: #ffffff;
            --smoke: #737aa2;
            --lime: #89ff7c;
            --mint: #2fe1c8;
            --brightCyan: #00d7ff;
            --skyBlue: #00aeff;
            --ocean: #4da0ff;
            --red: #ff7a7a;
            --neonRed: #ff668c;
            --navy: #172837;
            --bg: #051626;
            --black: #000000;
        }
        :is(
            .w3-white,
            .w3-white div,
            #main,
            #right,
            #footer,
            #huecontainer,
            .contentcontainer,
            table,
            table tbody tr,
            #sidenav,
            #leftmenuinner,
            #leftmenuinnerinner,
            .ws-light-grey,
            [style*="color:#000 !important"],
            [style*="color: #000 !important"],
            [style*="background-color:#f5f6f7"],
            [style*="background-color: #f5f6f7"],
            [style*="background-color:#E7E9EB"],
            [style*="background-color: #E7E9EB"],
            [style*="background-color:#ebedee"],
            [style*="background-color: #ebedee"],
            [style*="color:#ebedee"],
            [style*="color: #ebedee"],
            [style*="background-color:#fff !important"],
            [style*="background-color: #fff !important"]
        ):not(
            #selectedcolor,
            #selectedcolor div,
            #lumtopcontainer
        ) {
            color: var(--white) !important;
            background-color: var(--bg) !important;
        }
        #top-nav-bar,
        #top-nav-bar *:before,
        #top-nav-bar::before {
            background-color: var(--bg) !important;
        }
        #sidenav a {
            color: var(--white) !important;
            background-color: var(--bg) !important;
            transition: 0.2s ease-in-out;
        }
        #sidenav a.active {
            color: var(--black) !important;
            background-color: var(--mint) !important;
            border-left: 4px solid var(--mint) !important;
        }
        #sidenav a {
            border-left: 1px solid var(--smoke) !important;
        }
        .cp-panel,
        .cp-hero-sliders,
        .cp-label {
            color: var(--white) !important;
            background-color: var(--navy) !important;
        }
        hr {
            border-top: 1px solid var(--smoke) !important;
        }
        #main {
            border-right: 1px solid var(--smoke) !important;
        }
        .nextprev a {
            font-size: 18px;
            font-family: 'Quicksand', sans-serif;
            font-weight: 400;
            padding-left: 19px;
            padding-right: 19px;
            border-radius: 5px;
            border: none !important;
        }
        .ws-btn,
        .ws-btn:active,
        .nextprev a.w3-left,
        .nextprev a.w3-right {
            color: var(--black) !important;
            background-color: var(--mint) !important;
            transition: 0.2s ease-in-out;
        }
        .ws-btn:hover,
        #sidenav a:hover,
        #sidenav a.active:hover,
        .nextprev a.w3-left:hover,
        .nextprev a.w3-right:hover {
            color: var(--black) !important;
            background-color: var(--neonRed) !important;
            transition: 0.2s ease-in-out;
        }
        .track-progress-btn-wrapper,
        #right,
        #footer-skyscraper,
        #wrappercontainer,
        #footerwrapper {
            display: none !important;
        }
    `);

})();
