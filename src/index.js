import "core-js/actual";
import "./pages/index.css";

import Card from "./components/Сard.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWihtForm.js";
import UserInfo from "./components/UserInfo.js";

import { initialCards } from "./utils/cards.js";
import { validationConfig, FormValidator } from "./components/FormValidator.js";

import {
  popupEditProfile,
  formNewPhoto,
  buttonEdit,
  popupAddContentButton,
  nameInput,
  activityInput,
  profileName,
  pofileActivity,
  photoContainer,
} from "./utils/constants.js";

const profileValidatior = new FormValidator(popupEditProfile, validationConfig);
const newCardValidatior = new FormValidator(formNewPhoto, validationConfig);
profileValidatior.enableValidation();
newCardValidatior.enableValidation();

function createCard(name, link) {
  const photo = new Card(name, link, "#card-template", {
    handleCardClick: () => {
      bigSizePhoto.open(link, name);
    },
  });
  const cardElement = photo.generateCard();
  return cardElement;
}

const photos = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const photoElement = createCard(item.name, item.link);
      photos.addItems(photoElement);
    },
  },
  ".foto"
);

photos.rendererItems();

const bigSizePhoto = new PopupWithImage(".popup_bigphoto");
bigSizePhoto.setEventListeners();

const profileEditForm = new PopupWithForm(".popup_profile", {
  callBackSubmit: (info) => {
    userInformation.setUserInfo(
      info["popup__input-name"],
      info["popup__input-activity"]
    );
    profileEditForm.close();
  },
});

const addNewPhotoForm = new PopupWithForm(".popup_add-photo", {
  callBackSubmit: (info) => {
    const newPhoto = createCard(
      info["popup__input-card-name"],
      info["popup__input-card-link"]
    );
    photos.addItems(newPhoto);
  },
});

const userInformation = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__activity",
});

buttonEdit.addEventListener("click", () => {
  const userInfo = userInformation.getUserInfo();
  nameInput.value = userInfo.name;
  activityInput.value = userInfo.info;
  profileEditForm.open();
});

profileEditForm.setEventListeners();

popupAddContentButton.addEventListener("click", () => {
  addNewPhotoForm.open();
  newCardValidatior.disableButton();
  newCardValidatior.resetErrorElements();
});

addNewPhotoForm.setEventListeners();
