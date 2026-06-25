// ==UserScript==
// @name         Test Answers
// @namespace    SkyColtNinja/userscripts
// @version      1.3.1-beta
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

    // TODO
    // - [ ] Add: Motivator assessment support

    // Assessment type ("CRSA", "EIQ", or "DISC")
    const ASSESSMENT = "CRSA";
    let OPTIONS = [];

    // Convert numeric scores (1-5) to their corresponding assessment point values
    // NOTE: This mapping is specific to the DISC assessment and may need to be adjusted for other assessments
    function convertToPoints(scores) {
        const pointMap = { 1: 0, 2: 1, 3: 1, 4: 4, 5: 5 };
        return scores.map(score => String(pointMap[score]));
    };

    function init(assessmentType) {
        // Define answer options based on assessment type
        if (assessmentType === "CRSA" || assessmentType === "EIQ") {
            OPTIONS = ["Strongly Disagree", "Disagree", "Neither Agree nor Disagree", "Agree", "Strongly Agree"];
        } else if (assessmentType === "DISC") {
            OPTIONS = ["Not me", "Less like me", "Neutral", "More like me", "Definitely me"];
            convertedScores = convertToPoints(scores);
        } else {
            console.warn("No answer options defined for assessment type: " + assessmentType);
            // alert(`No answer options defined for assessment type: ${ASSESSMENT}. Must be "CRSA", "EIQ", or "DISC".`);
            return;
        };
    };

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
        // console.log(`Scores:\n` + output);
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
    function printAnswers(points) {
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

        let convertedScores = [];

        // For CRSA assessment
        if (ASSESSMENT === "CRSA") {
            convertedScores = scores;
        } else if (ASSESSMENT === "EIQ") {
            convertedScores = scores;
        } else if (ASSESSMENT === "DISC") {
            // For DISC assessment
            convertedScores = convertToPoints(scores);
        } else {
            console.warn("No point conversion defined for assessment type: " + ASSESSMENT);
            convertedScores = scores;
        };

        // Copy scores to clipboard for easy pasting into spreadsheet
        if (points) {
            GM_setClipboard(convertedScores.join('\n'));
        } else {
            GM_setClipboard(output);
        };
    };

    // Fill answers from a pasted column of numbers (1-5), one per line
    function fillFromInput() {
        const userInput = prompt("Paste response choices (separated by spaces):");
        if (!userInput) return;

        // Parse input into an array of integers
        const values = userInput.trim().split(' ').map(line => parseInt(line.trim()));

        // Validate all values are within range
        const invalid = values.filter(v => isNaN(v) || v < 1 || v > 5);
        if (invalid.length > 0) {
            alert(`Invalid values found: ${invalid.join(', ')}\nAll values must be integers between 1 and 5.`);
            return;
        };

        // Get all radio button groups in order
        const groups = {};
        document.querySelectorAll('input[type="radio"][name^="group_"]').forEach(radio => {
            const group = radio.name;
            if (!groups[group]) groups[group] = [];
            groups[group].push(radio);
        });
        const groupEntries = Object.entries(groups);

        // Abort if input length doesn't match number of questions
        if (values.length !== groupEntries.length) {
            alert(`Input has ${values.length} value(s) but the assessment has ${groupEntries.length} question(s). Aborting.`);
            return;
        };

        let answered = 0;
        let skipped = 0;
        let scores = [];

        groupEntries.forEach(([groupName, radios], index) => {
            const answerChoice = OPTIONS[values[index] - 1];

            const target = radios.find(radio => {
                const label = document.querySelector(`label[for="${radio.id}"]`);
                return label && label.title.trim() === answerChoice;
            });

            if (target) {
                target.click();
                answered++;
                scores.push(values[index]);
            } else {
                console.warn(`No match for "${answerChoice}" in group ${groupName}`);
                skipped++;
            };
        });

        const output = scores.join('\n');
        console.log(`Answered: ${answered} | Skipped: ${skipped}`);
        // console.log(`Scores:\n` + output);
        GM_setClipboard(output);
    };

    // Keybindings
    document.addEventListener('keydown', function(e) {
        // Fill answers with random choices
        if (e.ctrlKey && e.key === 'r') {
            e.preventDefault();
            fillAnswers();
        };
        // Fill answers from pasted input column
        if (e.ctrlKey && e.key === 'g') {
            e.preventDefault();
            fillFromInput();
        };
        // Print choice values (1-5)
        if (e.ctrlKey && e.key === 'a') {
            e.preventDefault();
            printAnswers(false);
        };
        // Print converted point values
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            printAnswers(true);
        };
    });

})();
