// ==UserScript==
// @name         Wiki Theme
// @namespace    http://tampermonkey.net/
// @version      2024-01-27
// @description  try to take over the world!
// @author       You
// @match        https://en.wikipedia.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wikipedia.org
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Disable styles on embed (used for Notion)
    // Check if the page is embedded in an iframe
    if (window.self !== window.top) {
        // If embedded, exit the script without applying any styles
        return;
    }


    // May need to uncomment depending on Wiki theme and/or Firefox plugins
    //GM_addStyle('.mw-page-container {background-color: #0c1621 !important; color: #ffffff !important;}');
    //GM_addStyle('.vector-header-container {background-color: #0c1621 !important; color: #ffffff !important;}');
    //GM_addStyle('header {background-color: #0c1621 !important; color: #ffffff !important;}');


    // Create SVG inverted class
    // GM_addStyle('.inverted-color {filter: invert(100%) !important;}');
    GM_addStyle('img[src$=".svg"] {filter: invert(100%) !important;}');
    GM_addStyle('.popups-icon--settings {filter: invert(100%) !important;}');
    // GM_addStyle('.mw-file-description {filter: invert(100%) !important;}');

    GM_addStyle('.invert-image {filter: invert(100%) !important;}');
    GM_addStyle('.invert-svg {filter: invert(100%) !important;}');
    GM_addStyle('.invert-element {filter: invert(100%) !important;}');


    GM_addStyle('.mw-parser-output .quotebox {background-color: #111f2e !important;}');
    GM_addStyle('td {background-color: #0c1621;}');
    GM_addStyle('div.thumbinner {background: none;}');
    GM_addStyle('.mwe-math-element {filter: invert(100%) !important;}');
    GM_addStyle('.mw-parser-output a.external {background-blend-mode: difference !important;}');
    GM_addStyle('.mw-parser-output .fmbox {color: #ffffff !important;}');
    GM_addStyle('.oo-ui-buttonElement-framed.oo-ui-widget-disabled > .oo-ui-buttonElement-button {color: #ffffff !important; background-color: #e75252 !important; border-color: #e75252 !important;}');
    GM_addStyle('.oo-ui-buttonElement-framed.oo-ui-widget-enabled.oo-ui-flaggedElement-primary.oo-ui-flaggedElement-progressive > .oo-ui-buttonElement-button {color: #ffffff !important; background-color: #e75252 !important; border-color: #e75252 !important;}');

    GM_addStyle('.oo-ui-labelWidget.oo-ui-inline-help {color: #a1b6c7 !important;}');
    GM_addStyle('.oo-ui-fieldLayout-disabled > .oo-ui-fieldLayout-body > .oo-ui-fieldLayout-header > .oo-ui-labelElement-label {color: #ffffff;}');

    GM_addStyle('.mwe-popups-overlay {background-color: #0c1621 !important;}');
    GM_addStyle('.mwe-popups .mwe-popups-extract[dir="ltr"]::after {background-image: none !important;}');
    GM_addStyle('.mwe-popups {background-color: #0c1621 !important; background-image: none !important;}');
    GM_addStyle('.mwe-popups-container {background-color: #0c1621 !important;}');
    GM_addStyle('#mwe-popups-settings {background-color: #0c1621 !important;}');
    GM_addStyle('th.infobox-above.summary {background-color: #13455C !important;}');
    GM_addStyle('.mw-footer li {color: #ffffff !important;}');
    GM_addStyle('.mw-parser-output .sister-bar {background-color: #0c1621 !important;}');
    GM_addStyle('.mw-parser-output .portal-bar-bordered {background-color: #0c1621 !important;}');
    GM_addStyle('.mw-parser-output .side-box {background-color: #111f2e !important;}');
    GM_addStyle('td.yes {background-color: #d5fddc !important;}');
    GM_addStyle('td.no {background-color: #111f2e !important; color: #ffffff !important;}');
    GM_addStyle('td.table-draw {background-color: #96c7db !important; color: #0c1621 !important;}');
    GM_addStyle('td.table-cast {background-color: #0c1621 !important;}');
    GM_addStyle('.mw-parser-output .tracklist tbody {color: #ffffff !important;}');
    GM_addStyle('.mw-parser-output .tracklist th[scope="col"] {background-color: #13455C !important;}');

    GM_addStyle('.sidebar-heading {background-color: #111f2e !important;}');

    GM_addStyle('body {color: #ffffff !important;}');
    GM_addStyle('.oo-ui-tabSelectWidget-framed {color: #ffffff !important; background-color: #111f2e !important;}');
    GM_addStyle('.oo-ui-widget .oo-ui-widget-enabled .oo-ui-labelElement .oo-ui-optionWidget .oo-ui-tabOptionWidget {color: #ffffff !important;}');
    GM_addStyle('.oo-ui-widget .oo-ui-widget-enabled .oo-ui-labelElement .oo-ui-optionWidget .oo-ui-tabOptionWidget span {color: #ffffff !important;}');
    GM_addStyle('span.oo-ui-labelElement-label {color: #ffffff !important;}');
    GM_addStyle('.oo-ui-tabSelectWidget-framed .oo-ui-tabOptionWidget.oo-ui-optionWidget-selected {background-color: #111f2e !important; color: #ffffff !important;}');
    GM_addStyle('.wikitable {color: #ffffff !important;}');
    GM_addStyle('.wikitable th {background: none !important; background-color: #0a2d3d !important; color: #d5fddc !important;}');
    GM_addStyle('.wikitable > tr > th, .wikitable > * > tr > th {background: none !important; background-color: #111f2e !important;}');
    GM_addStyle('.tocnumber {color: #e75252 !important;}');
    GM_addStyle('#mw-toc-heading {color: #e75252 !important;}');
    GM_addStyle('div.bodyContent {color: #ffffff !important;}');
    GM_addStyle('pre, code, .mw-code {background-color: #111f2e !important;}');
    GM_addStyle('.infobox {color: #ffffff !important;}');
    GM_addStyle('.infobox-header {background-color: #13455C !important; color: #ffffff !important;}');
    GM_addStyle('.infobox-above .above {background-color: #13455C !important;}');
    GM_addStyle('.infobox .vevent {background-color: #13455C !important;}');
    GM_addStyle('.mw-body {color: #ffffff !important; border: 1px solid #484848 !important;}');
    GM_addStyle('.mw-heading1, h1, .mw-heading2, h2 {border-bottom: 1px solid #484848 !important;}');
    GM_addStyle('#mw-head {background-color: #0c1621 !important;}');
    GM_addStyle('td.infobox-below.noprint.selfref {background-color: #111f2e !important;}');
    GM_addStyle('td + .infobox-below + .noprint + .selfref {background-color: #111f2e !important;}');
    GM_addStyle('.infobox .vevent td {background-color: #111f2e !important;}');
    GM_addStyle('#content {color: #ffffff !important;}');
    GM_addStyle('a {text-decoration: none !important; color: #96c7db !important; transition: 0.5s;}');
    GM_addStyle('a:hover {text-decoration: none !important; color: #d5fddc !important; transition: 0.5s;}');
    GM_addStyle('a:visited {text-decoration: none !important; color: #d5fddc !important; transition: 0.5s;}');
    GM_addStyle('.toctogglelabel {text-decoration: none !important; color: #d5fddc !important; transition: 0.5s;}');
    GM_addStyle('h1 h2 h3 h4 h5 h6 {color: #e75252 !important;}');
    GM_addStyle('.mw-headline {color: #e75252 !important;}');
    GM_addStyle('.mw-heading.mw-heading2 {color: #e75252 !important;');
    GM_addStyle('.mw-heading.mw-heading3 {color: #e75252 !important;');
    GM_addStyle('.mw-heading {color: #e75252 !important;');
    GM_addStyle('#firstHeading {color: #e75252 !important;}');
    GM_addStyle('.vector-menu-heading-label {color: #e75252 !important;}');
    GM_addStyle('.mw-wiki-logo {filter: invert(100%);}');
    GM_addStyle('input.searchButton {filter: invert(100%);');
    GM_addStyle('.vector-user-menu-legacy #pt-userpage a {filter: invert(100%);}');
    GM_addStyle('.vector-user-menu-legacy #pt-userpage a span {color: #08a9b1 !important;}');
    GM_addStyle('.oo-ui-icon-bell, .mw-ui-icon-bell::before {filter: invert(100%);}');
    GM_addStyle('.oo-ui-icon-tray, .mw-ui-icon-tray::before {filter: invert(100%);}');
    GM_addStyle('.mw-collapsible-toggle-default .mw-collapsible-text {color: #96c7db !important;}');
    GM_addStyle('.mw-collapsible-toggle-default::before {color: #96c7db !important;}');
    GM_addStyle('.mw-collapsible-toggle-default::after {color: #96c7db !important;}');
    GM_addStyle('.sidebar-list-title {background-color: #111f2e !important;');
    GM_addStyle('#pt-notifications-notice .mw-echo-notifications-badge.mw-echo-unseen-notifications::after {background-color: #08a9b1 !important;');
    GM_addStyle('#pt-notifications-alert .mw-echo-notifications-badge.mw-echo-unseen-notifications::after {background-color: #08a9b1 !important;');
    GM_addStyle('ul {list-style-image: none !important;}');
    GM_addStyle('figure {background-color: #0c1621 !important;}');
    GM_addStyle('figcaption {background-color: #0c1621 !important;}');
    GM_addStyle('#right-navigation {background-color: #0c1621 !important;}');
    GM_addStyle('#p-views {background-color: #0c1621 !important;}');
    GM_addStyle('.vector-menu-content {background-color: #0c1621 !important;}');
    GM_addStyle('.vector-menu-content-list {background-color: #0c1621 !important;}');
    GM_addStyle('.vector-menu-tabs-legacy li {background-color: #0c1621 !important;}');
    GM_addStyle('.vector-menu-tabs-legacy li {background-image: none !important;}');
    GM_addStyle('.vector-menu-tabs-legacy .selected {background-color: #0c1621 !important;}');
    GM_addStyle('@media screen { .vector-menu-tabs-legacy li {background-color: #0c1621 !important;}}');
    GM_addStyle('.vector-menu-tabs-legacy ul {background-color: #0c1621 !important;}');
    GM_addStyle('.mw-list-item {background-color: #0c1621 !important;}');
    GM_addStyle('ul {background-color: #0c1621 !important;}');
    GM_addStyle('#ca-view {background-color: #0c1621 !important;}');
    GM_addStyle('#ca-edit {background-color: #0c1621 !important;}');
    GM_addStyle('.mw-parser-output .navbox-title {background-color: #0c1621 !important;}');
    GM_addStyle('.mw-parser-output .navbox-abovebelow, .mw-parser-output .navbox-group, .mw-parser-output .navbox-subgroup .navbox-title {background-color: #111f2e !important;}');


    GM_addStyle('.mw-parser-output tr + tr > .navbox-abovebelow, .mw-parser-output tr + tr > .navbox-group, .mw-parser-output tr + tr > .navbox-image, .mw-parser-output tr + tr > .navbox-list {border: 1px solid #ffffff !important;}');
    GM_addStyle('.vector-search-box-input {background-color: #111f2e !important; color: #d5fddc}');
    GM_addStyle('.oo-ui-textInputWidget .oo-ui-inputWidget-input {background-color: #111f2e !important; color: #d5fddc}');
    GM_addStyle('.oo-ui-radioInputWidget [type="radio"] + span {background-color: #111f2e !important; color: #d5fddc}');
    GM_addStyle('#preferences .mw-htmlform-submit-buttons {background-color: #111f2e !important; color: #d5fddc}');
    GM_addStyle('.oo-ui-checkboxInputWidget [type="checkbox"] + span {background-color: #111f2e !important; color: #d5fddc}');
    GM_addStyle('.oo-ui-dropdownWidget.oo-ui-widget-enabled .oo-ui-dropdownWidget-handle {background-color: #111f2e !important; color: #d5fddc}');
    GM_addStyle('.catlinks {background-color: #0c1621 !important;}');
    GM_addStyle('.navbox {padding: 0px !important;}');
    GM_addStyle('.navbox div {padding: 0px !important;}');
    GM_addStyle('.mw-parser-output tr + tr > .navbox-abovebelow, .mw-parser-output tr + tr > .navbox-group, .mw-parser-output tr + tr > .navbox-image, .mw-parser-output tr + tr > .navbox-list {border: 1px solid !important;}');



    let mainBody = document.body;
    let mwPageBase = document.getElementById('mw-page-base');
    const mwHeadBase = document.getElementById('mw-head-base');
    const pageContent = document.getElementById('content');
    const tableOfContents = document.getElementById('toc');
    const infoBox = document.querySelector('.infobox.vevent');
	const catLinks = document.getElementById('catlinks');
    let tableList = document.getElementsByTagName('table');
    let trList = document.getElementsByTagName('tr');

		for (let i = 0; i < tableList.length; i++) {
			tableList[i].style.backgroundColor = '#0c1621';
		}
		for (let i = 0; i < trList.length; i++) {
			trList[i].style.backgroundColor = '#0c1621';
		}

    mainBody.style.backgroundColor = '#0c1621';
    mainBody.style.color = '#f2fefa';
    mwPageBase.style.backgroundColor = '#0c1621';
    mwHeadBase.style.backgroundColor = '#0c1621';
    pageContent.style.backgroundColor = '#0c1621';
    tableOfContents.style.backgroundColor = '#0c1621';
    infoBox.style.backgroundColor = '#0c1621';
    catLinks.style.backgroundColor = '#0c1621';

  // Function to invert the color of SVG images
  function invertSVGColors() {
    // Get all elements with the class ".svg-image"
    let svgImages = document.querySelectorAll('.svg-image');
    let pngImages = document.querySelectorAll('.png-image');

    // Loop through each SVG image
    svgImages.forEach(function(svgImage) {
        // Add the class ".inverted-color" to invert the colors
        svgImage.classList.add('inverted-color');
    });
    // Repeat for PNG images
    pngImages.forEach(function(pngImage) {
        pngImage.classList.add('inverted-color');
    });
  }

  invertSVGColors();
  // Call the function when the page is fully loaded
  // window.addEventListener('load', invertSVGColors);

 })();
        Object.entries(elements).forEach(([_, element]) => {
            if (element) {
                element.style.backgroundColor = COLORS.background;
            }
        });

        // Handle tables
        ['table', 'tr'].forEach(tag => {
            document.getElementsByTagName(tag).forEach(element => {
                element.style.backgroundColor = COLORS.background;
            });
        });
    };

    // Handle SVG color inversion
    const invertSVGColors = () => {
        const svgElements = document.querySelectorAll('.svg-image, .png-image');
        svgElements.forEach(element => element.classList.add('inverted-color'));
    };

    // Initialize
    applyBackgroundColors();
    invertSVGColors();
})();
