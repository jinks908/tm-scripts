// ==UserScript==
// @name         Claude AI
// @namespace    SkyColtNinja/userscripts
// @version      1.2.0
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Claude_AI.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Claude_AI.user.js
// @description  Change default behavior for certain keybindings
// @author       SkyColtNinja
// @match        https://claude.ai/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function handleKeymaps(e) {
        // Block 'Escape' globally (prevent response interruptions)
        if (e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return;
        }

        // Don't override tab moves
        if (e.metaKey && e.shiftKey && (e.code === 'Comma' || e.code === 'Period')) {
            e.stopPropagation();
            e.stopImmediatePropagation();
            return;
        }

        // Input-scoped events
        const el = e.target instanceof Element ? e.target : null;
        if (!el || !el.closest('[data-testid="chat-input"]')) return;

        if (e.ctrlKey || e.shiftKey) return;

        // Block 'Enter' key to prevent accidental submissions
        // Use 'Ctrl+Enter' to submit instead
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
    }

    window.addEventListener('keydown', handleKeymaps, true);
})();
