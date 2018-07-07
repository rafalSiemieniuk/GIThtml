const throttle = require('lodash.throttle');
const Menu = (()=> {

    const Selectors = {
        MENU: '.js-menu'
    };

    const ClassNames = {
        FIXED_MENU: 'header__bottom--fixed'
    }

    class Menu {
        constructor(element) {
            this.element = element;
            this.offset = element.offsetTop;
            this.addEvents();
        }

        scrollHandler() {
            if (window.pageYOffset >= this.offset) {
                this.element.classList.add(ClassNames.FIXED_MENU);
            } else {
                this.element.classList.remove(ClassNames.FIXED_MENU);
            }            
        }

        addEvents() {
            window.addEventListener('scroll', throttle(this.scrollHandler.bind(this), 50));
        }
    }

    return new Menu(document.querySelector(Selectors.MENU));
})();

export default Menu;