import { openPopup } from "./index.js";

export default class Card {
  constructor(name, link) {
    this._name = name;
    this._link = link;
    this.openPopup = openPopup;
  };

  _handleLikedPhoto(likedButtonElement) {
    likedButtonElement.classList.add("card__like_clicked");
  };

  _handleDeletePhoto() {
    this._element.remove();
  };

  _handleOpenFullSizePhoto(
    fullSizePhoto,
    fullSizePhotoName,
    fullSizePhotoPopup
  ) {
    fullSizePhoto.src = this._link;
    fullSizePhoto.alt = this._name;
    fullSizePhotoName.textContent = this._name;
    this.openPopup(fullSizePhotoPopup);
  };

  _setEventListeners(
    likedButtonElement,
    deleteButtonElement,
    fullSizePhoto,
    fullSizePhotoName,
    fullSizePhotoPopup,
    photoElement
  ) {
    likedButtonElement.addEventListener("click", () => {
      this._handleLikedPhoto(likedButtonElement);
    });

    photoElement.addEventListener("click", () => {
      this._handleOpenFullSizePhoto(
        fullSizePhoto,
        fullSizePhotoName,
        fullSizePhotoPopup
      );
    });

    deleteButtonElement.addEventListener("click", () => {
      this._handleDeletePhoto();
    });
  };

  _getTemplate() {
    const cardElement = document
      .querySelector("#card-template")
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  };

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__photo").src = this._link;
    this._element.querySelector(".card__photo").alt = this._name;
    this._element.querySelector(".card__name").textContent = this._name;

    const photoElement = this._element.querySelector(".card__photo");
    const likedButtonElement = this._element.querySelector(".card__like");
    const deleteButtonElement = this._element.querySelector(".card__del-btn");
    const fullSizePhotoPopup = document.querySelector(".popup_bigphoto");
    const fullSizePhoto = fullSizePhotoPopup.querySelector(".popup__photo");
    const fullSizePhotoName =
      fullSizePhotoPopup.querySelector(".popup__photo-name");

    this._setEventListeners(
      likedButtonElement,
      deleteButtonElement,
      fullSizePhoto,
      fullSizePhotoName,
      fullSizePhotoPopup,
      photoElement
    );

    return this._element;
  }
};