import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, { callBackSubmit }) {
    super(popupSelector);
    this._callBackSubmit = callBackSubmit;
    this._popupElement = document.querySelector(popupSelector);
    this._popupForm = this._popupElement.querySelector(".popup__form");
  }

  _getInputValues() {
    const inputs = this._popupElement.querySelectorAll(".popup__input");
    return {
      firstInputValue: inputs[0].value,
      secondInputValue: inputs[1].value,
    };
  }

  _close() {
    super.close();
    this._popupForm.reset();
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callBackSubmit(this._getInputValues());
      this._close();
    });
  }
}
