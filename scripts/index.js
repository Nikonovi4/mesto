const editButtom = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-button');

const formElement = document.querySelector('.popup__form');

const nameInput = formElement.querySelector('.popup__input_content_name');
const activityInput = formElement.querySelector('.popup__input_content_activity');

const profileName = document.querySelector('.profile__name');
const pofileActivity = document.querySelector('.profile__activity');

const photoContainer = document.querySelector('.foto');
const popupAddPhoto = document.querySelector('.popup_add-photo');
const addPhotoBtn = document.querySelector('.profile__add-content-button');

const newCardName = document.querySelector('.popup__input_card_name');
const newCardLink = document.querySelector('.popup__input_card_link');
const addPhotoButton = document.querySelector('.popup__add-photo')

function openPopup() {
    popup.classList.add('popup_open');
}

function autofillPopup() {
    nameInput.value = profileName.textContent;
    activityInput.value = pofileActivity.textContent;
    openPopup();
}

editButtom.addEventListener('click', autofillPopup);

function closePopup() {
    popup.classList.remove('popup_open');
}

closePopupButton.addEventListener('click', closePopup);

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    pofileActivity.textContent = activityInput.value;
    closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// загрузка фото

function addCard(nameCard, linkCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const photo = cardElement.querySelector('.card__photo');
    const popupBigPhoto = document.querySelector('.popup__big-photo');
    const bigPhoto = popupBigPhoto.querySelector('.popup__photo');
    const bigPhotoName = popupBigPhoto.querySelector('.popup__photo-name');
    const like = cardElement.querySelector('.card__like')
    const bigPhotoClose = popupBigPhoto.querySelector('.popup__close-button');

    cardElement.querySelector('.card__name').textContent = nameCard;
    photo.src = linkCard;
    photo.alt = nameCard;
    photoContainer.prepend(cardElement);
    
    cardElement.querySelector('.card__del-btn').addEventListener('click', ()=>{
        cardElement.remove();
    });

    like.addEventListener('click', () => {
        like.classList.add('card__like_clicked');
    })
    
    photo.addEventListener('click', () => {
        bigPhoto.src = linkCard;
        bigPhotoName.textContent = nameCard;
        popupBigPhoto.classList.add('popup_open');
    });
    
    bigPhotoClose.addEventListener('click', () => {
        popupBigPhoto.classList.remove('popup_open');
    });
    
}

// обработка стартового массива
for (let i = 0; i < initialCards.length; ++i) {
    let nameCard = initialCards[i].name;
    let linkCard = initialCards[i].link;
    
    addCard(nameCard, linkCard);
}
// попап для добавления фото

function openPopupAddPhoto() {
    popupAddPhoto.classList.add('popup_open');
}

addPhotoBtn.addEventListener('click', openPopupAddPhoto);


const closePopupAddPhotoButton = popupAddPhoto.querySelector('.popup__close-button');
function closePopupAddPhoto() {
    popupAddPhoto.classList.remove('popup_open');
}
closePopupAddPhotoButton.addEventListener('click', closePopupAddPhoto);


function addNewCard(evt) {
    evt.preventDefault();
    let nameCard = newCardName.value;
    let linkCard = newCardLink.value;
    addCard(nameCard, linkCard);
    //formElement.reset();
    closePopupAddPhoto();
}
addPhotoButton.addEventListener('click', addNewCard);

