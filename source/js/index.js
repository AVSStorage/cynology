const buttons = document.querySelectorAll('.main-nav__toggle');
const menu = document.querySelector('.main-nav__wrapper');
const trigger = document.querySelector('.main-nav');
for (i=0;i<buttons.length;i++){
    buttons[i].addEventListener('click', (evt) => {
        if (trigger.classList.contains('main-nav--open')) {
            trigger.classList.remove('main-nav--open');
            trigger.classList.add('main-nav--close');
        } else {
            trigger.classList.remove('main-nav--close');
            trigger.classList.add('main-nav--open');
        }

    });
}
