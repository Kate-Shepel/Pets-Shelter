window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.navigation_list');
    const menuItem = document.querySelectorAll('.nav-item');
    const hamburger = document.querySelector('.hamburger');
    const wrapper = document.querySelector('.wrapper');
    const logoTitle = document.querySelector('.logo_title');
    const logoSubTitle = document.querySelector('.logo_subtitle');
    const body = document.querySelector('body');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
        wrapper.classList.toggle('wrapper_active');
        logoTitle.classList.toggle('logo_title_active');
        logoSubTitle.classList.toggle('logo_subtitle_active');
        body.classList.toggle('body_no_scroll');
    });

    wrapper.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
        wrapper.classList.toggle('wrapper_active');
        logoTitle.classList.toggle('logo_title_active');
        logoSubTitle.classList.toggle('logo_subtitle_active');
        body.classList.toggle('body_no_scroll');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
            wrapper.classList.toggle('wrapper_active');
            logoTitle.classList.toggle('logo_title_active');
            logoSubTitle.classList.toggle('logo_subtitle_active');
            body.classList.toggle('body_no_scroll');
        })
    });

// popup 

const cardContainer = document.querySelector('.carousel');
const popups = document.querySelectorAll('.popup');
const bodySec = document.querySelector('.body');

const openPopup = (animalName) => {
    const popupToShow = Array.from(popups).find(popup => 
        popup.querySelector('.card_modal_name').textContent === animalName
    );
    if (popupToShow) {
        popupToShow.classList.add('visible');
        bodySec.classList.add('body_no_scroll');
    }
};

const closePopup = (popup) => {
    popup.classList.remove('visible');
    bodySec.classList.remove('body_no_scroll');
};

cardContainer.addEventListener('click', (e) => {

    if (e.target.classList.contains('more_button')) {
        const card = e.target.closest('.card');
        const animalName = card.getAttribute('data-name');
        openPopup(animalName);
    }
});

popups.forEach(popup => {
    const closeButton = popup.querySelector('.popup_close_button');
    const popupBody = popup.querySelector('.popup_body');
    closeButton.addEventListener('click', () => closePopup(popup));

    popup.addEventListener('click', (e) => {
        if (e.target === popupBody) {
            closePopup(popup);
        }
    });
});

// carousel

const LEFT_ARROW = document.querySelector('.left_arrow');
const RIGHT_ARROW = document.querySelector('.right_arrow');
const CAROUSEL = document.querySelector('.carousel');
const CARDS_LEFT = document.querySelector('#cards_left');
const CARDS_RIGHT = document.querySelector('#cards_right');
const CARDS_MIDDLE = document.querySelector('#cards_middle');

const animals = [
    { name: 'Sophia', img: '../../assets/images/pets-sophia-scaled.png', type: 'Dog', breed: 'Shih tzu' },
    { name: 'Scarlett', img: '../../assets/images/scarlett.png', type: 'Dog', breed: 'Jack Russell Terrier' },
    { name: 'Timmy', img: '../../assets/images/timmy.png', type: 'Cat', breed: 'British Shorthair' },
    { name: 'Katrine', img: '../../assets/images/katrine.png', type: 'Cat', breed: 'British Shorthair' },
    { name: 'Jennifer', img: '../../assets/images/jennifer.png', type: 'Dog', breed: 'Labrador' },
    { name: 'Woody', img: '../../assets/images/woody.png', type: 'Dog', breed: 'Golden Retriever' },
    { name: 'Freddie', img: '../../assets/images/freddie.png', type: 'Cat', breed: 'British Shorthair' },
    { name: 'Charly', img: '../../assets/images/charly.png', type: 'Dog', breed: 'Jack Russell Terrier' }
];

const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

const createCards = (cardsContainer, animalArray) => {
    cardsContainer.innerHTML = '';
    animalArray.forEach(animal => {
    const card = `
        <div class="card" data-name="${animal.name}">
        <div class="card_content">
            <img class="card_img" src="${animal.img}" alt="${animal.name}">
            <h3 class="card-title">${animal.name}</h3>
            <button class="button more_button" type="submit">Learn more</button>
        </div>
        </div>
    `;
    cardsContainer.innerHTML += card;
    });
};

const getRandomAnimals = (excludeAnimals = [], count = 3) => {
    let availableAnimals = animals.filter(animal => !excludeAnimals.includes(animal.name));
    availableAnimals = shuffleArray(availableAnimals);
    return availableAnimals.slice(0, count);
};

const updateSlide = (direction) => {
    const currentAnimals = Array.from(CARDS_MIDDLE.querySelectorAll('.card-title')).map(card => card.innerText);
    let newAnimals;

    if (direction === 'left') {
        newAnimals = getRandomAnimals(currentAnimals, getVisibleCardCount());
        createCards(CARDS_LEFT, newAnimals);
        CAROUSEL.classList.add('animation_left');
    } else if (direction === 'right') {
        newAnimals = getRandomAnimals(currentAnimals, getVisibleCardCount());
        createCards(CARDS_RIGHT, newAnimals);
        CAROUSEL.classList.add('animation_right');
    }

    LEFT_ARROW.removeEventListener('click', moveLeft);
    RIGHT_ARROW.removeEventListener('click', moveRight);
};

const getVisibleCardCount = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 769) return 3;
    if (screenWidth >= 414) return 2;
    return 1;
};

CAROUSEL.addEventListener('animationend', (animationEvent) => {
    if (animationEvent.animationName === 'move_left') {
        CAROUSEL.classList.remove('animation_left');
        const leftCardsInner = CARDS_LEFT.innerHTML;
        CARDS_MIDDLE.innerHTML = leftCardsInner;
    } else if (animationEvent.animationName === 'move_right') {
        CAROUSEL.classList.remove('animation_right');
        const rightCardsInner = CARDS_RIGHT.innerHTML;
        CARDS_MIDDLE.innerHTML = rightCardsInner;
    }

    LEFT_ARROW.addEventListener('click', moveLeft);
    RIGHT_ARROW.addEventListener('click', moveRight);
});

const moveLeft = () => updateSlide('left');
const moveRight = () => updateSlide('right');

LEFT_ARROW.addEventListener('click', moveLeft);
RIGHT_ARROW.addEventListener('click', moveRight);

window.onload = () => {
    const initialAnimals = getRandomAnimals([], getVisibleCardCount());
    createCards(CARDS_MIDDLE, initialAnimals);
};

})