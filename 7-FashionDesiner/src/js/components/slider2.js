// const throttle = require('lodash.throttle');
const slider = (() => {

    class Slider {
        constructor(elemSelector, opts) {
            const defaultOpts = {
                pauseTime: 0,
                prevText: "Poprzedni slide",
                nextText: "Następny slide",
                generateDots: true,
                generatePrevNext: true
            };
            this.options = Object.assign({}, defaultOpts, opts);
            this.sliderSelector = elemSelector;
            this.currentSlide = 0; //aktualny slide
            this.time = null; //tutaj będziemy podczepiać setTimeout
            this.slider = null;
            this.elem = null;
            this.slides = null;

            this.prev = null; //przycisk prev
            this.next = null; //przucisl next
            this.dots = [];

            this.generateSlider();
            this.changeSlide(this.currentSlide);
        }
        generateSlider() {
            //pobieramy element który zamienimy na slider
            this.slider = document.querySelector(this.sliderSelector);
            this.slider.classList.add('slider');

            //tworzymy kontener dla slajdow
            const slidesCnt = document.createElement('div');
            slidesCnt.classList.add('slider-slides-cnt');

            //pobieramy element slajdów
            this.slides = this.slider.children;

            //to jest żywa kolekcja, więc przy przeniesieniu kazdego slajda
            //jej długość maleje
            while (this.slides.length) {
                this.slides[0].classList.add('slider-slide');
                slidesCnt.appendChild(this.slides[0]);
            }
            this.slides = slidesCnt.children;
            this.slider.appendChild(slidesCnt);

            if (this.options.generatePrevNext) this.createPrevNext();
            if (this.options.generateDots) this.createDots();
        }
        slidePrev() {
            this.currentSlide--;
            if (this.currentSlide < 0) {
                this.currentSlide = this.slides.length - 1;
            }
            this.changeSlide(this.currentSlide);
        }

        slideNext() {
            this.currentSlide++;
            if (this.currentSlide > this.slides.length - 1) {
                this.currentSlide = 0;
            }
            this.changeSlide(this.currentSlide);
        }

        changeSlide(index) {
            //robimy pętlę po slajdach usuwając klasę active
            [...this.slides].forEach(function (slide) {
                slide.classList.remove('slider-slide-active');
                slide.setAttribute('aria-hidden', true);
            });

            //dodajemy ją tylko wybranemu
            this.slides[index].classList.add('slider-slide-active');
            this.slides[index].setAttribute('aria-hidden', false);

            //podobny manewr robimy dla kropek
            if (this.options.generateDots) {
                this.dots.forEach(function (dot) {
                    dot.classList.remove('slider-dots-element-active');
                });
                this.dots[index].classList.add('slider-dots-element-active');
            }

            //aktualny slide przestawiamy na wybrany
            this.currentSlide = index;

            if (this.options.pauseTime !== 0) {
                clearInterval(this.time);
                this.time = setTimeout(function () {
                    this.slideNext();
                }.bind(this), this.options.pauseTime)
            }
        }

        createPrevNext() {
            this.prev = document.createElement('button');
            this.prev.type = "button";
            this.prev.innerText = this.options.prevText;
            this.prev.classList.add('slider-button');
            this.prev.classList.add('slider-button-prev');
            this.prev.addEventListener('click', this.slidePrev.bind(this));

            this.next = document.createElement('button');
            this.next.type = "button";
            this.next.innerText = this.options.nextText;
            this.next.classList.add('slider-button');
            this.next.classList.add('slider-button-next');
            this.next.addEventListener('click', this.slideNext.bind(this));

            const nav = document.createElement('div');
            nav.classList.add('slider-nav');
            nav.setAttribute('aria-label', 'Slider prev next');
            nav.appendChild(this.prev);
            nav.appendChild(this.next);
            this.slider.appendChild(nav);
        }

        createDots() {
            const ulDots = document.createElement('ul');
            ulDots.classList.add('slider-dots');
            ulDots.setAttribute('aria-label', 'Slider pagination');

            //tworzymy pętlę w ilości liczby slajów
            for (let i = 0; i < this.slides.length; i++) {
                //każdorazowo tworzymy LI wraz z buttonem
                //każdy button po kliknięciu zmieni slajd
                //za pomocą metody changeSlide()

                const li = document.createElement('li');
                li.classList.add('slider-dots-element');

                const btn = document.createElement('button');
                btn.classList.add('slider-dots-button');
                btn.type = "button";
                btn.innerText = i + 1;
                btn.setAttribute('aria-label', 'Set slide ' + (i + 1));

                btn.addEventListener('click', function () {
                    this.changeSlide(i);
                }.bind(this));

                li.appendChild(btn);

                ulDots.appendChild(li);
                this.dots.push(li);
            }

            this.slider.appendChild(ulDots);
        }
    }
    const slider1 = document.getElementById('slider1');
    console.log(slider1);
    const sliderOne = new Slider('#slider1', 5);
})();

export default slider;

ball.onmousedown = function (event) {

    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;

    ball.style.position = 'absolute';
    ball.style.zIndex = 1000;
    document.body.append(ball);

    moveAt(event.pageX, event.pageY);

    // centers the ball at (pageX, pageY) coordinates
    function moveAt(pageX, pageY) {
        ball.style.left = pageX - shiftX + 'px';
        ball.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // (3) move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // (4) drop the ball, remove unneeded handlers
    ball.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        ball.onmouseup = null;
    };

};

ball.ondragstart = function () {
    return false;
};



(function () // Code in a function to create an isolate scope
    {
        var speed = 600;
        var moving_frequency = 15; // Affects performance !
        var links = document.getElementsByTagName('a');
        var href;
        for (var i = 0; i < links.length; i++) {
            href = (links[i].attributes.href === undefined) ? null : links[i].attributes.href.nodeValue.toString();
            if (href !== null && href.length > 1 && href.substr(0, 1) == '#') {
                links[i].onclick = function () {
                    var element;
                    var href = this.attributes.href.nodeValue.toString();
                    if (element = document.getElementById(href.substr(1))) {
                        var hop_count = speed / moving_frequency
                        var getScrollTopDocumentAtBegin = getScrollTopDocument();
                        var gap = (getScrollTopElement(element) - getScrollTopDocumentAtBegin) / hop_count;

                        for (var i = 1; i <= hop_count; i++) {
                            (function () {
                                var hop_top_position = gap * i;
                                setTimeout(function () {
                                    window.scrollTo(0, hop_top_position + getScrollTopDocumentAtBegin);
                                }, moving_frequency * i);
                            })();
                        }
                    }

                    return false;
                };
            }
        }

        var getScrollTopElement = function (e) {
            var top = -100;

            while (e.offsetParent != undefined && e.offsetParent != null) {
                top += e.offsetTop + (e.clientTop != null ? e.clientTop : 0);
                e = e.offsetParent;
            }

            return top;
        };

        var getScrollTopDocument = function () {
            return document.documentElement.scrollTop + document.body.scrollTop;
        };
    })();

/////////

$(document).ready(function () {
    $('div').mouseenter(function () {
        $(this).css("margin-left", 200);
    });
    $('div').mouseleave(function () {
        $(this).css("margin-left", 0);
    });
});

$(document).ready(function () {
    $('div').mouseenter(function () {
        $('.slider__cont').animate({
            'margin-left': '200'
        }, 'slow');
    });
    $('div').mouseleave(function () {
        $(this).animate({
            'margin-left': '0'
        }, 'slow');
    });
});

for(var i = 0; i < 5; i++){
    ( (i) => {
        setTimeout( () => {
            this.sliderCont.style.setProperty('--margin', index * -100)
        }, 50 * (i + 1));
    })(i);
}


jQuery(document).ready(function($) {
    $(".slider__cont").animate({height: "100px"});
});