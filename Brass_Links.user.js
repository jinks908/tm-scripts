// ==UserScript==
// @name         Brass Links
// @namespace    SkyColtNinja/userscripts
// @version      1.0.0
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Brass_Links.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Brass_Links.user.js
// @description  Fix deprecated links/click events in BA
// @author       SkyColtNinja
// @match        https://jinksperspective.brilliantassessments.com/*
// @exclude      https://jinksperspective.brilliantassessments.com/Home/Index*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function fixLinks() {
        const ratingsList = document.getElementById('gridRatingTypeRatingsList');
        if (!ratingsList) return;

        ratingsList
            .querySelectorAll('a[onclick^="assessmentSettingsRatingsSegmentationList"]')
            .forEach(link => {
                const oldHandler = link.getAttribute('onclick');
                link.setAttribute('onclick', oldHandler.replace('Segmentation', 'Theme'));
            });
    }

    new MutationObserver(fixLinks).observe(document.body, {
        childList: true,
        subtree: true
    });

    fixLinks();
})();
