import Card from "./Сard.js";
import { initialCards } from "./cards.js";
import { validationConfig } from "./validate.js";
import { FormValidator } from "./validate.js";

const buttonEdit = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_profile");

const formEditProfile = popupEditProfile.querySelector(".popup_profile-edit");

const nameInput = formEditProfile.querySelector(".popup__input-name");
const activityInput = formEditProfile.querySelector(".popup__input-activity");

const profileName = document.querySelector(".profile__name");
const pofileActivity = document.querySelector(".profile__activity");

const photoContainer = document.querySelector(".foto");
const popupAddPhoto = document.querySelector(".popup_add-photo");
const popupAddContentButton = document.querySelector(
  ".profile__add-content-button"
);

const formNewPhoto = document.querySelector(".popup__newphoto");
const addNewPhotoButton = popupAddPhoto.querySelector(
  validationConfig.submitButtonClass
);

const buttonSubmitAddContent = popupAddPhoto.querySelector(
  validationConfig.submitButtonClass
);

const profileValidatior = new FormValidator(popupEditProfile);
const newCardValidatior = new FormValidator(formNewPhoto);
profileValidatior._enableValidation();
newCardValidatior._enableValidation();

export const openPopup = (element) => {
  element.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
};

const closePopup = (element) => {
  element.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
};

const closePopupByEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

function autofillPopup() {
  nameInput.value = profileName.textContent;
  activityInput.value = pofileActivity.textContent;
  openPopup(popupEditProfile);
};

function heandelProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  pofileActivity.textContent = activityInput.value;
  closePopup(popupEditProfile);
};

const hendleGeneratePhoto = () => {
  const newCardName = popupAddPhoto.querySelector(
    ".popup__input-card-name"
  ).value;
  const newCardLink = popupAddPhoto.querySelector(
    ".popup__input-card-link"
  ).value;
  const newCard = new Card(newCardName, newCardLink);
  const newCardElement = newCard.generateCard();

  photoContainer.prepend(newCardElement);
};

addNewPhotoButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  hendleGeneratePhoto();
  closePopup(popupAddPhoto);
  formNewPhoto.reset();
});

popupAddContentButton.addEventListener("click", () => {
  openPopup(popupAddPhoto);
  newCardValidatior._disableButton(
    buttonSubmitAddContent,
    validationConfig.disableButtonClass
  );
  newCardValidatior._resetErrorElements(
    popupAddPhoto,
    validationConfig.inputSelector,
    validationConfig.invalidInputClass
  );
});

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target === popup ||
      evt.target.classList.contains("popup__close-button")
    ) {
      closePopup(popup);
    }
  });
});

buttonEdit.addEventListener("click", autofillPopup);

formEditProfile.addEventListener("submit", heandelProfileFormSubmit);

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link);
  const cardElement = card.generateCard();

  photoContainer.append(cardElement);
});