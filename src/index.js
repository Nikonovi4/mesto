import "core-js/actual";
import "./pages/index.css";

import Card from "./components/Сard.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWihtForm.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithConfirm from "./components/PopupWithConfirm.js";
import Api from "./components/Api.js";

import { validationConfig, FormValidator } from "./components/FormValidator.js";

import {
  popupEditProfile,
  formNewPhoto,
  buttonEdit,
  popupAddContentButton,
  nameInput,
  activityInput,
  profileName,
  pofileActivity
} from "./utils/constants.js";

const profileValidatior = new FormValidator(popupEditProfile, validationConfig);
const newCardValidatior = new FormValidator(formNewPhoto, validationConfig);
profileValidatior.enableValidation();
newCardValidatior.enableValidation();

let myUserId = null;

function createCard(name, link, likes, myUserId, cardId, ownerId) {
  const photo = new Card(
    name,
    link,
    "#card-template",
    {
      handleCardClick: () => {
        bigSizePhoto.open(link, name);
      },
      handleLikePhoto: (card) => {
        if (card.hasCurrentUserLike()) {
          api.dislikedPhoto(card.cardId).then((res) => {
            photo.setLikesCounter(res.likes);
          });
        } else {
          api.likedPhoto(card.cardId).then((res) => {
            photo.setLikesCounter(res.likes);
          });
        }
      },
      handleRemoveButtonClick: (card) => {
        popupWithConfirm.open();
        popupWithConfirm.setSubmitAction(() => {
          api.removeCard(card.cardId).then(() => {
            photo._handleDeletePhoto();
            popupWithConfirm.close();
          });
        });
      },
    },
    likes,
    cardId,
    myUserId,
    ownerId
  );
  const cardElement = photo.generateCard();
  photo.setLikesCounter(likes);
  photo.showDeleteButton();

  return cardElement;
}

const photos = new Section(
  {
    renderer: (item) => {
      const photoElement = createCard(
        item.name,
        item.link,
        item.likes,
        myUserId,
        item._id,
        item.owner._id
      );
      photos.addItems(photoElement);
    },
  },
  ".foto"
);

const bigSizePhoto = new PopupWithImage(".popup_bigphoto");
bigSizePhoto.setEventListeners();

const profileEditForm = new PopupWithForm(".popup_profile", {
  callBackSubmit: (info) => {
    changeAvatarForm.replaceButtonText("Сохранение...");
    api
      .editProfile(info["popup__input-name"], info["popup__input-activity"])
      .then((res) => {
        userInformation.setUserInfo(
          info["popup__input-name"],
          info["popup__input-activity"]
        ),
          profileEditForm.close();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`)
      })
      .finally(() => {
        changeAvatarForm.replaceButtonText("Сохранить")
      })
    }
  });

const addNewPhotoForm = new PopupWithForm(".popup_add-photo", {
  callBackSubmit: (info) => {
    changeAvatarForm.replaceButtonText("Сохранение...");
    api
      .addNewCard(
        info["popup__input-card-name"],
        info["popup__input-card-link"]
      )
      .then((res) => {
        const newPhoto = createCard(
          res.name,
          res.link,
          res.likes,
          myUserId,
          res._id,
          res.owner._id
        );
        photos.addItems(newPhoto);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`)
      })
      .finally(() => {
        changeAvatarForm.replaceButtonText("Сохранить");
    })
  }
})

const popupWithConfirm = new PopupWithConfirm(".popup__with-confirm");
popupWithConfirm.setEventListeners();

const userInformation = new UserInfo({
  nameSelector: ".profile__name",
  infoSelector: ".profile__activity",
});

buttonEdit.addEventListener("click", () => {
  api.getProfileInfo().then((res) => {
    nameInput.value = res.name;
    activityInput.value = res.about;
    profileEditForm.open();
  })
  .catch((err) => {
    console.log(`Ошибка ${err}`)
  });
});

profileEditForm.setEventListeners();

popupAddContentButton.addEventListener("click", () => {
  addNewPhotoForm.open();
  newCardValidatior.disableButton();
  newCardValidatior.resetErrorElements();
});

addNewPhotoForm.setEventListeners();


const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-63/",
});


Promise.all([api.getProfileInfo(), api.getAllCards()])
  .then(([userData, cards]) => {
    myUserId = userData._id;

    profileName.textContent = userData.name;
    pofileActivity.textContent = userData.about;
    profilePhoto.src = userData.avatar;
    photos.rendererItems(cards);
  })
  .catch((err) => {
    console.log(`Ошибка ${err}`)
  });

const profilePhoto = document.querySelector(".profile__foto");
const popupChangeAvatarForm = document.querySelector(".popup__newavatar");
const newAvatarFormValidatior = new FormValidator(
  popupChangeAvatarForm,
  validationConfig
);
newAvatarFormValidatior.enableValidation();

const linkAvatarinput = popupChangeAvatarForm.querySelector(".popup__input");

const changeAvatarForm = new PopupWithForm(".popup__newavatar", {
  callBackSubmit: () => {
    changeAvatarForm.replaceButtonText("Сохранение...");
    api.editAvatar(linkAvatarinput.value).then(() => {
      api.getProfileInfo().then((res) => {
        profilePhoto.src = res.avatar;
      })
      .catch((err) => {
        console.log(`Ошибка ${res.status}`)
      })
      .finally(() => {
        changeAvatarForm.replaceButtonText("Сохранить")
      })
    });
  },
});

const avatarElement = document.querySelector(".profile__foto");
avatarElement.addEventListener("click", () => {
  changeAvatarForm.open();
});

changeAvatarForm.setEventListeners();
