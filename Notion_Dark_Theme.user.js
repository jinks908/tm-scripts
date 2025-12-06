// ==UserScript==
// @name         Notion Theme (Optimized)
// @namespace    http://tampermonkey.net/
// @version      1.5.0-alpha
// @description  A nicer dark theme for Notion - Performance Optimized
// @author       Clayton Jinks
// @match        https://www.notion.so/skycoltninja/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Apply CSS at document-start
    GM_addStyle(`
        /* ------------------------------------------------------------- */
        /* #:# Root Variables                                            */
        /* ------------------------------------------------------------- */
        :root {
            /* Colors */
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

            /* Fonts */
            --tpr-font-main: "Quicksand Light", sans-serif;
            --tpr-font-header: "Poppins", sans-serif;
            --tpr-font-code: "DroidSansMono", monospace;
        }

        /* ------------------------------------------------------------- */
        /* #:# Colors                                                    */
        /* ------------------------------------------------------------- */

        /* Code Syntax */
        .notion-code-block span[data-token-index="0"] { color: var(--tpr-grey); }
        .token.keyword { color: var(--tpr-purple) !important; }
        .token.punctuation { color: var(--tpr-default) !important; }
        .token.comment { color: var(--tpr-comment) !important; }
        .token.string { color: var(--tpr-green) !important; }
        .token.operator { color: var(--tpr-purple) !important; }
        .token.parameter { color: var(--tpr-red) !important; }
        .token.function { color: var(--tpr-blue) !important; }
        .token.builtin { color: var(--tpr-blue) !important; }
        .token.class-name { color: var(--tpr-orange) !important; }
        .token.variable { color: var(--tpr-red) !important; }
        .token.constant { color: var(--tpr-yellow) !important; }
        .token.environment { color: var(--tpr-green) !important; }
        .token.assign-left { color: var(--tpr-orange) !important; }
        .token.function-name { color: var(--tpr-blue) !important; }
        .token.for-or-select { color: var(--tpr-pink) !important; }
        .token.number { color: var(--tpr-yellow) !important; }
        .token.string-property, .token.string-property.property { color: var(--tpr-pink) !important; }
        .token.literal-property, .token.literal-property.property { color: var(--tpr-yellow) !important; }
        .token.property { color: var(--tpr-orange) !important; }
        .token.boolean { color: var(--tpr-yellow) !important; }
        .token.attr-name { color: var(--tpr-orange) !important; }
        .token.attr-value { color: var(--tpr-red) !important; }
        .token.selector { color: var(--tpr-pink); }


        /* ## Foreground Colors
        ** ------------------------------------------------------------- */
        /* Default Color */
        [style*="color:rgba(55, 53, 47"],
        [style*="color: rgba(55, 53, 47"],
        [style*="color: rgb(55, 53, 47)"],
        [style*="fill:rgba(55, 53, 47"],
        [style*="fill: rgba(55, 53, 47"],
        [style*="fill: rgb(55, 53, 47)"],
        [style*="color:rgba(72, 71, 67"],
        [style*="color: rgba(72, 71, 67"],
        [style*="color: rgb(72, 71, 67)"],
        [style*="color:var(--c-texPri)"],
        [style*="color: var(--c-texPri)"],
        [style*="fill:var(--c-texPri)"],
        [style*="fill: var(--c-texPri)"] {
            color: var(--tpr-default) !important;
            fill: var(--tpr-default) !important;
        }

        /* Sky Blue (default grey replacement) */
        [style*="color:rgba(134, 131, 126"],
        [style*="color: rgba(134, 131, 126"],
        [style*="color: rgb(134, 131, 126)"],
        [style*="fill: rgba(134, 131, 126"],
        [style*="fill: rgb(134, 131, 126)"],
        [style*="color:var(--c-graTexSec)"],
        [style*="color: var(--c-graTexSec)"],
        [style*="fill:var(--c-graTexSec)"],
        [style*="fill: var(--c-graTexSec)"] {
            color: var(--tpr-skyblue) !important;
            fill: var(--tpr-skyblue) !important;
        }

        /* Seafoam (brown) */
        [style*="color:rgba(159, 118, 90"],
        [style*="color: rgba(159, 118, 90"],
        [style*="color: rgb(159, 118, 90)"],
        [style*="fill: rgba(159, 118, 90"],
        [style*="fill: rgb(159, 118, 90)"],
        [style*="color:var(--c-broTexSec)"],
        [style*="color: var(--c-broTexSec)"],
        [style*="fill:var(--c-broTexSec)"],
        [style*="fill: var(--c-broTexSec)"] {
            color: var(--tpr-seafoam) !important;
            fill: var(--tpr-seafoam) !important;
        }

        /* Orange */
        [style*="color:rgba(199, 121, 69"],
        [style*="color: rgba(199, 121, 69"],
        [style*="color: rgb(199, 121, 69)"],
        [style*="fill: rgba(199, 121, 69"],
        [style*="fill: rgb(199, 121, 69)"],
        [style*="color:rgba(204, 121, 47"],
        [style*="color: rgba(204, 121, 47"],
        [style*="color: rgb(204, 121, 47)"],
        [style*="fill: rgba(204, 121, 47"],
        [style*="fill: rgb(204, 121, 47)"],
        [style*="color:var(--c-oraTexSec)"],
        [style*="color: var(--c-oraTexSec)"],
        [style*="fill:var(--c-oraTexSec)"],
        [style*="fill: var(--c-oraTexSec)"] {
            color: var(--tpr-orange) !important;
            fill: var(--tpr-orange) !important;
        }

        /* Yellow */
        [style*="color:rgba(203, 148, 52"],
        [style*="color: rgba(203, 148, 52"],
        [style*="color: rgb(203, 148, 52)"],
        [style*="fill: rgba(203, 148, 52"],
        [style*="fill: rgb(203, 148, 52)"],
        [style*="color:rgba(195, 148, 67"],
        [style*="color: rgba(195, 148, 67"],
        [style*="color: rgb(195, 148, 67)"],
        [style*="fill: rgba(195, 148, 67"],
        [style*="fill: rgb(195, 148, 67)"],
        [style*="color:var(--c-yelTexSec)"],
        [style*="color: var(--c-yelTexSec)"],
        [style*="fill:var(--c-yelTexSec)"],
        [style*="fill: var(--c-yelTexSec)"] {
            color: var(--tpr-yellow) !important;
            fill: var(--tpr-yellow) !important;
        }

        /* Green */
        [style*="color:rgba(80, 148, 110"],
        [style*="color: rgba(80, 148, 110"],
        [style*="color: rgb(80, 148, 110)"],
        [style*="fill: rgba(80, 148, 110"],
        [style*="fill: rgb(80, 148, 110)"],
        [style*="color:var(--c-greTexSec)"],
        [style*="color: var(--c-greTexSec)"],
        [style*="fill:var(--c-greTexSec)"],
        [style*="fill: var(--c-greTexSec)"] {
            color: var(--tpr-green) !important;
            fill: var(--tpr-green) !important;
        }

        /* Blue */
        [style*="color:rgba(63, 126, 190"],
        [style*="color: rgba(63, 126, 190"],
        [style*="color: rgb(63, 126, 190)"],
        [style*="fill: rgba(63, 126, 190"],
        [style*="fill: rgb(63, 126, 190)"],
        [style*="color:var(--c-bluTexSec)"],
        [style*="color: var(--c-bluTexSec)"],
        [style*="fill:var(--c-bluTexSec)"],
        [style*="fill: var(--c-bluTexSec)"] {
            color: var(--tpr-blue) !important;
            fill: var(--tpr-blue) !important;
        }

        /* Purple */
        [style*="color:rgba(154, 107, 180"],
        [style*="color: rgba(154, 107, 180"],
        [style*="color: rgb(154, 107, 180)"],
        [style*="fill: rgba(154, 107, 180"],
        [style*="fill: rgb(154, 107, 180)"],
        [style*="color:var(--c-purTexSec)"],
        [style*="color: var(--c-purTexSec)"],
        [style*="fill:var(--c-purTexSec)"],
        [style*="fill: var(--c-purTexSec)"] {
            color: var(--tpr-purple) !important;
            fill: var(--tpr-purple) !important;
        }

        /* Pink */
        [style*="color:rgba(174, 96, 133"],
        [style*="color: rgba(174, 96, 133"],
        [style*="color: rgb(174, 96, 133)"],
        [style*="fill: rgba(174, 96, 133"],
        [style*="fill: rgb(174, 96, 133)"],
        [style*="color:rgba(179, 84, 136"],
        [style*="color: rgba(179, 84, 136"],
        [style*="color: rgb(179, 84, 136)"],
        [style*="fill: rgba(179, 84, 136"],
        [style*="fill: rgb(179, 84, 136)"],
        [style*="color:var(--c-pinTexSec)"],
        [style*="color: var(--c-pinTexSec)"],
        [style*="fill:var(--c-pinTexSec)"],
        [style*="fill: var(--c-pinTexSec)"] {
            color: var(--tpr-pink) !important;
            fill: var(--tpr-pink) !important;
        }

        /* Red */
        [style*="color:var(--c-redTexSec)"],
        [style*="color: var(--c-redTexSec)"],
        [style*="fill:var(--c-redTexSec)"],
        [style*="fill: var(--c-redTexSec)"] {
            color: var(--tpr-red) !important;
            fill: var(--tpr-red) !important;
        }

        /* ------------------------------------------------------------- */
        /* #:# UI Elements                                               */
        /* ------------------------------------------------------------- */

        /* ## Fonts
        ** ------------------------------------------------------------- */
        body, 
        .notion-app-inner .notion-light-theme, 
        .notion-app-inner .notion-light-theme div,
        .notion-cursor-listener, 
        main, 
        .notion-frame, 
        .layout .layout-content {
            font-family: var(--tpr-font-main) !important;
            font-weight: 500 !important;
            scrollbar-color: #273542 !important;
        }

        /* Header Fonts */
        .layout .layout-content h1, h2, h3, h4, h5, h6 {
            font-family: var(--tpr-font-header) !important;
            font-weight: SemiBold !important;
        }

        /* Hyperlink Color */
        a.notion-link-token {
            color: var(--tpr-seafoam) !important;
            font-weight: bold !important;
        }

        /* Font Sizes */
        .notion-page-content .notion-selectable .notion-text-block,
        [style*="font-size:16px"],
        [style*="font-size: 16px"] {
            font-size: 17px !important;
        }

        [style*="font-size:14px"],
        [style*="font-size: 14px"] {
            font-size: 15px !important;
        }

        /* Increase Weight */   
        [style*="font-weight:600"]:not(.layout .layout-content h1, h2, h3, h4, h5, h6),
        [style*="font-weight: 600"]:not(.layout .layout-content h1, h2, h3, h4, h5, h6) {
            font-weight: 800 !important;
        }

        /* Code Block Fonts */
        .notion-code-block, 
        .notion-code-block span {
            font-family: var(--tpr-font-code) !important;
            font-size: 102% !important;
        }

        /* Fix code block overflow (wrap on whole words, not characters) */
        .notion-code-block div.notranslate {
            word-break: break-word !important;
        }

        /* New text block autofill color */
        div.notranslate::after {
            -webkit-text-fill-color: var(--tpr-skyblue) !important;
            color: var(--tpr-skyblue) !important;
            caret-color: var(--tpr-skyblue) !important;
        }

        /* Inline code font */
        span[style*='font-family: "SFMono-Regular"'],
        span[style*="font-family: SFMono-Regular"] {
            font-family: var(--tpr-font-code) !important;
            font-size: 90% !important;
        }

        /* Hyperlink styles */
        span[class*="link-annotation"] {
            opacity: 1 !important;
            border-bottom: 1px solid var(--tpr-dark-grey) !important;
        }

        a span div.notranslate {
            border-bottom: 1px solid #273542 !important;
        }

        /* ## Menus and Buttons
        ** ------------------------------------------------------------- */
        /* Change alternate blue buttons, checkboxes, etc. */
        [style*="background-color:rgba(0, 119, 212"],
        [style*="background-color: rgba(0, 119, 212"],
        [style*="background-color: rgb(0, 119, 212)"],
        [style*="fill: rgba(0, 119, 212"],
        [style*="fill: rgb(0, 119, 212)"],
        [style*="background-color:rgba(35, 131, 226"],
        [style*="background-color: rgba(35, 131, 226"],
        [style*="background-color: rgb(35, 131, 226)"],
        [style*="fill: rgba(35, 131, 226"],
        [style*="fill: rgb(35, 131, 226)"] {
            background-color: var(--tpr-blue) !important;
        }

        /* Change white button backgrounds (e.g., header image adjustments) */
        div.layout-full .pseudoSelection div div div,
        div[role="button"][style*="background-color:rgb(239, 239, 238)"],
        div[role="button"][style*="background-color: rgb(239, 239, 238)"],
        [style*="background:rgb(239, 239, 238)"],
        [style*="background: rgb(239, 239, 238)"] {
            background-color: rgba(12, 22, 33, 0.5) !important;
        }

        /* Top menu bar */
        .notion-topbar {
            background-color: var(--tpr-bg-alt) !important;
            border-bottom: 1px solid #404D59 !important;
        }

        .notion-topbar-action-buttons div[role="button"], 
        .notion-page-controls div[role="button"] {
            color: var(--tpr-skyblue) !important;
        }

        /* Right TOC float menu */
        .notion-overlay-container.notion-default-overlay-container div[role="dialog"] {
            border-radius: 7px 0px 0px 7px !important;
            border-top: 1px solid #404D59 !important;
            border-left: 1px solid #404D59 !important;
            border-bottom: 1px solid #404D59 !important;
        }

        .notion-overlay-container.notion-default-overlay-container div div div div div div div {
            background: rgba(21, 38, 55, 0.8);
        }

        .notion-overlay-container.notion-default-overlay-container div div div div div div div div {
            transform-origin: right 0% 0px !important;
            transition: all 600ms ease-in-out !important;
            backdrop-filter: blur(10px) !important;
        }

        /* Increase TOC menu width (exclude other overlay menus) */
        .notion-overlay-container.notion-default-overlay-container:not(:has(.notion-scroller.vertical, div[role="button"]))
        div div div div div div div div div {
            width: 400px !important;
        }

        .notion-overlay-container div[style*="margin-inline-start: 12px;"] {
            margin-inline-start: 20px !important;
        }

        .notion-overlay-container div[style*="margin-inline-start: 24px;"] {
            margin-inline-start: 40px !important;
        }

        .notion-overlay-container div[role="dialog"] a span.notranslate {
            color: var(--tpr-skyblue) !important; 
            font-family: var(--tpr-font-main) !important;
            font-weight: 1000 !important;
            font-size: 18px;
        }

        .notion-overlay-container div[role="dialog"] a span.notranslate:hover {
            color: var(--tpr-seafoam) !important;
        }

        .hide-scrollbar.ignore-scrolling-container.notion-floating-table-of-contents div div div {
            background-color: var(--tpr-bg-alt);
            border-radius: 7px 0px 0px 7px !important;
        }

        /* Dialog Menus */
        .notion-text-action-menu div div {
            background-color: var(--tpr-bg-alt) !important;
        }

        div[role="dialog"],
        .notion-scroller .vertical,
        .sticky-portal-target {
            background-color: var(--tpr-bg-alt) !important;
            color: var(--tpr-default) !important;
            box-shadow: 0px 0px 25px #0d0d0d !important;
        }

        .notion-selectable a:hover,
        div[dir="ltr"] div:hover,
        div[role="menuitem"]:hover,
        div[role="dialog"]:hover {
            background-color: var(--tpr-seafoam) !important;
            color: var(--tpr-bg-alt) !important;
            opacity: 1 !important;
        }

        .notion-scroller.vertical div[role="menuitem"]:hover, 
        .notion-scroller.vertical div[role="option"]:hover {
            color: var(--tpr-seafoam) !important;
            opacity: 1 !important;
        }

        .notion-selectable.notion-page-block a:hover,
        div[dir="ltr"]:hover {
            color: var(--tpr-bg-alt) !important;
            background-color: var(--tpr-seafoam) !important;
        }

        .notion-sidebar .notion-selectable a,
        .notion-sidebar .notion-selectable.notion-page-block {
            background-color: var(--tpr-bg-alt) !important;
        }

        div[role="dialog"] span,
        div[role="dialog"] svg {
            color: var(--tpr-default) !important;
        }

        div[role="dialog"] svg.trash {
            filter: invert(0%) !important;
        }

        div[role="menu"],
        div[role="menuitem"] svg {
            color: var(--tpr-default) !important;
        }

        .notion-scroller .sticky-portal-target div {
            color: var(--tpr-default) !important;
        }

        .notion-topbar svg path {
            fill: var(--tpr-default) !important;
        }

        div[role="button"] svg {
            fill: var(--tpr-default) !important;
        }

        .notion-outliner-bookmarks div[role="button"] svg,
        .notion-outliner-private-header-container div[role="button"] svg,
        .notion-sidebar div[dir="ltr"]:hover svg {
            fill: var(--tpr-bg-alt) !important;
        }

        /* Overlay Menus */
        div[data-overlay="true"] div[role="dialog"] div,
        div[data-overlay="true"] div[role="dialog"] {
            background: none !important;
        }

        .pseudoHover .pseudoActive {
            opacity: 1 !important;
        }

        .notion-overlay-container div a:hover,
        .notion-overlay-container span:hover {
            color: var(--tpr-seafoam) !important;
        }

        div[data-overlay="true"] div[role="dialog"] {
            clip-path: none !important;
            transform: none !important;
            overflow-x: hidden !important;
            color: var(--tpr-default) !important;
        }

        /* Back to Top Button */
        .back-to-top-btn {
            display: flex;
            align-items: center;
            padding: 6px 14px;
            margin-top: 25px;
            cursor: pointer;
            border-radius: 3px;
            color: var(--tpr-seafoam);
            background: transparent;
            border: none;
            font-size: 14px;
            transition: background 20ms ease-in 0s;
        }

        .back-to-top-btn:hover {
            background: var(--tpr-seafoam);
            color: var(--tpr-bg);
        }

        .back-to-top-btn svg {
            width: 16px;
            height: 16px;
            margin-right: 8px;
        }

        .back-to-top-btn:hover svg, svg:hover {
            fill: var(--tpr-bg);
        }

        /* Page Design */
        header {
            background-color: var(--tpr-bg-alt) !important;
            color: var(--tpr-seafoam) !important;
            font-weight: 600 !important;
        }

        div[role="button"], .shadow-cursor-breadcrumb, .notranslate, .notranslate div {
            color: inherit !important;
        }

        .notranslate .shadow-cursor-breadcrumb a {
            color: var(--tpr-default) !important;
        }

        .notion-collection_view_page-block a, .notion-page-block a {
            color: var(--tpr-default) !important;
        }

        .notion-selectable.notion-page-block h1 {
            color: #07fdaf !important;
        }

        .layout-content-with-divider {
            display: none !important;
        }

        .notion-file-block div div {
            color: #36c2c2 !important;
            font-weight: bold !important;
        }

        /* Cursor Color */
        html, body, #notion-app, div, .notranslate, .notion-selectable, .notion-text-block,
        .notion-header-block, .notion-page-block, .notion-code-block, .notion-callout-block,
        .notion-divider-block, .notion-table_of_contents-block, .notion-collection_view_page-block,
        h1, h2, h3, h4, span {
            caret-color: var(--tpr-default) !important;
        }

        div[role="separator"] {
            border-bottom: 1px solid var(--tpr-dark-grey) !important;
        }

        /* Main Colors */
        #notion-app,
        body.notion-body,
        html.notion-html {
            background-color: var(--tpr-bg) !important;
            color: var(--tpr-default) !important;
            caret-color: var(--tpr-default) !important;
        }

        /* Sidebar and Frame */
        * {
            scrollbar-width: none !important;
        }

        .notion-frame {
            background-color: var(--tpr-bg) !important;
            color: var(--tpr-default) !important;
        }

        .notion-sidebar-container {
            background-color: var(--tpr-bg-alt) !important;
            color: var(--tpr-default) !important;
        }

        .notion-app-inner,
        .notion-light-theme,
        .notion-sidebar {
            color: var(--tpr-default) !important;
        }

        div.layout-full {
            border-bottom: 1px solid var(--tpr-bg-alt) !important; 
        }

        .notion-selectable.notion-table_of_contents-block {
            background-color: var(--tpr-bg) !important;
        }

        .notion-close-sidebar,
        .notion-sidebar img {
            opacity: 1 !important;
        }

        .notion-light-theme,
        div[dir="ltr"] {
            color: var(--tpr-default) !important;
        }

        [style*="background-color:var(--c-bacEle)"],
        [style*="background-color: var(--c-bacEle)"],
        [style*="background:var(--c-bacEle)"],
        [style*="background: var(--c-bacEle)"] {
            background-color: var(--tpr-bg-alt) !important;
            fill: var(--tpr-bg-alt) !important;
        }

        :root,
        .notion-light-theme {
            --c-sidBoxSha: 1px 0px 0px 0px rgba(158, 198, 234, 0.5) !important;
        }

        .notion-sidebar {
            height: 100% !important;
            top: -15px; 
        }

        .notion-sidebar, .notion-sidebar div {
            border-start-end-radius: 0px !important;
            border-end-end-radius: 0px !important;
        }

        /* Code / Callout / Quote Blocks */
        .notion-selectable .notion-callout-block, div[role="note"] div {
            background-color: var(--tpr-bg-alt) !important;
        }

        .notion-selectable.notion-callout-block {
            border: 1px solid var(--tpr-dark-grey) !important;
            box-shadow: 0px 0px 30px #0d0d0d !important;
        }

        .notion-selectable.notion-collection_view_page-block div {
            background-color: var(--tpr-bg-alt) !important;
            color: var(--tpr-default) !important;
        }

        .notion-selectable.notion-callout-block div[role="note"] {
            padding-top: 15px !important;
            padding-bottom: 15px !important;
            background-color: var(--tpr-bg-alt) !important;
        }

        .notion-selectable.notion-code-block, .notion-selectable.notion-callout-block {
            margin-top: 25px !important;
            margin-bottom: 25px !important;
            border: 1px solid #404D59 !important;
            box-shadow: 0px 0px 25px #0d0d0d !important;
        }

        .notion-code-block div {
            color: var(--tpr-default) !important;
            background-color: var(--tpr-bg-alt) !important;
        }

        .notion-light-theme .language-css .token.string, 
        .style .token.string, 
        .notion-light-theme .token.entity,
        .notion-light-theme .token.operator, 
        .notion-light-theme .token.url {
            background: none !important;
        }

        .notion-selectable {
            color: var(--tpr-default) !important;
            caret-color: var(--tpr-default) !important;
        }

        .notion-divider-block {
            background-color: var(--tpr-bg) !important;
            color: var(--tpr-default) !important;
            caret-color: var(--tpr-default) !important;
        }

        .notion-header-block {
            background-color: var(--tpr-bg) !important;
            color: var(--tpr-default) !important;
            caret-color: var(--tpr-default) !important;
        }

        .notion-header-block div {
            background: none !important;
        }

        /* Quote Blocks */
        blockquote {
            margin: 20px 25px 20px 25px !important;
        }

        blockquote div {
            color: var(--tpr-yellow) !important;
            font-size: 19px !important;
        }

        blockquote div div.notranslate {
            color: var(--tpr-skyblue) !important;
        }
    `);

    // Wait for DOM to be interactive before running JavaScript
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeFeatures);
    } else {
        initializeFeatures();
    }

    function initializeFeatures() {
        // Debounced mutation observer for better performance
        let observerTimeout;
        const debouncedObserver = () => {
            clearTimeout(observerTimeout);
            observerTimeout = setTimeout(() => {
                injectBackToTopButton();
            }, 250);
        };

        // Use passive observer with debouncing
        const observer = new MutationObserver(debouncedObserver);

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Initial injection
        injectBackToTopButton();
    }

    // Back to Top Button (optimized)
    function createBackToTopButton() {
        const button = document.createElement('button');
        button.className = 'back-to-top-btn';
        button.innerHTML = `
            <svg viewBox="0 0 16 16" fill="var(--tpr-seafoam)">
                <path d="M8 4.414l-4.293 4.293-1.414-1.414L8 1.586l5.707 5.707-1.414 1.414L8 4.414z"/>
                <path d="M7 14V5h2v9H7z"/>
            </svg>
            Back to Top
        `;

        button.addEventListener('click', () => {
            const scrollContainer = document.querySelector('.notion-frame .notion-scroller');
            if (scrollContainer) {
                scrollContainer.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }, { passive: true });

        return button;
    }

    function injectBackToTopButton() {
        if (document.querySelector('.back-to-top-btn')) return;

        const sidebar = document.querySelector('.notion-sidebar');
        if (!sidebar) return;

        const button = createBackToTopButton();
        const sidebarBottom = sidebar.querySelector('[style*="margin-top: auto"]');

        if (sidebarBottom) {
            sidebarBottom.parentNode.insertBefore(button, sidebarBottom);
        } else {
            sidebar.appendChild(button);
        }
    }

})();
