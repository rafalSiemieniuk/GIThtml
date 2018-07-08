// const throttle = require('lodash.throttle');
const slider = (() => {

    class Slider {
        constructor(elemSelector, opts) {
            this.options = {
                pauseTime: opts || 0,
                generateDots: true,
                firstPositionMargin: elemSelector.firstElementChild.style.setProperty('--margin', 0)
            };
            this.sliderSelector = elemSelector;
            this.sliderCont = elemSelector.firstElementChild;
            this.slideCollection = elemSelector.firstElementChild.children;
            this.currentSlide = 0;
            this.time = null; //tutaj będziemy podczepiać setTimeout
            this.prev = null; //przycisk prev
            this.next = null; //przucisl next
            this.slides = [];
            this.dots = [];
            this.addSlides(this.slideCollection);
            this.createPrevNext();
            this.createDots();
            this.changeToMargin(this.currentSlide);
            this.touchAndMoveMouseEvents('mousedown', 'mousemove', 'mouseup', 'event.clientX');
            this.touchAndMoveMouseEvents('touchstart', 'touchmove', 'touchend', 'event.targetTouches[0].clientX');
        }
        touchAndMoveMouseEvents(start, move, end, targetClientX) {
            
            const _this = this
            // this.sliderCont.onmousedown = function (event) {
            this.sliderCont.addEventListener(start, (event) => {
                let sliderContStyle = _this.sliderCont.style
                let firstPositionX = eval(targetClientX);
                let shiftX = 0;
                let margin = parseFloat(_this.sliderCont.style.getPropertyValue('--margin'));

                function onMouseMove(event) {
                    shiftX = (eval(targetClientX) - firstPositionX) / window.innerWidth * 100;
                    sliderContStyle.setProperty('--margin', margin + shiftX);
                }

                // move the slide on mousemove or touchmove
                document.addEventListener(move, onMouseMove);

                // drop the slide, remove unneeded handlers
                _this.sliderCont.addEventListener(end, () => {
                    console.log('test123')
                    document.removeEventListener(move, onMouseMove);
                    margin += _this.roundMargin(shiftX);
                    _this.changeToIndex(margin);
                });
                // remove unneeded handlers for right mouse button
                _this.sliderCont.addEventListener('mousedown', function (e) {
                    if (e.button === 2) {
                        document.removeEventListener('mousemove', onMouseMove);
                    }
                });
                _this.sliderCont.removeEventListener('mousedown', this);
            });
            this.sliderCont.ondragstart = function () {
                return false;
            };
        }
        roundMargin(shiftX) {
            if (Math.abs(shiftX) < 50) {
                return 0;
            } else if (shiftX < -50) {
                return -100;
            } else {
                return 100;
            }
        }
        changeToIndex(margin) {
            this.slideCollection = margin / -100;
            if (this.slideCollection < 0) {
                this.slideCollection = this.slides.length - 1;
            } else if (this.slideCollection === this.slides.length) {
                this.slideCollection = 0;
            } else {
                return this.changeToMargin(this.slideCollection);
            }
            return this.changeToMargin(this.slideCollection);
        }
        changeToMargin(index) {
            // this.sliderCont.style.setProperty('--margin', index * -100)
            // for(var i = 0; i < 101; i++){
            //     ( (i) => {
            //         setTimeout( () => {
            //             this.sliderCont.style.setProperty('--margin', index * -i)
            //         }, 5 * (i + 1));
            //     })(i);
            // }
            jQuery(document).ready(function($) {
                $(".slider__cont").animate({marginLeft: index * -100 + "%"});
            });


            //robimy pętlę po tablicy kropek usuwając klasę active
            this.dots.forEach(dot => {
                dot.classList.remove('slider-dots-element-active');
            });
            this.dots[index].classList.add('slider-dots-element-active');

            //aktualny slide przestawiamy na wybrany
            this.currentSlide = index;

            if (this.options.pauseTime !== 0) {
                clearInterval(this.time);
                this.time = setTimeout(() => this.slideNext(), this.options.pauseTime)
            }
        }
        addSlides(slideCollection) {
            [].forEach.call(slideCollection, (e) => {
                this.slides.push(e)
            })
        }
        slidePrev() {
            this.currentSlide--;
            if (this.currentSlide < 0) {
                this.currentSlide = this.slides.length - 1;
            }
            this.changeToMargin(this.currentSlide);
        }

        slideNext() {
            this.currentSlide++;
            if (this.currentSlide > this.slides.length - 1) {
                this.currentSlide = 0;
            }
            this.changeToMargin(this.currentSlide);
        }
        createPrevNext() {
            this.prev = document.createElement('button');
            this.prev.type = "button";
            this.prev.innerText = "Poprzedni slide";
            this.prev.classList.add('slider-button');
            this.prev.classList.add('slider-button-prev');
            this.prev.setAttribute('title', 'Poprzedni slide');
            this.prev.addEventListener('click', this.slidePrev.bind(this));

            this.next = document.createElement('button');
            this.next.type = "button";
            this.next.innerText = "Następny slide";
            this.next.classList.add('slider-button');
            this.next.classList.add('slider-button-next');
            this.next.setAttribute('title', 'Następny slide');
            this.next.addEventListener('click', this.slideNext.bind(this));

            const nav = document.createElement('div');
            nav.classList.add('slider-nav');
            nav.setAttribute('aria-label', 'Slider prev next');
            nav.appendChild(this.prev);
            nav.appendChild(this.next);
            this.sliderSelector.appendChild(nav);
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

                btn.addEventListener('click', () => this.changeToMargin(i));

                li.appendChild(btn);

                ulDots.appendChild(li);
                this.dots.push(li);
            }

            idSlider.appendChild(ulDots);
            console.log(this.dots);
            console.log(this);
        }
    }

    const slideElement = document.getElementsByClassName('slider__element')
    const idSlider = document.getElementById('slider')
    console.log(idSlider.firstElementChild.children);
    const sliderOne = new Slider(idSlider, 0)

    /*
        const slider = {
            //sliderSelector: elemSelector,
            currentSlide: 0, //aktualny slide
            time: null, //tutaj będziemy podczepiać setTimeout
            slides: [],

            defaultOpts: {
                pauseTime: 0,
                generateDots: true
            },

            addSlide: function (element) {
                [].forEach.call(element, (e) => {
                    this.slides.push(e)
                })
            },

            slidePrev: function () {
                this.currentSlide--;
                if (this.currentSlide < 0) {
                    this.currentSlide = this.slides.length - 1;
                }
                this.changeSlide(this.currentSlide);
            },

            slideNext: function () {
                this.currentSlide++;
                if (this.currentSlide > this.slides.length - 1) {
                    this.currentSlide = 0;
                }
                this.changeSlide(this.currentSlide);
            },

            detectMargin: function (element) {
                console.log("elem.style.marginLeft=" + element.style.marginLeft);
            },

            createDots: function () {
                const ulDots = document.createElement('ul');
                ulDots.classList.add('slider-dots');
                ulDots.setAttribute('aria-label', 'Slider pagination');
                console.log(this.slides.length);
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

                    // btn.addEventListener('click', function () {
                    //     this.changeSlide(i);
                    // }.bind(this));

                    li.appendChild(btn);

                    ulDots.appendChild(li);
                    // this.dots.push(li);
                }

                idSlider.appendChild(ulDots);
            }
        }
        const slideElement = document.getElementsByClassName('slider__element')
        const idSlider = document.getElementById('slider')
    */

    // slider.detectMargin(idSlider.firstChild);
    // console.log(idSlider);
    // console.log(idSlider.firstElementChild);
    // console.log(idSlider.firstChild);
    // idSlider.style.marginLeft = 400 + "px";
    // idSlider.firstElementChild.style.marginLeft = 25 + "%";
    // console.log(idSlider.style.marginLeft)
    // console.log(idSlider.firstElementChild.style.marginLeft)
    // console.log(idSlider.firstElementChild.style.getPropertyValue('--margin'));
    // idSlider.firstElementChild.style.setProperty("--margin", 33);
    // console.log(idSlider.firstElementChild.style.getPropertyValue('--margin'));
    // idSlider.firstElementChild.style.setProperty("--margin", 10);
    // console.log(idSlider.firstElementChild.style.getPropertyValue('--margin'));
    // console.log(idSlider.firstElementChild.style.getPropertyValue('margin-left'));
    // console.log(sliderOne.margin);


})();

export default slider;



/*

if (navigator.msMaxTouchPoints) {
    
      $('#slider').addClass('ms-touch');
    
      $('#slider').on('scroll', function() {
        $('.slide-image').css('transform','translate3d(-' + (100-$(this).scrollLeft()/6) + 'px,0,0)');
      });
    
    } else {
    
      var slider = {
    
        el: {
          slider: $("#slider"),
          holder: $(".holder"),
          imgSlide: $(".slide-image")
        },
    
        slideWidth: $('#slider').width(),
        touchstartx: undefined,
        touchmovex: undefined,
        movex: undefined,
        index: 0,
        longTouch: undefined,
        
        init: function() {
          this.bindUIEvents();
        },
    
        bindUIEvents: function() {
    
          this.el.holder.on("touchstart", function(event) {
            slider.start(event);
          });
    
          this.el.holder.on("touchmove", function(event) {
            slider.move(event);
          });
    
          this.el.holder.on("touchend", function(event) {
            slider.end(event);
          });
    
        },
    
        start: function(event) {
          // Test for flick.
          this.longTouch = false;
          setTimeout(function() {
            window.slider.longTouch = true;
          }, 250);
    
          // Get the original touch position.
          this.touchstartx =  event.originalEvent.touches[0].pageX;
    
          // The movement gets all janky if there's a transition on the elements.
          $('.animate').removeClass('animate');
        },
    
        move: function(event) {
          // Continuously return touch position.
          this.touchmovex =  event.originalEvent.touches[0].pageX;
          // Calculate distance to translate holder.
          this.movex = this.index*this.slideWidth + (this.touchstartx - this.touchmovex);
          // Defines the speed the images should move at.
          var panx = 100-this.movex/6;
          if (this.movex < 600) { // Makes the holder stop moving when there is no more content.
            this.el.holder.css('transform','translate3d(-' + this.movex + 'px,0,0)');
          }
          if (panx < 100) { // Corrects an edge-case problem where the background image moves without the container moving.
            this.el.imgSlide.css('transform','translate3d(-' + panx + 'px,0,0)');
          }
        },
    
        end: function(event) {
          // Calculate the distance swiped.
          var absMove = Math.abs(this.index*this.slideWidth - this.movex);
          // Calculate the index. All other calculations are based on the index.
          if (absMove > this.slideWidth/2 || this.longTouch === false) {
            if (this.movex > this.index*this.slideWidth && this.index < 2) {
              this.index++;
            } else if (this.movex < this.index*this.slideWidth && this.index > 0) {
              this.index--;
            }
          }      
          // Move and animate the elements.
          this.el.holder.addClass('animate').css('transform', 'translate3d(-' + this.index*this.slideWidth + 'px,0,0)');
          this.el.imgSlide.addClass('animate').css('transform', 'translate3d(-' + 100-this.index*50 + 'px,0,0)');
    
        }
    
      };
    
      slider.init();
    }
    */