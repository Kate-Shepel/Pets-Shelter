window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.navigation_list');
    const menuItem = document.querySelectorAll('.nav-item');
    const hamburger = document.querySelector('.hamburger');
    const wrapper = document.querySelector('.wrapper');
    const logoTitle = document.querySelector('.logo_title')
    const body = document.querySelector('body');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
        wrapper.classList.toggle('wrapper_active');
        logoTitle.classList.toggle('logo_title_active');
        body.classList.toggle('body_no_scroll');
    });

    wrapper.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
        wrapper.classList.toggle('wrapper_active');
        logoTitle.classList.toggle('logo_title_active');
        body.classList.toggle('body_no_scroll');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
            wrapper.classList.toggle('wrapper_active');
            logoTitle.classList.toggle('logo_title_active');
            body.classList.toggle('body_no_scroll');
        })
    });

// popup 

const card = document.querySelectorAll('.card');
const popup = document.querySelectorAll('.popup');
const popupCloseButton = document.querySelectorAll('.popup_close_button');
const bodySec = document.querySelector('.body');

card.forEach(item => {
    item.addEventListener('click', () => {
        bodySec.classList.toggle('body_no_scroll');
    })
});

for (let i = 0; i < card.length; i++) {
    card[i].addEventListener('click', () => {
        popup[i].classList.toggle('visible');
    });
};

for (let i = 0; i < card.length; i++) {
    popupCloseButton[i].addEventListener('click', () => {
        popup[i].classList.toggle('visible');
        bodySec.classList.toggle('body_no_scroll');
    });
};

})