// ==UserScript==
// @name         Test Answers
// @namespace    SkyColtNinja/userscripts
// @version      1.2.2
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Test_Answers.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Test_Answers.user.js
// @description  Fill out assessment answers for testing scores (can randomize or set to a specific answer)
// @author       SkyColtNinja
// @match        https://jinksperspective.brilliantassessments.com/Home/Index*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// @grant        GM_setClipboard
// ==/UserScript==


(function() {
    'use strict';

    // EIQ assessment choices
    // const OPTIONS = ["Strongly Disagree", "Disagree", "Neither Agree nor Disagree", "Agree", "Strongly Agree"];

    // DISC assessment choices
    const OPTIONS = ["Not me", "Less like  me", "Neutral", "More like me", "Definitely me"];

    // Fill out assessment with either random answers or a specific choice (if provided)
    function fillAnswers(choice) {

        // Function to randomize answer if no specific choice is provided
        function randomizeAnswer() {
            const answer = OPTIONS[Math.floor(Math.random() * OPTIONS.length)];
            return answer;
        };

        const groups = {};
        // Select all radio button groups
        document.querySelectorAll('input[type="radio"][name^="group_"]').forEach(radio => {
            const group = radio.name;
            if (!groups[group]) groups[group] = [];
            groups[group].push(radio);
        });

        let answered = 0;
        let skipped = 0;
        let scores = [];

        Object.entries(groups).forEach(([groupName, radios]) => {
            // If 'choice' provided, use it, otherwise randomize
            const ANSWER_CHOICE = choice || randomizeAnswer();

            // Find the radio whose label matches the randomly selected answer
            const target = radios.find(radio => {
                const label = document.querySelector(`label[for="${radio.id}"]`);
                return label && label.title.trim() === ANSWER_CHOICE;
            });

            if (target) {
                target.click();
                answered++;
                // Store the answer choice (for column output)
                scores.push(OPTIONS.indexOf(ANSWER_CHOICE) + 1);
            } else {
                console.warn(`No match for "${ANSWER_CHOICE}" in group ${groupName}`);
                skipped++;
            }
        });
        const output = scores.join('\n');
        console.log(`Answered: ${answered} | Skipped: ${skipped}`);
        console.log(`Scores:\n` + output);
        // Copy scores to clipboard for easy pasting into spreadsheet
        GM_setClipboard(output);
    };

    // Prompt user for answer choice (1-5)
    function getAnswerChoice() {
        // const userChoice = prompt("Enter choice number:\n1) Strongly Disagree\n2) Disagree\n3) Neither Agree nor Disagree\n4) Agree\n5) Strongly Agree");
        const userChoice = prompt("Enter choice number:\n1) Not me\n2) Less like me\n3) Neutral\n4) More like me\n5) Definitely me");
        const choiceIndex = parseInt(userChoice) - 1;
        let answerChoice = null;

        // Validate input and return corresponding option
        if (choiceIndex >= 0 && choiceIndex < OPTIONS.length) {
            answerChoice = OPTIONS[choiceIndex];
        } else {
            alert("Invalid choice. Please enter a number between 1 and 5.");
            answerChoice = null;
        };
        fillAnswers(answerChoice);
    };

    // Print currently selected answers (doesn't make changes)
    function printAnswers() {
        const scores = [];
        const currentAnswers = document.querySelectorAll('input[type="radio"][name^="group_"]');
        currentAnswers.forEach(radio => {
            if (radio.checked) {
                const label = document.querySelector(`label[for="${radio.id}"]`);
                if (label) {
                    const score = OPTIONS.indexOf(label.title.trim()) + 1;
                    scores.push(score);
                };
            };
        });
        const output = scores.join('\n');
        console.log(`Current Scores:\n` + output);
        // Copy scores to clipboard for easy pasting into spreadsheet
        GM_setClipboard(output);
    };

    // Keybinding (Ctrl+G)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'g') {
            e.preventDefault();
            fillAnswers();
        };
        if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            getAnswerChoice();
        };
        if (e.ctrlKey && e.key === 'a') {
            e.preventDefault();
            printAnswers();
        };
    });

})();
