// ==UserScript==
// @name         Secure Portal - User Subs
// @namespace    http://tampermonkey.net/
// @version      2026-05-28
// @description  Open the notifications tab automatically when loading a user page.
// @author       Mikel Farley
// @match        https://www.securefirmportal.com/User/EditUser/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=securefirmportal.com
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

function setSelectVal(readySelector) {
    var elem = document.querySelector(readySelector);
    elem.value = -1;
    elem.dispatchEvent(new Event('change'));
}

runSteps([
    "#ui-id-4"
]);
runWhenReady("select", setSelectVal);
