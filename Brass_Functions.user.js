// ==UserScript==
// @name         Brass Functions
// @namespace    SkyColtNinja/userscripts
// @version      1.1.0
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

    // Brand colors
    const colorsHex = {
        'pacific-blue': '#1e4264',
        'cardinal-red': '#c4403f',
        'sage':         '#5f886f',
        'cool-mint':    '#a3c6b4',
        'deep-pacific': '#2b3843',
        'smoke-blue':   "#4b6471",
    }
    const colorsRGB = {
        'pacific-blue':   'rgb(30, 66, 100)',
        'cardinal-red':   'rgb(196, 64, 63)',
        'sage':           'rgb(95, 136, 111)',
        'cool-mint':      'rgb(163, 198, 180)',
        'deep-pacific':   'rgb(43, 56, 67)',
        'smoke-blue':     'rgb(75, 100, 113)',
    }

    function setNativeValue(element, value) {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        setter.call(element, value);
        element.dispatchEvent(new Event('input', { bubbles: true }));
    }

    function getVisibleHexInput() {
        const inputs = Array.from(document.querySelectorAll('input.k-color-value'));
        return inputs.find(el => el.offsetParent !== null);
    }

    function setColorPicker(color) {
        const hexInput = getVisibleHexInput();
        if (!hexInput) {
            console.error('No visible hex input found.');
            return;
        }

        hexInput.focus();
        setNativeValue(hexInput, color);

        hexInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
        hexInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
    }

    // Keybindings
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'e') {
            e.preventDefault();
            setColorPicker(colorsHex['pacific-blue']);
        };
    });

})();
