import Card from "./Сard.js";
import { initialCards } from "./cards.js";
import { validationConfig } from "./FormValidator.js";
import { FormValidator } from "./FormValidator.js";

const buttonEdit = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_profile");

const formEditProfile = popupEditProfile.querySelector(".popup__profile-edit");

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

const newCardName = popupAddPhoto.querySelector(".popup__input-card-name");
const newCardLink = popupAddPhoto.querySelector(".popup__input-card-link");

const fullSizePhotoPopup = document.querySelector(".popup_bigphoto");
const fullSizePhoto = fullSizePhotoPopup.querySelector(".popup__photo");
const fullSizePhotoName =
  fullSizePhotoPopup.querySelector(".popup__photo-name");

const profileValidatior = new FormValidator(popupEditProfile, validationConfig);
const newCardValidatior = new FormValidator(formNewPhoto, validationConfig);
profileValidatior.enableValidation();
newCardValidatior.enableValidation();

const openPopup = (element) => {
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

function fillProfileInput() {
  nameInput.value = profileName.textContent;
  activityInput.value = pofileActivity.textContent;
  openPopup(popupEditProfile);
};

function heandleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  pofileActivity.textContent = activityInput.value;
  closePopup(popupEditProfile);
};

const handleOpenFullSizePhoto = (nameCard, linkCard) => {
  fullSizePhoto.src = linkCard;
  fullSizePhoto.alt = nameCard;
  fullSizePhotoName.textContent = nameCard;
  openPopup(fullSizePhotoPopup);
};

function createCard(nameCard, linkCard) {
  const card = new Card(
    nameCard,
    linkCard,
    "#card-template",
    handleOpenFullSizePhoto
  );

  const cardElement = card.generateCard();

  return cardElement;
};

const heandleGeneratePhoto = () => {
  const newCardElement = createCard(newCardName.value, newCardLink.value);

  photoContainer.prepend(newCardElement);
};

formNewPhoto.addEventListener("submit", (evt) => {
  evt.preventDefault();
  heandleGeneratePhoto();
  closePopup(popupAddPhoto);
  formNewPhoto.reset();
});

popupAddContentButton.addEventListener("click", () => {
  openPopup(popupAddPhoto);
  newCardValidatior.disableButton();
  newCardValidatior.resetErrorElements();
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

buttonEdit.addEventListener("click", fillProfileInput);

formEditProfile.addEventListener("submit", heandleProfileFormSubmit);

initialCards.forEach((item) => {
  const cardElement = createCard(item.name, item.link);

  photoContainer.append(cardElement);
});