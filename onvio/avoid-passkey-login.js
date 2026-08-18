// ==UserScript==
// @name         Onvio - Avoid Passkey Login
// @namespace    http://tampermonkey.net/
// @version      2026-06-24
// @description  Auto-avoid Passkey for 2-Factor Auth for CS Professional sign-ins
// @author       Mikel Farley
// @match        https://auth.thomsonreuters.com/u/mfa-webauthn-platform-challenge*
// @match        https://auth.thomsonreuters.com/u/mfa-webauthn-challenge*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=onvio.us
// @grant        none
// ==/UserScript==

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

function clickButton(qry) {
    'use strict';
    document.querySelector(qry).click();
};

function runSteps(steps) {
    for (let index = 0; index < steps.length; index++) {
        const element = steps[index];
        runWhenReady(element, clickButton);
    }
};

runSteps([
    ".ulp-action-form-pick-authenticator > button"
]);
