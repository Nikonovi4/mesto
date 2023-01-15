const editButtom = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close-button');

const formElement = document.querySelector('.popup__form');

const nameInput = formElement.querySelector('.popup_content_name');
const activityInput = formElement.querySelector('.popup_content_activity');

const profileName = document.querySelector('.profile__name');
const pofileActivity = document.querySelector('.profile__activity');

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