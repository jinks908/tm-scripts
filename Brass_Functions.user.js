// ==UserScript==
// @name         Brass Functions
// @namespace    SkyColtNinja/userscripts
// @version      1.2.3
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Brass_Functions.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Brass_Functions.user.js
// @description  Custom functions/automations for Brilliant Assessment Builder
// @author       SkyColtNinja
// @match        https://jinksperspective.brilliantassessments.com/*
// @exclude      https://jinksperspective.brilliantassessments.com/Home/Index*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==


(function() {
    'use strict';

    // Brand colors
    const colorsHex = {
        // Main colors
        'pacific-blue': '#1e4264',
        'cardinal-red': '#c4403f',
        'sage':         '#5f886f',
        'cool-mint':    '#a3c6b4',
        'deep-pacific': '#2b3843',
        'smoke-blue':   '#4b6471',
        // Chart colors (dimmed)
        'blue-chart':   '#94abb8',
        'sage-chart':   '#a5c0af',
        'mint-chart':   '#d0e2d8',
        'red-chart':    '#edc4c4',
    }
    const colorsRGB = {
        'pacific-blue':   'rgb(30, 66, 100)',
        'cardinal-red':   'rgb(196, 64, 63)',
        'sage':           'rgb(95, 136, 111)',
        'cool-mint':      'rgb(163, 198, 180)',
        'deep-pacific':   'rgb(43, 56, 67)',
        'smoke-blue':     'rgb(75, 100, 113)',
    }

    // Listen for global jQuery events (AJAX requests) to verify success/failure for saveThemeEdit()
    $(document).ajaxSuccess(function(event, xhr, settings) {
        if (settings.url.includes('SaveThemeEdit')) {
            console.log('Saved theme changes');
        }
    });
    $(document).ajaxError(function(event, xhr, settings) {
        if (settings.url.includes('SaveThemeEdit')) {
            console.error('Failed to save theme changes:', xhr.status, xhr.statusText);
        }
    });

    // Sets value using the native DOM property setter,
    // then manually dispatches an 'input' event to update
    function setNativeValue(element, value) {
        // Grab the *original* value setter from HTMLInputElement's prototype,
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        setter.call(element, value);
        // Fire a real 'input' event so anything listening for changes picks up the new value
        element.dispatchEvent(new Event('input', { bubbles: true }));
    }

    // Find color input field that is currently visible (not hidden) in the DOM
    function getVisibleHexInput() {
        // Grab all hex inputs (including hidden)
        const inputs = Array.from(document.querySelectorAll('input.k-color-value'));
        // Return the first one that's actually rendered/visible;
        return inputs.find(el => el.offsetParent !== null);
    }

    // Set the color of the currently open color picker to the specified hex value
    function setColorPicker(color) {
        // Locate the hex input belonging to the currently visible popup
        const hexInput = getVisibleHexInput();
        if (!hexInput) {
            // No open/visible color picker found — nothing to do
            console.error('No visible hex input found.');
            return;
        }
        // Focus the field
        hexInput.focus();
        // Set the value using the native setter
        setNativeValue(hexInput, color);
        // Simulate a real Enter keypress (keydown + keyup)
        hexInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
        hexInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
        // Save the theme edit
        saveThemeEdit();
    }

    // Prompt user for brand color selection and set the color picker to the selected color
    function colorFromInput() {
        // Prompt user for brand color selection
        const userInput = prompt(`Enter brand color selection
        1 = Pacific Blue, 2 = Cardinal Red, 3 = Sage, 4 = Cool Mint, 5 = Smoke Blue, 6 = Deep Pacific
        7 = Blue Chart, 8 = Red Chart, 9 = Sage Chart, 0 = Mint Chart`);
        if (!userInput) return;

        // Map user input to corresponding color hex values
        const mapToColor = {
            1: 'pacific-blue',
            2: 'cardinal-red',
            3: 'sage',
            4: 'cool-mint',
            5: 'deep-pacific',
            6: 'smoke-blue',
            7: 'blue-chart',
            8: 'red-chart',
            9: 'sage-chart',
            0: 'mint-chart'
        };

        // Trim and validate input
        const selectedColor = colorsHex[mapToColor[userInput.trim()]];
        if (!selectedColor) {
            alert('Invalid selection. Please enter a number between 0 and 9.');
            return;
        }
        // Set the color picker to the selected color
        setColorPicker(selectedColor);
    }

    // Keybindings
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'e') {
            e.preventDefault();
            // Set the color picker to Pacific Blue
            setColorPicker(colorsHex['pacific-blue']);
        }
        // Ctrl + Shift + G to prompt for brand color selection
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'g') {
            e.preventDefault();
            colorFromInput();
        }
    });

})();
