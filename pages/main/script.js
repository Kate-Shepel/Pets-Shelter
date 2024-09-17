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
        <div class="card">
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

/*
const json = [
    {
        "name": "Jennifer",
        "img": "../../assets/images/jennifer.png",
        "type": "submit",
        "text": "Learn more",
    },
    {
        "name": "Sophia",
        "img": "../../assets/images/pets-sophia-scaled",
        "type": "submit",
        "text": "Learn more",
    },
    {
        "name": "Woody",
        "img": "../../assets/images/woody.png",
        "type": "submit",
        "text": "Learn more",
    },
    {
        "name": "Scarlett",
        "img": "../../assets/images/scarlett.png",
        "type": "submit",
        "text": "Learn more",
    },
    {
        "name": "Katrine",
        "img": "../../assets/images/katrine.png",
        "type": "submit",
        "text": "Learn more",
    },
    {
        "name": "Timmy",
        "img": "../../assets/images/timmy.png",
        "type": "submit",
        "text": "Learn more",
    },
    {
        "name": "Freddie",
        "img": "../../assets/images/freddie.png",
        "type": "submit",
        "text": "Learn more",
    },
    {
        "name": "Charly",
        "img": "../../assets/images/charly.png",
        "type": "submit",
        "text": "Learn more",
    }
];

const pets = JSON.parse(JSON.stringify(json));

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

let randomNumberArray = [];

function fillRandomNumberArray (start, end, total) {
    while (randomNumberArray.length < total) {
        let randomElement = getRandomNumber(start, end);
        arrElem = randomElement;
    if (!randomNumberArray.includes(arrElem)) {
        randomNumberArray.push(arrElem);
    }
    }
    return randomNumberArray;
}

function clearArray () {
    randomNumberArray.length = 0;
}

const createCardTemplate = (petNumber) => {

    const card = document.createElement("div");
    card.classList.add("card");
    const cardContent = document.createElement("div");
    cardContent.classList.add("card_content");
    card.appendChild(cardContent);
    const img = new Image(364, 364);
    img.classList.add('card_img');
    img.alt = pets[petNumber].name;
    img.src = `${pets[petNumber].img}`;
    cardContent.appendChild(img);
    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = pets[petNumber].name;
    cardContent.appendChild(cardTitle);
    const button = document.createElement('button');
    button.classList.add('button more_button');
    button.type = pets[petNumber].type;
    button.textContent = pets[petNumber].text;
    cardContent.appendChild(button);
    return card;
}

const LEFT_ARROW = document.querySelector('.left_arrow');
const RIGHT_ARROW = document.querySelector('.right_arrow');
const CAROUSEL = document.querySelector('.carousel');
const CARDS_LEFT = document.querySelector('#cards_left');
const CARDS_RIGHT = document.querySelector('#cards_right');

function createLeftChange(number) {
    fillRandomNumberArray(0, 7, number);
    CARDS_LEFT.innerHTML = '';
    for (let i = 0; i < number; i++) {
        let cardToBeAdded = createCardTemplate(randomNumberArray[i]);
        CARDS_LEFT.appendChild(cardToBeAdded);
    }
    clearArray();
}

function createRightChange(number) {
    fillRandomNumberArray(0, 7, number);
    CARDS_RIGHT.innerHTML = '';
    for (let i = 0; i < number; i++) {
        let cardToBeAdded = createCardTemplate(randomNumberArray[i]);
        CARDS_RIGHT.appendChild(cardToBeAdded);
    }
    clearArray();
}

if (window.innerWidth > 800) {
    window.addEventListener('load', createLeftChange(3));
    window.addEventListener('load', createRightChange(3));
} else if (window.innerWidth <= 800 && window.innerWidth >= 414) {
    window.addEventListener('load', createLeftChange(2));
    window.addEventListener('load', createRightChange(2));
} else if (window.innerWidth < 414) {
    window.addEventListener('load', createLeftChange(1));
    window.addEventListener('load', createRightChange(1));
};

const moveLeft = () => {
    CAROUSEL.classList.add('animation_left');
    LEFT_ARROW.removeEventListener('click', moveLeft);
    RIGHT_ARROW.removeEventListener('click', moveRight);
    if (window.innerWidth > 800) {
        fillRandomNumberArray(0, 7, 3);
    } else if (window.innerWidth <= 800 && window.innerWidth >= 414) {
        fillRandomNumberArray(0, 7, 2);
    } else if (window.innerWidth < 414) {
        fillRandomNumberArray(0, 7, 1);
    }; 
};

const moveRight = () => {
    CAROUSEL.classList.add('animation_right');
    RIGHT_ARROW.removeEventListener('click', moveRight);
    LEFT_ARROW.removeEventListener('click', moveLeft);
    if (window.innerWidth > 800) {
        fillRandomNumberArray(0, 7, 3);
    } else if (window.innerWidth <= 800 && window.innerWidth >= 414) {
        fillRandomNumberArray(0, 7, 2);
    } else if (window.innerWidth < 414) {
        fillRandomNumberArray(0, 7, 1);
    }
}

LEFT_ARROW.addEventListener('click', moveLeft);
RIGHT_ARROW.addEventListener('click', moveRight);

CAROUSEL.addEventListener('animationend', (animationEvent) => {
    if (animationEvent.animationName === 'move_left') {
        CAROUSEL.classList.remove('animation_left');
        const leftCardsInner = CARDS_LEFT.innerHTML;
        document.querySelector('#cards_middle').innerHTML = leftCardsInner;
        CARDS_LEFT.innerHTML = '';

        if (window.innerWidth > 800) {
        let cardToBeAdded = createCardTemplate(randomNumberArray[0]);
        CARDS_LEFT.appendChild(cardToBeAdded);
        let cardToBeAdded2 = createCardTemplate(randomNumberArray[1]);
        CARDS_LEFT.appendChild(cardToBeAdded2);
        let cardToBeAdded3 = createCardTemplate(randomNumberArray[2]);
        CARDS_LEFT.appendChild(cardToBeAdded3);
        } else if (window.innerWidth <= 800 && window.innerWidth >= 414) {
            let cardToBeAdded = createCardTemplate(randomNumberArray[0]);
            CARDS_LEFT.appendChild(cardToBeAdded);
            let cardToBeAdded2 = createCardTemplate(randomNumberArray[1]);
            CARDS_LEFT.appendChild(cardToBeAdded2);
        } else if (window.innerWidth < 414) {
            let cardToBeAdded = createCardTemplate(randomNumberArray[0]);
            CARDS_LEFT.appendChild(cardToBeAdded);
        }
        clearArray();
    } else {
        CAROUSEL.classList.remove('animation_right');
        const rightCardsInner = CARDS_RIGHT.innerHTML;
        document.querySelector("#cards_middle").innerHTML = rightCardsInner;
        CARDS_RIGHT.innerHTML = '';

        if (window.innerWidth > 800) {
            let cardToBeAdded = createCardTemplate(randomNumberArray[0]);
            CARDS_RIGHT.appendChild(cardToBeAdded);
            let cardToBeAdded2 = createCardTemplate(randomNumberArray[1]);
            CARDS_RIGHT.appendChild(cardToBeAdded2);
            let cardToBeAdded3 = createCardTemplate(randomNumberArray[2]);
            CARDS_RIGHT.appendChild(cardToBeAdded3);
            } else if (window.innerWidth <= 800 && window.innerWidth >= 414) {
                let cardToBeAdded = createCardTemplate(randomNumberArray[0]);
                CARDS_RIGHT.appendChild(cardToBeAdded);
                let cardToBeAdded2 = createCardTemplate(randomNumberArray[1]);
                CARDS_RIGHT.appendChild(cardToBeAdded2);
            } else if (window.innerWidth < 414) {
                let cardToBeAdded = createCardTemplate(randomNumberArray[0]);
                CARDS_RIGHT.appendChild(cardToBeAdded);
            }
            clearArray();
    };
    
    LEFT_ARROW.addEventListener('click', moveLeft);
    RIGHT_ARROW.addEventListener('click', moveRight);
});
*/
})