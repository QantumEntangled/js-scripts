// ==UserScript==
// @name         Karbon - Shortcuts
// @namespace    http://tampermonkey.net/
// @version      2025-12-23
// @description  Multiple shortcuts for Karbon Work pages
// @author       Mikel Farley
// @match        https://app2.karbonhq.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=karbonhq.com
// @require      https://raw.githubusercontent.com/CoeJoder/waitForKeyElements.js/refs/heads/master/waitForKeyElements.js
// @run-at       document-start
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

function doc_keyUp(e) {
    //console.log(e);
    if (e.ctrlKey && e.shiftKey) {
        switch (e.key) {
            case 'q':
                // Ctrl+Q Complete Work
                runSteps([
                    "div#main-container > div.grid-block > div.grid-container > div.work-item-hero-panel > div.work-item-hero-panel__content > div.drop-down-button > button.drop-down-button__toggle",
                    "div#main-container > div.grid-block > div.grid-container > div.work-item-hero-panel > div.work-item-hero-panel__content > div.drop-down-button > ul.drop-down-button__list > button:nth-child(6)",
                    'div#modal-overlays > div.modal-dialog-bl > div.ember-modal-dialog > div.khq-text-right > khq-button[variant="primary"]'
                ]);
                break;
        }
    }
    if (e.altKey) {
        switch (e.key) {
            case '`':
                // Alt+` Expand/Collapse Task Sections
                runSteps([
                    "div.grid-container > div > div > div.checklist-sections > div.expandCollapseSections > span"
                ]);
                break;
            case 'a':
                // Alt+A Mark Next Task Completed
                runSteps([
                    "div.selectable-type-icon__checkbox:not(.active)"
                ]);
                break;
            case 'z': {
                // Alt+Z Switch tab to the left
                let curTab = Array.from(document.querySelector('div.work-item-hero-panel__content > ul.tab-bar').children).findIndex(li => li.querySelector('a.active')) + 1;
                if (curTab > 1) {
                    let newTab = curTab - 1;
                    runSteps([
                        `div.work-item-hero-panel__content > ul.tab-bar > li:nth-child(${newTab}) > a`
                    ]);
                };
                break;};
            case 'x': {
                // Alt+X Switch tab to the right
                let parentTab = Array.from(document.querySelector('div.work-item-hero-panel__content > ul.tab-bar').children);
                let curTab = parentTab.findIndex(li => li.querySelector('a.active')) + 1;
                if (curTab < parentTab.length) {
                    let newTab = curTab + 1;
                    runSteps([
                        `div.work-item-hero-panel__content > ul.tab-bar > li:nth-child(${newTab}) > a`
                    ]);
                };
                break;};
            case '1':
                // Alt+1 Timeline
                runSteps([
                    'div.work-item-hero-panel__content > ul.tab-bar > li:nth-child(1) > a'
                ]);
                break;
            case '2':
                // Alt+2 Tasks
                runSteps([
                    'div.work-item-hero-panel__content > ul.tab-bar > li:nth-child(2) > a'
                ]);
                break;
            case '3':
                // Alt+3 Time & Budget
                runSteps([
                    'div.work-item-hero-panel__content > ul.tab-bar > li:nth-child(3) > a'
                ]);
                break;
            case '4':
                // Alt+4 Documents
                runSteps([
                    'div.work-item-hero-panel__content > ul.tab-bar > li:nth-child(4) > a'
                ]);
                break;
            case '5':
                // Alt+5 Details
                runSteps([
                    'div.work-item-hero-panel__content > ul.tab-bar > li:nth-child(5) > a'
                ]);
                break;
            case 'q':
                // Alt+Q Reset Work to Template
                runSteps([
                    "div#main-container > div.grid-block > div.grid-container > div.work-item-hero-panel > div.work-item-hero-panel__content > div.drop-down-button > button.drop-down-button__toggle",
                    "div#main-container > div.grid-block > div.grid-container > div.work-item-hero-panel > div.work-item-hero-panel__content > div.drop-down-button > ul.drop-down-button__list > button:nth-child(14)",
                    'div#modal-overlays > div.modal-dialog-bl > div.ember-modal-dialog > div.dialog-action-bar > button.action-button--primary'
                ]);
                break;
        }
    }
};

document.addEventListener('keydown', doc_keyUp);
