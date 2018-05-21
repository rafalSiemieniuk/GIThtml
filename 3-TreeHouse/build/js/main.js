'use strict';

var navBar = document.getElementsByClassName('nav__navigation-bar')[0];

window.addEventListener('load', function () {
    screenDetection();
});
window.addEventListener('scroll', function () {
    screenDetection();
});

var screenDetection = function screenDetection() {
    console.log(window.scrollY);
    if (window.scrollY >= 94) {
        navBar.classList.add('nav__scroll-mini-bar');
    } else {
        navBar.classList.remove('nav__scroll-mini-bar');
    }
};