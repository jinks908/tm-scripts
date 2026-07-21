// ==UserScript==
// @name         Brass Session
// @namespace    SkyColtNinja/userscripts
// @version      1.2.4
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Brass_Session.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Brass_Session.user.js
// @description  Ping the server at regular intervals to remain logged in
// @author       SkyColtNinja
// @match        https://jinksperspective.brilliantassessments.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    setInterval(() => {
        // Ping the server by sending a GET request to the current page URL with credentials included
        fetch(location.href, { credentials: 'include', method: 'GET' })
            .catch(() => {});
        // Log each ping with timestamp for debug/review
        console.log('Session pinged at ' + new Date().toLocaleTimeString());
    // 20 minutes
    }, 20 * 60 * 1000);
})();
