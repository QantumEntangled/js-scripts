// ==UserScript==
// @name         Karbon - Open All Works
// @namespace    http://tampermonkey.net/
// @version      2026-08-24
// @description  Mark work as Completed
// @author       QantumEntangled
// @match        https://app2.karbonhq.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=karbonhq.com
// @require      https://raw.githubusercontent.com/CoeJoder/waitForKeyElements.js/refs/heads/master/waitForKeyElements.js
// @downloadURL  https://raw.githubusercontent.com/QantumEntangled/js-scripts/main/karbon/action-openAllWorks.js
// @updateURL    https://raw.githubusercontent.com/QantumEntangled/js-scripts/main/karbon/action-openAllWorks.js
// @grant        GM_openInTab
// @run-at       context-menu
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

function detailLinks(qry, lnk) {
    'use strict';
    const lnks = document.querySelectorAll(qry);
    if (lnks.length < 1) {
        console.log("No links found");
    };
    var pause = 0;
    var tab = 3;
    lnks.forEach( (el) => {
        setTimeout(function (){
            GM_openInTab(el.href+lnk,{options: {loadInBackground: true, setParent: true, insert: tab}})
        }, pause);
        pause = pause + 1200;
        tab = tab + 1;
    });
};

const contactQry = "ul.block-list > li.block-list__item > a[href*='#\/'], ul.block-list > li.block-list__item > a[href*='#\/contacts\/']";
const workQry = "div.work-view__content > div > div.work-view-list > ul.work-view-list__list > li.work-view-list-item > a.work-view-list-item__column";
const templateWorkQry = 'div.khq-group > div > a[href^="#/work/"]';

const lnkAddrDetails = "/details";
const lnkAddrTasks = "/tasks";

runWhenReady(contactQry, detailLinks, lnkAddrDetails);
runWhenReady(workQry, detailLinks, "");
runWhenReady(templateWorkQry, detailLinks, lnkAddrTasks);
