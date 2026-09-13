// ==UserScript==
// @name         YouTube Total Time
// @namespace    SkyColtNinja/userscripts
// @version      1.0.0
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/YouTube_Total_Time.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/YouTube_Total_Time.user.js
// @description  Count total runtime of all videos in a playlist
// @author       SkyColtNinja
// @match        https://www.youtube.com/playlist*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==


(function() {
    'use strict';

    function getTotalTime() {
        const videos = document.querySelectorAll('div#primary yt-section-list-renderer yt-item-section-renderer div#contents yt-lockup-view-model');
        let totalSeconds = 0;

        videos.forEach(video => {
            const timestamp = video.querySelector('yt-thumbnail-view-model yt-thumbnail-bottom-overlay-view-model yt-thumbnail-badge-view-model div.ytBadgeShapeText').textContent;
            const length = timestamp.split(':').length;
            if (length === 2) {
                const [minutes, seconds] = timestamp.split(':').map(Number);
                totalSeconds += minutes * 60 + seconds;
            } else if (length === 3) {
                const [hours, minutes, seconds] = timestamp.split(':').map(Number);
                totalSeconds += hours * 3600 + minutes * 60 + seconds;
            } else {
                console.error(`Invalid timestamp format: ${timestamp}`);
            }
        });

        const totalHours = Math.floor(totalSeconds / 3600);
        const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
        const totalRemainingSeconds = totalSeconds % 60;

        const totalTimeString = `${totalHours}h ${totalMinutes}m ${totalRemainingSeconds}s`;
        console.log(totalTimeString);
    };

    document.addEventListener('keydown', function(e) {
        // Print total playlist runtime to console (Ctrl + Shift + T)
        if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 't') {
            e.preventDefault();
            getTotalTime();
        };
    });

})();
