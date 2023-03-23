import Popup from "./Popup.js";
import { fullSizePhoto, fullSizePhotoName } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(photoLink, photoName) {
    super.open();
    fullSizePhoto.src = photoLink;
    fullSizePhoto.alt = photoName;
    fullSizePhotoName.textContent = photoName;
  }
}
