// ==UserScript==
// @name         Brass Functions
// @namespace    SkyColtNinja/userscripts
// @version      1.0.1
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

    const colorsHex = {
        'pacific-blue': '#1e4264',
        'cardinal-red': '#c4403f',
        'sage':         '#5f886f',
        'cool-mint':    '#a3c6b4',
        'deep-pacific': '#2b3843',
        'smoke-blue':   "#4b6471",
    }

    const colorsRGB = {
        'hsv-color-blue': 'rgb(0, 131, 255)',
        'pacific-blue': 'rgb(30, 66, 100)',
        'cardinal-red': 'rgb(196, 64, 63)',
        'sage':         'rgb(95, 136, 111)',
        'cool-mint':    'rgb(163, 198, 180)',
        'deep-pacific': 'rgb(43, 56, 67)',
        'smoke-blue':   'rgb(75, 100, 113)',
    }

    function setColorPicker(color) {
        const slider = document.querySelector('.k-animation-container .k-slider .k-draghandle');
        const pickerBox = document.querySelector('.k-animation-container .k-selected-color .k-selected-color-display');
        const hsvBox = document.querySelector('.k-animation-container .k-hsv-rectangle');
        const picker = document.querySelector('.k-draghandle');

        if (slider && picker) {
            picker.style.left = '175px';
            picker.style.top = '109.41px';
            pickerBox.style.backgroundColor = colorsRGB['pacific-blue'];
            hsvBox.style.backgroundColor = colorsRGB['hsv-color-blue'];
            slider.style.left = '123px';
            slider.setAttribute('aria-valuenow', '209.14');
            slider.setAttribute('aria-valuetext', '209.14');
        }
    }

    // Keybindings
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'e') {
            e.preventDefault();
            setColorPicker();
        };
    });

})();
