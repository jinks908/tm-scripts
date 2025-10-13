// ==UserScript==
// @name         Everand Dark Mode
// @namespace    http://tampermonkey.net/
// @version      2024-03-01
// @description  try to take over the world!
// @author       SkyColtNinja
// @match        https://www.everand.com/listen/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Everand logo
    GM_addStyle('.scribd_blue_long_logo {filter: invert(100%) !important;}');

    // Body
    GM_addStyle('body {background-color: #0c1621 !important}');

    // Main page colors/styles
    GM_addStyle('.utogen_class_views_layouts_audiobook.autogen_class_views_layouts_web.autogen_class_widgets_page.autogen_class_widgets_base.no_header.locale_en_US.responsive.body_container.mobile_bottom_tabs.jsblock_done {background-color: #0c1621 !important;}');
    GM_addStyle('.auto__audiobooks_show, .auto__audiobooks_show .audiobook_show_container {background-color: #0c1621 !important;}');
    GM_addStyle('.megamenu {background-color: #0c1621 !important;}');
    GM_addStyle('.header {background-color: #0c1621 !important;}');
    GM_addStyle('#lightbox_area {background-color: #0c1621 !important; z-index: -10 !important;}');
    GM_addStyle('html {color: #e3dede !important;}');
    GM_addStyle('a {color: #e3dede !important;}');

    // Media controls
    GM_addStyle('.current_time {color: #e3dede !important;}');
    GM_addStyle('.time_remaining {color: #e3dede !important;}');
    GM_addStyle('.track_info {color: #e3dede !important;}');
    GM_addStyle('.track {background-color: #2b3840 !important;}');
    GM_addStyle('.track.fill {background: none !important; background-color: #596d73 !important;}');
    GM_addStyle('.handle {background: none !important; background-color: #52e3c3 !important;}');
    GM_addStyle('.controls_container {color: #e3dede !important;}');
    GM_addStyle('.auto__audiobooks_player .options .speed {border: 1px solid #e3dede !important;}');
    GM_addStyle('span.selector_button {border-color: #e3dede !important;}');
    GM_addStyle('.volume_slider span {color: #e3dede !important;}');
    GM_addStyle('.icon.icon-ic_audiobook_sleepoff {color: #e3dede !important;}');

    // Metadata
    GM_addStyle('h1.title a {color: #f05d71 !important;}');
    GM_addStyle('h2.author {color: #596d73 !important;}');
    GM_addStyle('h2.author a {color: #e3dede !important;}');
    GM_addStyle('.narrator_byline {color: #596d73 !important;}');
    GM_addStyle('.narrator_byline a {color: #e3dede !important;}');

    // Menu buttons
    GM_addStyle('.icon.icon-ic_overflowmenu {color: #74a2ac !important;}');
    GM_addStyle('.icon.icon-ic_toc_list {color: #74a2ac !important;}');

    // Menu items
    GM_addStyle('.button_menu.bottom.left {background-color: #0c1621 !important;}');
    GM_addStyle('.button_menu_items_container {background-color: #0c1621 !important; color: #e3dede !important;}');
    GM_addStyle('.button_menu_items_container h2 {color: #f05d71 !important;}');
    GM_addStyle('.button_menu_items_container div {color: #e3dede !important;}');
    GM_addStyle('.button_menu_items_container li {color: #e3dede !important;}');
    GM_addStyle('.button_menu_items_container button {color: #e3dede !important;}');
    GM_addStyle('.button_menu_items_container a {color: #e3dede !important;}');
    GM_addStyle('.button_menu_items_container span {color: #e3dede !important;}');

    // Hide the app banner (advertisement)
    GM_addStyle('.app-banner {display: none !important;}');

    // Force background colors with JS
    var mainBody = document.body;
    mainBody.style.backgroundColor = '#0c1621 !important';
    var lightBox = document.getElementById('lightbox_area');
    lightBox.style.backgroundColor = '#0c1621 !important';


})();
