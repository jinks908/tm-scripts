// ==UserScript==
// @name         Brass Functions
// @namespace    SkyColtNinja/userscripts
// @version      1.0.0
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Brass_Functions.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Brass_Functions.user.js
// @description  Custom functions/automations for Brilliant Assessment Builder
// @author       SkyColtNinja
// @match        https://jinksperspective.brilliantassessments.com/AssessmentBuilder*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// @grant        GM_setClipboard
// ==/UserScript==


(function() {
    'use strict';

    function openEditPanels() {
        const questions = document.querySelectorAll('div[id^="dvquestion_"] div.k-question');
        // Display all hover menu panels for each question
        questions.forEach(panel => {
            panel.classList.add('hovered');
            const editButton = panel.querySelector('.edit-box .form-inline button.btn--edit');
            if (editButton) {
                editButton.click();
            }
        });

        const editButtons = document.querySelectorAll('button[data-edit-modal="#modify--question"]');
    }

    // Keybindings
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'e') {
            e.preventDefault();
            openEditPanels();
        };
    });

})();
