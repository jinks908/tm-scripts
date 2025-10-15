// ==UserScript==
// @name         Violentmonkey Editor Styles
// @namespace    SkyColtNinja/userscripts
// @version      1.1.3
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/VM_Editor.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/VM_Editor.user.js
// @description  Increase font size in Violentmonkey editor
// @author       SkyColtNinja
// @match        *://violentmonkey.github.io/*
// @include      /^moz-extension:\/\/.*\/dashboard/
// @include      /^chrome-extension:\/\/.*\/dashboard/
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
            font-size: 16px !important;
            line-height: 1.6 !important;
        }

        /* For Monaco editor (if used) */
        .monaco-editor {
            font-size: 16px !important;
        }

        /* Generic code blocks */
        code, pre {
            font-size: 16px !important;
        }
    `);

})();
