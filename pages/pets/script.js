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

// carousel

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

let availableAnimals = [...animals];

const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

const getCardsPerPage = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 769) return 8;
    if (screenWidth >= 610) return 6;
    return 3;
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

const createCardsForPage = (cardsPerPage) => {

    if (availableAnimals.length < cardsPerPage) {
        availableAnimals = [...animals];
    }

    const shuffledAnimals = shuffleArray([...availableAnimals]);
    const animalsForPage = shuffledAnimals.slice(0, cardsPerPage);

    availableAnimals = availableAnimals.filter(animal => !animalsForPage.includes(animal));

    createCards(document.querySelector('.cards'), animalsForPage);
};

let currentPage = 1;
const totalPages = Math.ceil(animals.length * 6 / getCardsPerPage());

const updatePagination = () => {
    document.querySelector('.page_number').textContent = currentPage;

    document.querySelector('.first_page_arrow').classList.toggle('disabled', currentPage === 1);
    document.querySelector('.previous_page_arrow').classList.toggle('disabled', currentPage === 1);
    document.querySelector('.next_page_arrow').classList.toggle('disabled', currentPage === totalPages);
    document.querySelector('.last_page_arrow').classList.toggle('disabled', currentPage === totalPages);
};

document.querySelector('.first_page_arrow').addEventListener('click', () => {
    if (currentPage !== 1) {
        currentPage = 1;
        createCardsForPage(getCardsPerPage());
        updatePagination();
    }
});

document.querySelector('.previous_page_arrow').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage -= 1;
        createCardsForPage(getCardsPerPage());
        updatePagination();
    }
});

document.querySelector('.next_page_arrow').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage += 1;
        createCardsForPage(getCardsPerPage());
        updatePagination();
    }
});

document.querySelector('.last_page_arrow').addEventListener('click', () => {
    if (currentPage !== totalPages) {
        currentPage = totalPages;
        createCardsForPage(getCardsPerPage());
        updatePagination();
    }
});

window.addEventListener('resize', () => {
    createCardsForPage(getCardsPerPage());
});

window.onload = () => {
    createCardsForPage(getCardsPerPage());
    updatePagination();
};

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