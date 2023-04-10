import Popup from "./Popup.js";
export default class PopupWithConfirm extends Popup {
  setSubmitAction(action) {
    this.handleSubmitCallback = action;
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.handleSubmitCallback();
    });

    super.setEventListeners();
  }
}
