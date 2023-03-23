export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  invalidInputClass: "popup__input_type_error",
  submitButtonClass: ".popup__save",
  disableButtonClass: "popup__save_type_disabled",
};

export class FormValidator {
  constructor(formElement, validationConfig) {
    this._formElement = formElement;
    this._validationConfig = validationConfig;
    this.formSubmitButtonElement = this._formElement.querySelector(
      this._validationConfig.submitButtonClass
    );
    this._inputsList = Array.from(
      this._formElement.querySelectorAll(this._validationConfig.inputSelector)
    );
  }

  _showInputError(_inputElement, _errorElement) {
    _inputElement.classList.add(this._validationConfig.invalidInputClass);
    _errorElement.textContent = _inputElement.validationMessage;
  }

  _hideInputError(_inputElement, _errorElement) {
    _inputElement.classList.remove(this._validationConfig.invalidInputClass);
    _errorElement.textContent = "";
  }

  disableButton() {
    this.formSubmitButtonElement.classList.add(
      this._validationConfig.disableButtonClass
    );
    this.formSubmitButtonElement.disabled = true;
  }

  _enableButton() {
    this.formSubmitButtonElement.classList.remove(
      this._validationConfig.disableButtonClass
    );
    this.formSubmitButtonElement.disabled = false;
  }

  _toggleButtonState(_buttonState) {
    if (_buttonState) {
      this.disableButton();
    } else {
      this._enableButton();
    }
  }

  _checkInputValidity(_inputElement, _errorElement) {
    if (_inputElement.validity.valid) {
      this._hideInputError(_inputElement, _errorElement);
    } else {
      this._showInputError(_inputElement, _errorElement);
    }
  }

  _hesInvalidInput() {
    return this._inputsList.some((input) => !input.validity.valid);
  }

  _handleFormInput(evt) {
    const _inputElement = evt.target;
    const _errorElement = this._formElement.querySelector(
      `.${_inputElement.name}-error`
    );

    const _buttonState = this._hesInvalidInput();

    this._checkInputValidity(_inputElement, _errorElement);

    this._toggleButtonState(_buttonState);
  }

  resetErrorElements() {
    this._inputsList.forEach((input) => {
      const _errorElement = this._formElement.querySelector(
        `.${input.name}-error`
      );
      this._hideInputError(input, _errorElement);
    });
  }

  _setEventListener() {
    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) =>
        this._handleFormInput(evt)
      );
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListener();
  }
}
