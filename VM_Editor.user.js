// ==UserScript==
// @name         Violentmonkey Editor Styles
// @namespace    SkyColtNinja/userscripts
// @version      1.0
// @description  Increase font size in Violentmonkey editor
// @author       SkyColtNinja
// @match        *://violentmonkey.github.io/*
// @match        moz-extension://*/dashboard.html
// @match        chrome-extension://*/dashboard.html
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Increase editor font size
    GM_addStyle(`
        /* Violentmonkey code editor */
        textarea,
        .editor,
        .CodeMirror,
        .CodeMirror-line,
        .cm-s-default {
            font-size: 18px !important;
            line-height: 1.6 !important;
        }

        /* For Monaco editor (if used) */
        .monaco-editor {
            font-size: 18px !important;
        }

        /* Generic code blocks */
        code, pre {
            font-size: 18px !important;
        }
    `);

})();
