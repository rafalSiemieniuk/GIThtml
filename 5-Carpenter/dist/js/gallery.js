'use strict';

//nazwe zdjecia wpisujemy z rozszerzeniem po enterach

var schody = '\nschody1.jpg\nschody2.jpg\nschody3.jpg\nschody4.jpg\nschody5.jpg\nschody6.jpg\nschody7.jpg\nschody8.jpg\n';

var meble = '\nmeble1.jpg\nmeble2.jpg\nmeble3.jpg\nmeble4.jpg\nmeble5.jpg\nmeble6.jpg\nmeble7.jpg\nmeble8.jpg\n';

var stoly = '\nstol1.jpg\nstol2.jpg\n';

var drzwi = '\ndrzwi1.jpg\ndrzwi2.jpg\ndrzwi3.jpg\ndrzwi4.jpg\ndrzwi5.jpg\ndrzwi6.jpg\n';
var szalowka = '\nszalowka1.jpg\nszalowka2.jpg\nszalowka3.jpg\nszalowka4.jpg\n';

var pozostale = '\npozostale1.jpg\npozostale2.jpg\n';

//
//
//
////////////////--JavaScript--////////////////
//                    ||
//                    ||
//                    \/


var stairs = schody.split('\n').filter(function (element) {
    return element !== '';
});
var furnitures = meble.split('\n').filter(function (element) {
    return element !== '';
});
var tables = stoly.split('\n').filter(function (element) {
    return element !== '';
});
var doors = drzwi.split('\n').filter(function (element) {
    return element !== '';
});
var boards = szalowka.split('\n').filter(function (element) {
    return element !== '';
});
var others = pozostale.split('\n').filter(function (element) {
    return element !== '';
});

var allPictures = [stairs, furnitures, tables, doors, boards, others];
var row = document.querySelectorAll('.gallery .row');
var template = '<div class="col-12 col-sm-6 col-md-4 col-xl-3">\n                    <div class="gallery__photo">\n                    </div>\n                  </div>';

////////////////--jQuery--////////////////

(function ($) {

    //create pictures
    allPictures.forEach(function (eSection, iSection) {
        eSection.forEach(function (e, i) {
            var picture = document.createElement('img');
            picture.setAttribute('src', 'gallery/' + e.trim());
            row[iSection].innerHTML += template;
            var div = document.getElementsByClassName('gallery__photo');
            div[div.length - 1].appendChild(picture);
        });
    });

    var $checkBox = document.getElementById('toggle');

    $('.rwd__li').click(function () {
        $checkBox.checked = false;
    });
    $(window).scroll(function () {
        $checkBox.checked = false;
    });

    scrollSlideAnimation('.hdr__stairs', '#stairs');
    scrollSlideAnimation('.hdr__furniture', '#furniture');
    scrollSlideAnimation('.hdr__tables', '#tables');
    scrollSlideAnimation('.hdr__doors', '#doors');
    scrollSlideAnimation('.hdr__boards', '#boards');
    scrollSlideAnimation('.hdr__others', '#others');

    $('#test, .ftr .jump').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });

    windowScrollScope('.hdr__stairs a', '#stairs', '#furniture', 'hdr__border-bottom');
    windowScrollScope('.hdr__furniture a', '#furniture', '#tables', 'hdr__border-bottom');
    windowScrollScope('.hdr__tables a', '#tables', '#doors', 'hdr__border-bottom');
    windowScrollScope('.hdr__doors a', '#doors', '#boards', 'hdr__border-bottom');
    windowScrollScope('.hdr__boards a', '#boards', '#others', 'hdr__border-bottom');
    windowScrollScope('.hdr__others a', '#others', '#footer', 'hdr__border-bottom');

    if ($(window).width() > 1200) {
        $('header').addClass('header__gallery');
        $('nav p').css('opacity', '1');
    }

    $('img').each(function (index) {
        var _this = this;

        $(this).click(function () {
            var img = $(_this);
            img.toggleClass('slide-out');
            setTimeout(function () {
                $('#description').toggleClass('backdrop');
                img.toggleClass('bigImg');
            }, 500);
        });
    });
})(jQuery);

////////////////--JavaScript--////////////////

var loadingPage = document.getElementsByClassName('section__curtain')[0];

window.addEventListener('load', function () {
    loadingPage.classList.add('disappear');
    setTimeout(function () {
        loadingPage.remove();
    }, 1200);
});

//////////////// function ////////////////

function scrollSlideAnimation(button, section) {
    $(button).click(function (e) {
        e.stopPropagation();
        $('html, body').animate({
            scrollTop: $(section).offset().top + 1
        }, 1000);
    });
}

function windowScrollScope(element, scopeStart, scopeEnd, classCss) {
    $(window).scroll(function () {
        if ($(window).scrollTop() >= $(scopeStart).offset().top && $(window).scrollTop() <= $(scopeEnd).offset().top) {
            $(element).addClass(classCss);
        } else {
            $(element).removeClass(classCss);
        }
    });
}