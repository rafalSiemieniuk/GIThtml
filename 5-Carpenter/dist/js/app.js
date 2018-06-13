'use strict';

////////////////--jQuery--////////////////

(function ($) {

    var $checkBox = document.getElementById('toggle');

    $('.rwd__li').click(function () {
        $checkBox.checked = false;
    });
    $(window).scroll(function () {
        $checkBox.checked = false;
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

    windowScrollScope('.hdr__about-us', '.section__about-us', '.section__offer', 'hdr__border-bottom');
    windowScrollScope('.hdr__offer', '.section__offer', '.section__contact', 'hdr__border-bottom');
    windowScrollScope('.hdr__contact', '.section__contact', 'footer', 'hdr__border-bottom');

    if ($(window).width() > 1200) {

        windowScrollScope('.hdr__logo', '.section__about-us', 'footer', 'header__logo-1');
        windowScrollScope('header', '.section__about-us', 'footer', 'header__nav-1');

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
            if ($('.section__about-us').offset().top - $(window).scrollTop() < 10) $('.hdr__container').show(400);
        });

        animation('.about-us__container');
        animation('.offer__btn');
        for (var i = 1; i < 7; i++) {
            animation('.photo-' + i);
        }

        ////--Slide In (as you scroll down) Boxes--////

        /**
         * Copyright 2012, Digital Fusion
         * Licensed under the MIT license.
         * http://teamdf.com/jquery-plugins/license/
         *
         * @author Sam Sehnert
         * @desc A small plugin that checks whether elements are within
         *     the user visible viewport of a web browser.
         *     only accounts for vertical position, not horizontal.
         */

        $.fn.visible = function (partial) {
            var $t = $(this),
                $w = $(window),
                viewTop = $w.scrollTop(),
                viewBottom = viewTop + $w.height(),
                _top = $t.offset().top,
                _bottom = _top + $t.height(),
                compareTop = partial === true ? _bottom : _top,
                compareBottom = partial === true ? _top : _bottom;
            return compareBottom <= viewBottom && compareTop >= viewTop;
        };

        var win = $(window);
        var allMods = $('.module');

        allMods.each(function (i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass('already-visible');
            }
        });

        win.scroll(function (event) {
            allMods.each(function (i, el) {
                var el = $(el);
                if (el.visible(true)) {
                    el.addClass('come-in');
                }
            });
        });
        ////--End Slide In (as you scroll down) Boxes--////
    }
})(jQuery);

////////////////--JavaScript--////////////////

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

function animation(element) {
    var positionTop = $(element).offset().top;
    $(element).addClass('hidden');
    $(window).scroll(function () {
        if (positionTop - $(window).scrollTop() <= $(window).height() * .8) $(element).addClass('slide-in');
    });
}

function windowScrollScope(element, scopeStart, scopeEnd, classCss) {
    $(window).scroll(function () {
        if ($(window).scrollTop() >= $(scopeStart).offset().top - 50 && $(window).scrollTop() <= $(scopeEnd).offset().top - 50) $(element).addClass(classCss);else if ($(window).scrollTop() != 0) $(element).removeClass(classCss);else return;
    });
}