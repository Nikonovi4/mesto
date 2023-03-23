import "core-js/actual";
import "./pages/index.css";


import Card from "./components/Сard.js";
import Popup from "./components/Popup.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWihtForm.js";
import UserInfo from "./components/UserInfo.js";

import { initialCards } from "./utils/cards.js";
import {
  validationConfig,
  FormValidator,
} from "./components/FormValidator.js";

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

const FormWithPhoto = new PopupWithImage(".popup_bigphoto");

const FormNewPhoto = new Popup(".popup_add-photo");
const FormEditProfile = new Popup(".popup_profile");

const Photos = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const Photo = new Card(item.name, item.link, "#card-template", {
        handleCardClick: () => {
          BigSizePhoto.open(item.link, item.name);
        },
      });
      const PhotoElement = Photo.generateCard();
      Photos.addItems(PhotoElement);
    },
  },
  ".foto"
);

Photos.rendererItems();

const BigSizePhoto = new PopupWithImage(".popup_bigphoto");
BigSizePhoto.setEventListeners();

const ProfileEditForm = new PopupWithForm(".popup_profile", {
  callBackSubmit: (info) => {
    profileName.textContent = info.firstInputValue;
    pofileActivity.textContent = info.secondInputValue;
    FormEditProfile.close();
  },
});

const AddNewPhotoForm = new PopupWithForm(".popup_add-photo", {
  callBackSubmit: (info) => {
    const newCardElement = new Card(
      info.firstInputValue,
      info.secondInputValue,
      "#card-template",
      {
        handleCardClick: () => {
          BigSizePhoto.open(info.secondInputValue, info.firstInputValue);
        },
      }
    );
    const PhotoElement = newCardElement.generateCard();

    photoContainer.prepend(PhotoElement);
  },
});

const UserInformation = new UserInfo({
  nameSelector: ".popup__input-name",
  infoSelector: ".popup__input-activity",
});

buttonEdit.addEventListener("click", () => {
  const userInfo = UserInformation.getUserInfo();
  nameInput.value = userInfo.name;
  activityInput.value = userInfo.info;
  ProfileEditForm.open();
});

ProfileEditForm.setEventListeners();

popupAddContentButton.addEventListener("click", () => {
  AddNewPhotoForm.open();
});

AddNewPhotoForm.setEventListeners();
