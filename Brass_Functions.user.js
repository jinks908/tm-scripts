// ==UserScript==
// @name         Brass Functions
// @namespace    SkyColtNinja/userscripts
// @version      1.1.3
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
    }

    // Keybindings
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'e') {
            e.preventDefault();
            // Set the color picker to Pacific Blue
            setColorPicker(colorsHex['pacific-blue']);
        };
    });

})();
