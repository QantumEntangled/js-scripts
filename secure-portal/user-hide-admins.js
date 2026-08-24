// ==UserScript==
// @name         Secure Portal - Hide Admins
// @namespace    http://tampermonkey.net/
// @version      2026-08-24
// @description  Hide Admins from Subscription Lists
// @author       QantumEntangled
// @match        https://www.securefirmportal.com/User/EditUser/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=securefirmportal.com
// @downloadURL  https://raw.githubusercontent.com/QantumEntangled/js-scripts/main/secure-portal/user-hide-admins.js
// @updateURL    https://raw.githubusercontent.com/QantumEntangled/js-scripts/main/secure-portal/user-hide-admins.js
// @grant        GM_setClipboard
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

function setSelectVal(readySelector) {
    var elem = document.querySelector(readySelector);
    elem.value = -1;
    elem.dispatchEvent(new Event('change'));
}

function hideElements(els) {
    for (const e of els) {
        e.style.display = "none";
        e.classList.remove("subbed");
    }
}

function showElements(els) {
    for (const e of els) {
        e.style.display = null;
        e.classList.add("subbed");

    }
}

function process() {
    var el1 = document.querySelectorAll("tr:has(td.sorting_1)");
    hideElements(el1);

    var el2 = document.querySelectorAll('tr:has(td.sorting_1 > input[checked="checked"])');
    showElements(el2);

    var el3 = document.querySelectorAll("tr:has(td > input[value='Admin'])");
    hideElements(el3);

    var el4 = document.querySelectorAll('tr.subbed > td:nth-child(3) > input');
    var subs = [];
    for (const e of el4) {
        subs.push("".concat(e.value,"\t"));
    }
    if (subs.length < 1) {
        GM_setClipboard("_","text");
    } else {
        GM_setClipboard(subs, "text");
    }

}

GM_setClipboard("ERROR","text");
runWhenReady("tr:has(td.sorting_1)", process);
