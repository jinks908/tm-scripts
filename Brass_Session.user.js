// ==UserScript==
// @name         Brass Session
// @namespace    SkyColtNinja/userscripts
// @version      1.0.0
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
        document.dispatchEvent(new MouseEvent('mousemove', {
            bubbles: true,
            clientX: Math.floor(Math.random() * window.innerWidth),
            clientY: Math.floor(Math.random() * window.innerHeight)
        }));

        document.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Shift' }));
        document.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, key: 'Shift' }));

        fetch(location.href, { credentials: 'include', method: 'GET' })
            .catch(() => {});
    }, 5 * 60 * 1000); // 5 minutes

})();
