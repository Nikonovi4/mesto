const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_profile');

const formEditProfile = popupEditProfile.querySelector('.popup__form');

const nameInput = formEditProfile.querySelector('.popup__input_content_name');
const activityInput = formEditProfile.querySelector('.popup__input_content_activity');

const profileName = document.querySelector('.profile__name');
const pofileActivity = document.querySelector('.profile__activity');

const photoContainer = document.querySelector('.foto');
const popupAddPhoto = document.querySelector('.popup_add-photo');
const popupAddContentButton = document.querySelector('.profile__add-content-button');

const newCardName = document.querySelector('.popup__input_card_name');
const newCardLink = document.querySelector('.popup__input_card_link');
const cardTemplate = document.querySelector('#card-template').content;


const popupBigSizePhoto = document.querySelector('.popup_bigphoto');
const bigSizePhoto = popupBigSizePhoto.querySelector('.popup__photo');
const bigSizePhotoName = popupBigSizePhoto.querySelector('.popup__photo-name');

const formNewPhoto = document.querySelector('.popup__newphoto');

function openPopup(element) {
    element.classList.add('popup_opened');
};

function closePopup(element) {
    element.classList.remove('popup_opened');
};


function autofillPopup() {
    nameInput.value = profileName.textContent;
    activityInput.value = pofileActivity.textContent;
    openPopup(popupEditProfile);
};

editButton.addEventListener('click', autofillPopup);

document.querySelectorAll('.popup__close-button').forEach(button => {
    const buttonsPopup = button.closest('.popup');
    button.addEventListener('click', () => {
        closePopup(buttonsPopup);
    });
});

function editProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    pofileActivity.textContent = activityInput.value;
    closePopup(popupEditProfile);
};

formEditProfile.addEventListener('submit', editProfileFormSubmit);

function createCard(nameCard, linkCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const like = cardElement.querySelector('.card__like');
    const photo = cardElement.querySelector('.card__photo');

    cardElement.querySelector('.card__name').textContent = nameCard;
    photo.src = linkCard;
    photo.alt = nameCard;


    cardElement.querySelector('.card__del-btn').addEventListener('click', () => {
        cardElement.remove();
    });

    like.addEventListener('click', () => {
        like.classList.add('card__like_clicked');
    });

    photo.addEventListener('click', () => {
        bigSizePhoto.src = linkCard;
        bigSizePhoto.alt = nameCard;
        bigSizePhotoName.textContent = nameCard;
        openPopup(popupBigSizePhoto);
    });

    return cardElement
};

function renderCard(nameCard, linkCard) {
    photoContainer.prepend(createCard(nameCard, linkCard));
};

initialCards.forEach(function (item) {
    const nameCard = item.name;
    const linkCard = item.link;

    renderCard(nameCard, linkCard);
});

popupAddContentButton.addEventListener('click', () => {
    const button = popupAddPhoto.querySelector(validationConfig.submitButtonClass);
    
    openPopup(popupAddPhoto);
    disableButton(button, validationConfig.disableButtonClass);
    resetErrorElements(popupAddPhoto, validationConfig.inputSelector, validationConfig.invalidInputClass);
});

function addNewCard(evt) {
    evt.preventDefault();
    const nameCard = newCardName.value;
    const linkCard = newCardLink.value;
    renderCard(nameCard, linkCard);
    closePopup(popupAddPhoto);
    formNewPhoto.reset();
};

formNewPhoto.addEventListener('submit', addNewCard);

document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', (evt) => {
        if (evt.target === popup) {
        closePopup(popup);
        }
    })
});

document.querySelectorAll('.popup').forEach(popup => {
    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape' && popup.classList.contains('popup_opened')) {
        closePopup(popup);
        }
    })
});