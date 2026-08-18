// ==UserScript==
// @name         Karbon - No Default Time Filters
// @namespace    http://tampermonkey.net/
// @version      2026-08-18
// @description  Automatically remove default filters from Time Entries screen
// @author       QantumEntangled
// @match        https://app2.karbonhq.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=karbonhq.com
// @require      https://raw.githubusercontent.com/CoeJoder/waitForKeyElements.js/refs/heads/master/waitForKeyElements.js
// @downloadURL  https://raw.githubusercontent.com/QantumEntangled/js-scripts/main/karbon/no-default-filters.js
// @updateURL    https://raw.githubusercontent.com/QantumEntangled/js-scripts/main/karbon/no-default-filters.js
// @grant        none
// ==/UserScript==

// Convenience function to execute your callback only after an element matching readySelector has been added to the page.
// Example: runWhenReady('.search-result', augmentSearchResults);
// Gives up after 1 minute.
function runWhenReady() {
    var numAttempts = 0;
    var tryNow = function() {
        var elem = document.querySelector("div.budget-filter-bar--container > div.budget-filter-bar > div.filter-bar__pill-container > div.filter-pill > div.filter-pill__remove");
        if (elem) {
           document.querySelector("div.budget-filter-bar--container > div.budget-filter-bar > div.filter-bar__pill-container > div.filter-pill > div.filter-pill__remove").click()
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

//console.log("Watching for filter bar");
runWhenReady();
//console.log("Done watching for filter bar");
