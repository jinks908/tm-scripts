// ==UserScript==
// @name         Medium Dark Theme
// @namespace    http://tampermonkey.net/
// @version      2024-03-01
// @description  Dark theme for Medium website
// @author       SkyColtNinja
// @match        https://medium.com/*
// @match        https://www.cantorsparadise.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle('body, .c, #root {background-color: #0c1621; color: #e3dede !important;}');

    GM_addStyle(`
        p, h3, h4, h5, h6, span, div, article, 
        [data-testid*="text"], [class*="text"], [class*="title"] {
            color: #e3dede !important;
        }
        h1 {
            color: #52e3c3 !important;
        }
        h2 {
            color: #52e3c3 !important;
        }
        .pw-post-title {
            color: #52e3c3 !important;
        }
        .pw-subtitle-paragraph {
            color: #e3dede !important;
        }

        svg, svg path {
            fill: rgb(227, 222, 222) !important;
        }
        div[role="textbox"] {
            background-color: #1c334a !important;
        }
    `);

    // GM_addStyle('[style*="color: #242424"] [style*="color:#242424"] [style*="color:rgba(36, 36, 36, 1)"], [style*="color: rgba(36, 36, 36,"], [style*="color:rgb(36, 36, 36)"], [style*="fill: rgba(36, 36, 36,"], [style*="fill: rgb(36, 36, 36)"] {color: #e3dede !important; color: rgb(227, 222, 222) !important; fill: #e3dede !important;}');

	GM_addStyle('[style*="color:rgba(0,0,0,0.8)"] {color: rgb(227, 222, 222) !important;}');
    GM_addStyle('mark {color: #e3dede !important; background-color: #1c334a !important;}');
    // GM_addStyle('img {background: rgba(255, 255, 255, 1.0) !important; filter: hue-rotate(90deg) !important; filter: invert(100%) !important;}');

	GM_addStyle('[class*="cv"], [class*="cx"], [style*="background-color:rgb(242, 242, 242)"], [style*="background-color: rgb(242, 242, 242)"], [style*="background-color:rgb(242,242,242)"], [style*="background-color: rgb(242,242,242)"] {background-color: rgb(28, 51, 74) !important;}');
	GM_addStyle('[class*="cv"], [class*="cx"], [style*="background-color:rgb(249, 249, 249)"], [style*="background-color: rgb(249, 249, 249)"], [style*="background-color:rgb(249,249,249)"], [style*="background-color: rgb(249,249,249)"] {background-color: rgb(28, 51, 74) !important;}');
    GM_addStyle('figure div picture img {background-color: #f3e9de !important; filter: invert(100%) !important;}');

	// GM_addStyle('[style*="background-color:rgb(242, 240, 240)"], [style*="background-color:rgb(242,240,240)"], [style*="background-color: rgb(242, 240, 240)"] {background-color: #152637 !important;}');



})();
