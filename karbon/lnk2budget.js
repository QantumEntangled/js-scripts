// ==UserScript==
// @name         Karbon - Lnk2Budget
// @namespace    http://tampermonkey.net/
// @version      2025-12-23
// @description  Open to Details tab
// @author       Mikel Farley
// @match        https://app2.karbonhq.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=karbonhq.com
// @require      https://raw.githubusercontent.com/CoeJoder/waitForKeyElements.js/refs/heads/master/waitForKeyElements.js
// @grant        none
// ==/UserScript==

// Convenience function to execute your callback only after an element matching readySelector has been added to the page.
// Example: runWhenReady('.search-result', augmentSearchResults);
// Gives up after 1 minute.
function runWhenReady(readySelector, callback, i1) {
    var numAttempts = 0;
    var tryNow = function() {
        var elem = document.querySelector(readySelector);
        if (elem) {
            callback(readySelector, i1);
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

const contactQry = "ul.block-list > li.block-list__item > a[href*='#\/'], ul.block-list > li.block-list__item > a[href*='#\/contacts\/']";
const workQry = "div.work-view__content > div > div.work-view-list > ul.work-view-list__list > li.work-view-list-item > a.work-view-list-item__column";

const lnkAddr = '/budget';

function detailLinks(qry, lnk) {
    'use strict';
    const lnks = document.querySelectorAll(qry);
    if (lnks.length < 1) {
        console.log("No links found");
    };
    lnks.forEach( (el) => {
        const href = el.getAttribute('href');
        const el2 = href.concat(lnk);
        el.setAttribute('href', el2);
        //console.log("set href: " + el2);
    });
};

//console.log("Watching for filter bar");
runWhenReady(contactQry, detailLinks, lnkAddr);
runWhenReady(workQry, detailLinks, lnkAddr);
//console.log("Done watching for filter bar");
