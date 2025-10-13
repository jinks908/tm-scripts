// ==UserScript==
// @name         OpenAI Theme
// @namespace    http://tampermonkey.net/
// @version      2024-02-01
// @description  Colors and styles for ChatGPT and other OpenAI tools
// @author       SkyColtNinja
// @match        https://chat.openai.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

   GM_addStyle('main {background-color: #031218;}');
   GM_addStyle('.dark.bg-black.rounded-md {background-color: #061a23;}');
   GM_addStyle('.dark.bg-black.rounded-md {border: 1px solid #a2a2a2 !important;}');
   GM_addStyle('li div.group:hover {background-color: #fc9043 !important; color: #031218 !important;}');
   GM_addStyle('li.z-[15] + div.group {background-color: #fc9043 !important; color: #031218 !important;}');
   GM_addStyle('.bg-token-surface-secondary {background-color: #86e7b5 !important; color: #031218 !important;}');
   GM_addStyle('.from-token-surface-secondary {opacity: 0 !important;}');
   GM_addStyle('.bg-gradient-to-l {opacity: 0 !important;}');
   GM_addStyle('div.sticky {background-color: rgba(8, 73, 89, 0.25) !important; color: #ffffff !important; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); -moz-backdrop-filter: blur(10px);}');
   GM_addStyle('.relative .flex.w-full.items-center div {background-color: #15363d !important; color: #c5fbdf !important; font-weight: 800 !important;}');
   GM_addStyle('.relative .flex.w-full.items-center div {border: 1px solid #a2a2a2 !important; box-shadow: none;}');
   GM_addStyle('.bg-token-surface-primary {background-color: #fa9047; color: #031218;}');
   GM_addStyle('button.absolute {background-color: #86e7b5 !important; color: #031218 !important; border: 1px solid #a2a2a2 !important;}');

   GM_addStyle('.scrollbar-trigger .flex.w-full.items-center div {background-color: #061a23 !important; color: #d5f4e4 !important;}');
   GM_addStyle('.hover:bg-token-surface-primary {background-color: #fc9043 !important; color: #d5f4e4 !important;}');
   GM_addStyle('.dark:hover:bg-token-surface-primary.hover:bg-token-surface-primary {background-color: #fc9043 !important; color: #d5f4e4 !important;}');
   GM_addStyle('.scrollbar-trigger .flex.w-full.items-center div {border: 0px !important; box-shadow: none;}');

   GM_addStyle('div#radix-:r16: {background-color: #061a23 !important;}');

})();