// ==UserScript==
// @name         Fix Karbon Email Print
// @namespace    http://tampermonkey.net/
// @version      2026-07-28
// @description  Fix print formatting for Karbon Emails
// @author       Qantumentangled
// @match        https://karbonhqprodemail.com/print/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=karbonhqprodemail.com
// @grant        none
// ==/UserScript==

function resizeIframe(iframe) {
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    iframe.style.height =
        doc.documentElement.scrollHeight + "px";
}

const iframe = document.getElementById("ContentIFrame");

iframe.addEventListener("load", () => resizeIframe(iframe));

window.addEventListener("beforeprint", () => resizeIframe(iframe));
