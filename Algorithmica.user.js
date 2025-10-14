// ==UserScript==
// @name         Algorithmica Theme
// @namespace    http://tampermonkey.net/
// @version      1.1.1
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Algorithmica.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Algorithmica.user.js
// @description  Main and Syntax Theme for Algorithmica
// @author       Clayton Jinks
// @match        https://en.algorithmica.org/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Add highlight.js CSS (Atom One Dark Reasonable)
    GM_addStyle(`@import url("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css");`);

    // Headers / Body
    GM_addStyle('body {color: #c2caca !important; background-color: #0c1621 !important;}');
    GM_addStyle('body, p, article {font-family: "Quicksand Light", sans-serif !important; font-size: 15px !important; font-weight: 500 !important; scrollbar-color: #273542 !important;}');
    GM_addStyle('h1, h2, h3, h4, h5, h6, .title {font-family: "Poppins", sans-serif !important; font-weight: 600 !important;}');
    GM_addStyle('h1, div.title {color: #52e3c3 !important;}');
    GM_addStyle('h2, h3, a.anchor-link {color: #f05d71 !important;}');
    GM_addStyle('h4, h5, h6 {color: #d282f5 !important;}');

    // Links
    GM_addStyle('article a {color: #acf981 !important; transition: 0.5s !important;}');
    GM_addStyle('article a:hover {color: #52e3c3 !important; transition: 0.5s !important;}');
    GM_addStyle('.nextprev a {color: #d282f5 !important; transition: 0.5s !important;}');
    GM_addStyle('.nextprev a:hover {color: #00aeff !important; transition: 0.5s !important;}');

    // Menu / Sidebar
    GM_addStyle('#menu, #sidebar {color: #e1ebe9 !important; background-color: #0c1621 !important;}');
    GM_addStyle('#sidebar {font-family: "Quicksand Light", sans-serif !important; font-size: 14px !important; font-weight: 500 !important;}');
    GM_addStyle('#sidebar li.part, #sidebar li.part::before {color: #f05d71 !important; font-weight: 600 !important;}');
    GM_addStyle('#sidebar li a, #sidebar li::before {color: #00aeff !important; font-weight: 600 !important;}');
    GM_addStyle('#sidebar ol li a, #sidebar ol li::before {color: #a9b6bd !important;}');
    GM_addStyle('#sidebar ol li a:hover, #sidebar li a:hover, li:hover, ol li a:hover, li:hover a, li:hover li {color: #acf981 !important; transition: 0.5s !important;}');

    // Code blocks
    GM_addStyle('.chroma {color: #a9b6bd !important; background-color: #111f2e !important; padding: 20px !important;  margin-top: 25px !important; margin-bottom: 25px !important; box-shadow: 0px 0px 25px #0d0d0d !important;}');
    GM_addStyle('.hljs {background-color: #111f2e !important;}');
    GM_addStyle('code:not(pre code) {color: #f05d71 !important; background-color: #111f2e !important;}');

	GM_addStyle('.notion-selectable.notion-code-block, .notion-selectable.notion-callout-block {margin-top: 25px !important; margin-bottom: 25px !important; border: 1px solid #484848 !important; box-shadow: 0px 0px 25px #0d0d0d !important;}');

	// Syntax highlighting for Notion code blocks
	GM_addStyle('.hljs {color: #e3dede !important;}');
	GM_addStyle('.hljs-function, .hljs-pattern-match .hljs-constructor {color: #00aeff !important;}');
	GM_addStyle('.hljs-pattern-match, .hljs-keyword, .hljs-operator {color: #f05d71 !important;}');
	GM_addStyle('.hljs-function, .hljs-params, .hljs-constructor .hljs-string, .hljs-string, .hljs-regexp, .hljs-addition, .hljs-attribute, .hljs-meta .hljs-string {color: #acf981 !important;}');
	GM_addStyle('span.hljs-type, .hljs-function .hljs-params .hljs-typing {color: #d283f5 !important;}');
	GM_addStyle('.hljs-module-access, .hljs-module, .hljs-selector-class, .hljs-selector-attr, .hljs-selector-pseudo, span.hljs-number {color: #e68545 !important;}');
	GM_addStyle('.hljs-attr, .hljs-variable, .hljs-template-variable, .hljs-constructor, .hljs-built_in, .hljs-title.class_, .hljs-class, .hljs-title {color: #f7c143 !important;}');
	GM_addStyle('.hljs-comment, .hljs-quote {color: #5997a3 !important;}');
	GM_addStyle('.hljs-symbol, .hljs-bullet, .hljs-link, .hljs-meta, .hljs-selector-id, .hljs-title {color: #00aeff !important;}');
	GM_addStyle('.hljs-literal {color: #f573b6 !important;}');

    // Initialize highlight.js
    hljs.highlightAll();
})();

