// ==UserScript==
// @name         Brass Links
// @namespace    SkyColtNinja/userscripts
// @version      1.1.0
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Brass_Links.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Brass_Links.user.js
// @description  Fix deprecated links/click events in BA
// @author       SkyColtNinja
// @match        https://jinksperspective.brilliantassessments.com/*
// @exclude      https://jinksperspective.brilliantassessments.com/Home/Index*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

// Vendor bug: Ratings tab still links to the deprecated
// assessmentSettingsRatingsSegmentationList(). Remove when they fix it.
// Noticed 2026-08-07.

(function() {
    'use strict';

    // Bail early if we're not on the assessment settings page at all.
    if (!document.getElementById('assessmentsettingsratings')) return;

    // Injection
    function fixLinks() {
        // Grab main ratings list table
        const ratingsList = document.getElementById('gridRatingTypeRatingsList');
        if (!ratingsList) return;

        ratingsList
            // BA has migrated from Segmentation -> Theme, but there are stale links in the DOM
            .querySelectorAll('a[onclick^="assessmentSettingsRatingsSegmentationList"]')
            .forEach(link => {
                const oldHandler = link.getAttribute('onclick');
                // Replace the old click handler with the new one
                link.setAttribute('onclick', oldHandler.replace('Segmentation', 'Theme'));
            });
    }

    // Observe the ratings list for changes and fix links when they occur
    new MutationObserver(fixLinks).observe(
        document.getElementById('assessmentsettingsratings'),
        { childList: true, subtree: true }
    );

    // Execute once on initial load to fix any existing links
    fixLinks();

})();
