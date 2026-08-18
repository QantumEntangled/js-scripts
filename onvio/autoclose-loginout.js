// ==UserScript==
// @name         Onvio - Auto-Close Tabs
// @namespace    http://tampermonkey.net/
// @version      2026-08-18
// @description  Auto-Close tabs created from CS Professional sign-outs
// @author       QantumEntangled
// @match        https://onvio.us/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=onvio.us
// @downloadURL  https://raw.githubusercontent.com/QantumEntangled/js-scripts/main/onvio/autoclose-loginout.js
// @updateURL    https://raw.githubusercontent.com/QantumEntangled/js-scripts/main/onvio/autoclose-loginout.js
// @grant        window.close
// ==/UserScript==

// Convenience function to execute your callback only after an element matching readySelector has been added to the page.
// Example: runWhenReady('.search-result', augmentSearchResults);
// Gives up after 1 minute.
function runWhenReady(readySelector, callback) {
    var numAttempts = 0;
    var tryNow = function() {
        var elem = document.querySelector(readySelector);
        if (elem) {
            callback(readySelector);
        } else {
            numAttempts++;
            if (numAttempts >= 34) {
                console.warn('Giving up after 34 attempts. Could not find: ' + readySelector);
            } else {
                setTimeout(tryNow, 250 * Math.pow(1.1, numAttempts));
            }
        }
    };
    tryNow();
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const closeTab = async () => {
    await delay(2000);
    window.close();
};

runWhenReady("#bm-desktop-event[translate='BM.Login.Desktop.Logout.Error.Title']",closeTab);
runWhenReady("#bm-desktop-event[translate='BM.Login.Desktop.SignIn.Success.Title']",closeTab);
