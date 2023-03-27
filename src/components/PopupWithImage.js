import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupElement = document.querySelector(this._popupSelector);
    this._fullSizePhoto = this._popupElement.querySelector(".popup__photo");
    this._fullSizePhotoName =
      this._popupElement.querySelector(".popup__photo-name");
  }
  open(photoLink, photoName) {
    super.open();
    this._fullSizePhoto.src = photoLink;
    this._fullSizePhoto.alt = photoName;
    this._fullSizePhotoName.textContent = photoName;
  }
}
