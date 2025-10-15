// ==UserScript==
// @name         Violentmonkey Editor Styles
// @namespace    SkyColtNinja/userscripts
// @version      1.1.4
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/VM_Editor.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/VM_Editor.user.js
// @description  Increase font size in Violentmonkey editor
// @author       SkyColtNinja
// @match        moz-extension://*/options/index.html*
// @include      /^moz-extension:\/\/.*\/options\/index\.html/
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // Increase editor font size
    GM_addStyle(`
        /* Violentmonkey code editor */
        .CodeMirror-code {
            font-size: 19px !important;
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
