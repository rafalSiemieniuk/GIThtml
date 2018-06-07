'use strict';

////////////////--jQuery--////////////////

$(function () {

    window.wasScrolled = false;
    $(window).bind('scroll', function () {
        if (!window.wasScrolled) {
            $('html, body').animate({
                scrollTop: document.getElementsByClassName('section__about-us')[0].getBoundingClientRect().top
            }, 1000);
        }
        window.wasScrolled = true;
    });

    $('.hdr__container').hide();
    $(window).scroll(function () {
        if ($('.section__about-us').offset().top - $(window).scrollTop() < 10) $('.hdr__container').show(1000);
    });

    $('.rwd__li').click(function () {
        document.getElementById('toggle').checked = false;
    });

    $('#readMore, .hdr__about-us').click(function () {
        scrollSlide('.section__about-us');
    });
    $('.hdr__offer').click(function () {
        scrollSlide('.section__offer');
    });
    $('.hdr__contact').click(function () {
        scrollSlide('.section__contact');
    });
    $('.hdr__logo, .ftr .jump').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

    animation('.about-us__container', 'slide-in');
    animation('.offer__title', 'slide-in');
    for (var i = 1; i < 7; i++) {
        animation('.photo-' + i, 'slide-in');
    }

    windowScrollScope('.hdr__logo', '.section__about-us', 'footer', 'header__logo-1');
    windowScrollScope('header', '.section__about-us', 'footer', 'header__nav-1');

    windowScrollScope('.hdr__about-us', '.section__about-us', '.section__offer', 'hdr__border-bottom');
    windowScrollScope('.hdr__offer', '.section__offer', '.section__contact', 'hdr__border-bottom');
    windowScrollScope('.hdr__contact', '.section__contact', 'footer', 'hdr__border-bottom');
});

////////////////--pure JavaScript--////////////////

var loadingPage = document.getElementsByClassName('section__curtain')[0];

window.addEventListener('load', function () {
    loadingPage.classList.add('disappear');
    window.scrollTo(0, 0); // Go to top website
    setTimeout(function () {
        loadingPage.remove();
    }, 1200);
});

//////////////// function ////////////////

function scrollSlide(section) {
    $('html, body').animate({
        scrollTop: $(section).offset().top
    }, 1000);
}

function animation(element, animationsType) {
    var positionTop = $(element).offset().top;
    $(window).scroll(function () {
        if (positionTop - $(window).scrollTop() <= $(window).height() * .75) $(element).addClass(animationsType);
    });
}

function windowScrollScope(element, scopeStart, scopeEnd, classCss) {
    $(window).scroll(function () {
        if ($(window).scrollTop() >= $(scopeStart).offset().top - 50 && $(window).scrollTop() <= $(scopeEnd).offset().top - 50) $(element).addClass(classCss);else if ($(window).scrollTop() != 0) $(element).removeClass(classCss);else return;
    });
}