// ==UserScript==
// @name         Brass Styles
// @namespace    SkyColtNinja/userscripts
// @version      1.0.0
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Brass_Styles.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Brass_Styles.user.js
// @description  Styles / Dark Mode for Brilliant Assessments
// @author       SkyColtNinja
// @match        https://jinksperspective.brilliantassessments.com/Home/Index*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==


(function() {
    'use strict';

    GM_addStyle(`
        .highcharts-axis-labels .highcharts-xaxis-labels text {
            fill: #ffffff !important;
        }
    `)

})();
