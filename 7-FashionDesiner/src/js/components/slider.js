const slider = (() => {

    class Slider {
        constructor(elemSelector, opts) {
            this.options = {
                pauseTime: opts || 0,
                generateDots: true,
            };
            this.sliderSelector = elemSelector;
            this.sliderCont = elemSelector.firstElementChild;
            this.slideCollection = elemSelector.firstElementChild.children;
            this.currentSlide = 0;
            this.time = null;
            this.prev = null;
            this.next = null;
            this.slides = [];
            this.dots = [];
            this.setMargin()
            this.addSlides(this.slideCollection);
            this.createPrevNext();
            this.createDots();
            this.changeToMargin(this.currentSlide);
            this.touchMoveSlide();
            this.eventKeyboardArrows();
        }
        setMargin() {
            this.sliderCont.style.marginLeft = 0;
        }
        eventKeyboardArrows() {
            window.addEventListener('keydown', (event) => {
                if (event.keyCode === 37) {
                    this.slidePrev();
                } else if (event.keyCode === 39) {
                    this.slideNext();
                } else {
                    return;
                }
            });
        }
        touchMoveSlide() {
            let shortTouch;
            let startX;
            let endX;
            let shiftX;
            let firstMargin;

            this.sliderCont.addEventListener('touchstart', (event) => {
                let flick = 500;
                shortTouch = true;
                setTimeout(function () {
                    shortTouch = false;
                }, flick);
                startX = event.targetTouches[0].clientX;
                firstMargin = parseInt(this.sliderCont.style.marginLeft);
            });
            this.sliderCont.addEventListener('touchmove', (event) => {
                endX = event.targetTouches[0].clientX;
                shiftX = ((endX - startX) / window.innerWidth) * 100;
                this.sliderCont.style.marginLeft = `${firstMargin + shiftX}%`;
            });
            this.sliderCont.addEventListener('touchend', (event) => {
                if (shortTouch && this.distanceSwiped(shiftX, 20)) {
                    this.changeToIndex(firstMargin + this.distanceSwiped(shiftX));
                } else {
                    this.changeToIndex(firstMargin);
                };
            });
        }
        distanceSwiped(shiftX, jump = 0) {
            if (Math.abs(shiftX) < jump) {
                return 0;
            } else if (shiftX < -jump) {
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
            this.sliderCont.style.marginLeft = `${index * -100}%`;

            this.dots.forEach(dot => {
                dot.classList.remove('slider-dots-element-active');
            });
            if (!(this.options.generateDots)) {
                this.dots.forEach((dot) => {
                    dot.classList.add('slider-dots-element-hidden');
                });
            }
            this.dots[index].classList.add('slider-dots-element-active');

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
            this.prev.type = 'button';
            this.prev.innerText = 'Poprzedni slide';
            this.prev.classList.add('slider-button');
            this.prev.classList.add('slider-button-prev');
            this.prev.setAttribute('title', 'Poprzedni slide');
            this.prev.addEventListener('click', this.slidePrev.bind(this));

            this.next = document.createElement('button');
            this.next.type = 'button';
            this.next.innerText = 'Następny slide';
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

            for (let i = 0; i < this.slides.length; i++) {
                const li = document.createElement('li');
                li.classList.add('slider-dots-element');

                const btn = document.createElement('button');
                btn.classList.add('slider-dots-button');
                btn.type = 'button';
                btn.innerText = i + 1;
                btn.setAttribute('aria-label', 'Set slide ' + (i + 1));

                btn.addEventListener('click', () => this.changeToMargin(i));

                li.appendChild(btn);

                ulDots.appendChild(li);
                this.dots.push(li);
            }
            idSlider.appendChild(ulDots);
        }
    }

    const slideElement = document.getElementsByClassName('slider__element')
    const idSlider = document.getElementById('slider')
    const sliderOne = new Slider(idSlider, 3000)
})();

export default slider;