'use strict';

//Nazwy zdjęć wpisuj z rozszerzeniem po spacji. Grupę zdjęć z jednej kategorii umieszczaj w cudzysłowie.
// np: var schody = 'schody1.jpg schody2.jpg';

var schody = 'schody1.jpg schody2.jpg schody3.jpg schody4.jpg schody5.jpg schody6.jpg schody7.jpg schody8.jpg schody9.jpg schody10.jpg schody11.jpg schody12.jpg';

var meble = 'meble1.jpg meble2.jpg meble3.jpg meble4.jpg meble5.jpg meble6.jpg meble7.jpg meble8.jpg meble9.jpg meble10.jpg meble11.jpg meble12.jpg meble13.jpg meble14.jpg meble15.jpg meble16.jpg meble17.jpg meble18.jpg meble19.jpg meble20.jpg';

var stoly = 'stol1.jpg stol2.jpg';

var drzwi = 'drzwi1.jpg drzwi2.jpg drzwi3.jpg drzwi4.jpg drzwi5.jpg drzwi6.jpg drzwi7.jpg drzwi8.jpg drzwi9.jpg drzwi10.jpg';

var szalowka = 'szalowka1.jpg szalowka2.jpg szalowka3.jpg szalowka4.jpg szalowka5.jpg szalowka6.jpg szalowka7.jpg';

var pozostale = 'pozostale1.jpg pozostale2.jpg pozostale3.jpg pozostale4.jpg pozostale5.jpg pozostale6.jpg pozostale7.jpg pozostale8.jpg pozostale9.jpg pozostale10.jpg pozostale11.jpg pozostale12.jpg';

//
//
//
////////////////--JavaScript--////////////////
//                    ||
//                    ||
//                    \/

var separator = ' ';
var stairs = schody.split(separator).filter(function (element) {
    return element !== '';
});
var furnitures = meble.split(separator).filter(function (element) {
    return element !== '';
});
var tables = stoly.split(separator).filter(function (element) {
    return element !== '';
});
var doors = drzwi.split(separator).filter(function (element) {
    return element !== '';
});
var boards = szalowka.split(separator).filter(function (element) {
    return element !== '';
});
var others = pozostale.split(separator).filter(function (element) {
    return element !== '';
});

var allPictures = [stairs, furnitures, tables, doors, boards, others];
var row = document.querySelectorAll('.gallery .row');
var template = '<div class="col-12 col-sm-6 col-md-4 col-xl-3">\n                    <div class="gallery__photo">\n                    </div>\n                  </div>';
console.log(allPictures);
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