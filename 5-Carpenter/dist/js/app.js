'use strict';

var loadingPage = document.getElementsByClassName('section__curtain')[0];

window.addEventListener('load', function () {
    loadingPage.classList.add('disappear');
    setTimeout(function () {
        loadingPage.remove();
    }, 1200);
});