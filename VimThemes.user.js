// ==UserScript==
// @name         Vim Colorschemes Styles
// @namespace    SkyColtNinja/userscripts
// @version      1.0.1
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/VimThemes.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/VimThemes.user.js
// @description  Font and Styles for Vim Colorschemes
// @author       SkyColtNinja
// @match        https://vimcolorschemes.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
        @font-face {
            font-family: 'JetBrains Mono';
            font-style: normal;
            font-display: auto;
            font-weight: 400;
            src: url(https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-400-normal.woff2) format('woff2'),
                url(https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-400-normal.woff) format('woff');
            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
        }
        @font-face {
            font-family: 'Source Code Pro';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: url(https://cdn.jsdelivr.net/fontsource/fonts/source-code-pro@latest/latin-400-normal.woff2) format('woff2'),
                url(https://cdn.jsdelivr.net/fontsource/fonts/source-code-pro@latest/latin-400-normal.woff) format('woff');
            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
        }
        @font-face {
            font-family: 'Fira Code';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: url(https://cdn.jsdelivr.net/fontsource/fonts/fira-code@latest/latin-400-normal.woff2) format('woff2'),
                url(https://cdn.jsdelivr.net/fontsource/fonts/fira-code@latest/latin-400-normal.woff) format('woff');
            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
        }
        article > div > pre > code {
            font-family: 'Source Code Pro', monospace !important;
        }
    `);

})();
