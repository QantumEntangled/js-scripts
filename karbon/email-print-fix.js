// ==UserScript==
// @name         Karbon - Fix Email Print
// @namespace    http://tampermonkey.net/
// @version      2026-10-05
// @description  Fix print formatting for Karbon Emails
// @author       Qantumentangled
// @match        https://karbonhqprodemail.com/print/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=karbonhqprodemail.com
// @downloadURL  https://git.farley.pro/QantumEntangled/tampermonkey-scripts/raw/branch/main/karbon/email-print-fix.js
// @updateURL    https://git.farley.pro/QantumEntangled/tampermonkey-scripts/raw/branch/main/karbon/email-print-fix.js
// @grant        none
// ==/UserScript==

function resizeIframe(iframe) {
    const newPar = document.querySelector("body");
    iframe.contentWindow.document.querySelectorAll("body").forEach(div => {
        newPar.append(div);
    });
    iframe.remove();
}

const iframe = document.getElementById("ContentIFrame");

iframe.addEventListener("load", () => resizeIframe(iframe));

window.addEventListener("beforeprint", () => resizeIframe(iframe));
