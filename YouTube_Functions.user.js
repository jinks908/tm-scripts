// ==UserScript==
// @name         YouTube Functions
// @namespace    SkyColtNinja/userscripts
// @version      1.0.1
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/YouTube_Functions.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/YouTube_Functions.user.js
// @description  YouTube video player functions and enhancements
// @author       SkyColtNinja
// @match        https://www.youtube.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    // TODO
    // [ ] Add: Video titles next to their respective links
    // [ ] Add: Popup/alert confirmation

    function getWatchedSources() {
        let thumbnails = document.querySelectorAll('yt-lockup-view-model');
        let links = [];
        thumbnails.forEach(thumbnail => {
            let progressBar = thumbnail.querySelector('.ytThumbnailOverlayProgressBarHost');
            if (progressBar) {
                // We're looking for this acnhor tag
                // <a href="/watch?v=tAzDdC43RwE&amp;t=321s" class="ytLockupViewModelContentImage">
                let link = thumbnail.querySelector('a.ytLockupViewModelContentImage').href;
                links.push(link);
                console.log(link);
            }
        })
        GM_setClipboard(links.join('\n'));
    };

    // Bind Shift+Ctrl+G to copy watched video links to clipboard
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'g') {
            e.preventDefault();
            getWatchedSources();
        };
    })


})();
