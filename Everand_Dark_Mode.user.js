// ==UserScript==
// @name         Everand Dark Mode
// @namespace    http://tampermonkey.net/
// @version      2024-03-01
// @description  A nicer dark theme for Everand audio player
// @author       SkyColtNinja
// @match        https://www.everand.com/listen/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`

        :root {
            /* Colors */
            --tpr-default: #e3dede;
            --tpr-bg: #0c1621;
            --tpr-seafoam: #52e3c3; 
            --tpr-red: #ff596f;
            --tpr-dark-grey: #2b3840;
            --tpr-grey: #596d73;
        }

        /* Everand logo */
        .scribd_blue_long_logo {
            filter: invert(100%) !important;
        }

        /* Body */
        body {
            background-color: var(--tpr-bg) !important;
        }

        /* Main page styles */
        .utogen_class_views_layouts_audiobook.autogen_class_views_layouts_web.autogen_class_widgets_page.autogen_class_widgets_base.no_header.locale_en_US.responsive.body_container.mobile_bottom_tabs.jsblock_done {
            background-color: var(--tpr-bg) !important;
        }
        .auto__audiobooks_show, 
        .auto__audiobooks_show .audiobook_show_container {
            background-color: var(--tpr-bg) !important;
        }
        .megamenu {
            background-color: var(--tpr-bg) !important;
        }
        .header {
            background-color: var(--tpr-bg) !important;
        }
        #lightbox_area {
            background-color: var(--tpr-bg) !important; 
            z-index: -10 !important;
        }
        html {
            color: var(--tpr-default) !important;
        }
        a {
            color: var(--tpr-default) !important;
        }

        /* Media controls */
        .current_time {
            color: var(--tpr-default) !important;
        }
        .time_remaining {
            color: var(--tpr-default) !important;
        }
        .track_info {
            color: var(--tpr-default) !important;
        }
        .track {
            background-color: var(--tpr-dark-grey) !important;
        }
        .track.fill {
            background: none !important; 
            background-color: var(--tpr-grey) !important;
        }
        .handle {
            background: none !important; 
            background-color: var(--tpr-seafoam) !important;
        }
        .controls_container {
            color: var(--tpr-default) !important;
        }
        .auto__audiobooks_player .options .speed {
            border: 1px solid var(--tpr-default) !important;
        }
        span.selector_button {
            border-color: var(--tpr-default) !important;
        }
        .volume_slider span {
            color: var(--tpr-default) !important;
        }
        .icon.icon-ic_audiobook_sleepoff {
            color: var(--tpr-default) !important;
        }

        /* Metadata */
        h1.title a {
            color: var(--tpr-red) !important;
        }
        h2.author {
            color: var(--tpr-grey) !important;
        }
        h2.author a {
            color: var(--tpr-default) !important;
        }
        .narrator_byline {
            color: var(--tpr-grey) !important;
        }
        .narrator_byline a {
            color: var(--tpr-default) !important;
        }

        /* Menu buttons */
        .icon.icon-ic_overflowmenu {
            color: #74a2ac !important;
        }
        .icon.icon-ic_toc_list {
            color: #74a2ac !important;
        }

        /* Menu items */
        .button_menu.bottom.left {
            background-color: var(--tpr-bg) !important;
        }
        .button_menu_items_container {
            background-color: var(--tpr-bg) !important; 
            color: var(--tpr-default) !important;
        }
        .button_menu_items_container h2 {
            color: var(--tpr-red) !important;
        }
        .button_menu_items_container div {
            color: var(--tpr-default) !important;
        }
        .button_menu_items_container li {
            color: var(--tpr-default) !important;
        }
        .button_menu_items_container button {
            color: var(--tpr-default) !important;
        }
        .button_menu_items_container a {
            color: var(--tpr-default) !important;
        }
        .button_menu_items_container span {
            color: var(--tpr-default) !important;
        }

        /* Hide the app banner (advertisement) */
        .app-banner {
            display: none !important;
        }
    `);

    // Force background colors with JS
    var mainBody = document.body;
    mainBody.style.backgroundColor = 'var(--tpr-bg) !important';
    var lightBox = document.getElementById('lightbox_area');
    lightBox.style.backgroundColor = 'var(--tpr-bg) !important';

})();
