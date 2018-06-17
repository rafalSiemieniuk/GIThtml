//nazwe zdjecia wpisujemy z rozszerzeniem po enterach

let schody = `
schody1.jpg
schody2.jpg
schody3.jpg
schody4.jpg
schody5.jpg
schody6.jpg
schody7.jpg
schody8.jpg
schody9.jpg
schody10.jpg
schody11.jpg
schody12.jpg
`;

let meble = `
meble1.jpg
meble2.jpg
meble3.jpg
meble4.jpg
meble5.jpg
meble6.jpg
meble7.jpg
meble8.jpg
meble9.jpg
meble10.jpg
meble11.jpg
meble12.jpg
meble13.jpg
meble14.jpg
meble15.jpg
meble16.jpg
meble17.jpg
meble18.jpg
meble19.jpg
meble20.jpg
`;

let stoly = `
stol1.jpg
stol2.jpg
`;

let drzwi = `
drzwi1.jpg
drzwi2.jpg
drzwi3.jpg
drzwi4.jpg
drzwi5.jpg
drzwi6.jpg
drzwi7.jpg
drzwi8.jpg
drzwi9.jpg
drzwi10.jpg
`;
let szalowka = `
szalowka1.jpg
szalowka2.jpg
szalowka3.jpg
szalowka4.jpg
szalowka5.jpg
szalowka6.jpg
szalowka7.jpg
`;

let pozostale = `
pozostale1.jpg
pozostale2.jpg
pozostale3.jpg
pozostale4.jpg
pozostale5.jpg
pozostale6.jpg
pozostale7.jpg
pozostale8.jpg
pozostale9.jpg
pozostale10.jpg
pozostale11.jpg
pozostale12.jpg
`;


//
//
//
////////////////--JavaScript--////////////////
//                    ||
//                    ||
//                    \/


const stairs = schody.split('\n').filter(element => element !== '');
const furnitures = meble.split('\n').filter(element => element !== '');
const tables = stoly.split('\n').filter(element => element !== '');
const doors = drzwi.split('\n').filter(element => element !== '');
const boards = szalowka.split('\n').filter(element => element !== '');
const others = pozostale.split('\n').filter(element => element !== '');

const allPictures = [stairs, furnitures, tables, doors, boards, others];
let row = document.querySelectorAll('.gallery .row');
const template = `<div class="col-12 col-sm-6 col-md-4 col-xl-3">
                    <div class="gallery__photo">
                    </div>
                  </div>`;

////////////////--jQuery--////////////////

(function ($) {

    //create pictures
    allPictures.forEach((eSection, iSection) => {
        eSection.forEach((e, i) => {
            let picture = document.createElement('img');
            picture.setAttribute('src', 'gallery/' + e.trim());
            row[iSection].innerHTML += template;
            let div = document.getElementsByClassName('gallery__photo');
            div[div.length - 1].appendChild(picture);
        });
    });

    let $checkBox = document.getElementById('toggle');

    $('.rwd__li').click(() => {
        $checkBox.checked = false;
    });
    $(window).scroll(() => {
        $checkBox.checked = false;
    });

    scrollSlideAnimation('.hdr__stairs', '#stairs');
    scrollSlideAnimation('.hdr__furniture', '#furniture');
    scrollSlideAnimation('.hdr__tables', '#tables');
    scrollSlideAnimation('.hdr__doors', '#doors');
    scrollSlideAnimation('.hdr__boards', '#boards');
    scrollSlideAnimation('.hdr__others', '#others');

    $('#test, .ftr .jump').click(() => {
        $('html, body').animate({
            scrollTop: 0
        }, 1000)
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
        $(this).click(() => {
            let img = $(this);
            img.toggleClass('slide-out');
            setTimeout(function () {
                $('#description').toggleClass('backdrop');
                img.toggleClass('bigImg');
            }, 500)
        });
    });

})(jQuery);



////////////////--JavaScript--////////////////

const loadingPage = document.getElementsByClassName('section__curtain')[0];

window.addEventListener('load', () => {
    loadingPage.classList.add('disappear');
    setTimeout(() => {
        loadingPage.remove();
    }, 1200);
});

//////////////// function ////////////////

function scrollSlideAnimation(button, section) {
    $(button).click((e) => {
        e.stopPropagation();
        $('html, body').animate({
            scrollTop: $(section).offset().top + 1
        }, 1000)
    });
}

function windowScrollScope(element, scopeStart, scopeEnd, classCss) {
    $(window).scroll(() => {
        if ($(window).scrollTop() >= $(scopeStart).offset().top &&
            $(window).scrollTop() <= $(scopeEnd).offset().top) {
            $(element).addClass(classCss);
        } else {
            $(element).removeClass(classCss);
        }
    });
}