export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  invalidInputClass: "popup__input_type_error",
  submitButtonClass: ".popup__save",
  disableButtonClass: "popup__save_type_disabled",
};

export class FormValidator {
  constructor(formElement) {
    this._formElement = formElement;
    this._validationConfig = validationConfig;
  };

  _showInputError(_inputElement, _errorElement) {
    _inputElement.classList.add(this._validationConfig.invalidInputClass);
    _errorElement.textContent = _inputElement.validationMessage;
  };

  _hideInputError(_inputElement, _errorElement) {
    _inputElement.classList.remove(this._validationConfig.invalidInputClass);
    _errorElement.textContent = "";
  };

  _disableButton(formSubmitButtonElement) {
    formSubmitButtonElement.classList.add(
      this._validationConfig.disableButtonClass
    );
    formSubmitButtonElement.disabled = true;
  };

  _enableButton(formSubmitButtonElement) {
    formSubmitButtonElement.classList.remove(
      this._validationConfig.disableButtonClass
    );
    formSubmitButtonElement.disabled = false;
  };

  _toggleButtonState(formSubmitButtonElement, _buttonState) {
    if (_buttonState) {
      this._disableButton(formSubmitButtonElement);
    } else {
      this._enableButton(formSubmitButtonElement);
    }
  };

  _checkInputValidity(_inputElement, _errorElement) {
    if (_inputElement.validity.valid) {
      this._hideInputError(_inputElement, _errorElement);
    } else {
      this._showInputError(_inputElement, _errorElement);
    }
  };

  _hesInvalidInput(inputs) {
    return inputs.some((input) => !input.validity.valid);
  };

  _handleFormInput(evt, inputs) {
    const _inputElement = evt.target;
    const _errorElement = this._formElement.querySelector(
      `.${_inputElement.name}-error`
    );
    const formSubmitButtonElement = this._formElement.querySelector(
      this._validationConfig.submitButtonClass
    );
    const _buttonState = this._hesInvalidInput(inputs);

    this._checkInputValidity(_inputElement, _errorElement);

    this._toggleButtonState(formSubmitButtonElement, _buttonState);
  };

  _resetErrorElements(form, inputSelector, invalidInputClass) {
    const inputs = Array.from(form.querySelectorAll(inputSelector));
    inputs.forEach((input) => {
      const _errorElement = form.querySelector(`.${input.name}-error`);
      this._hideInputError(input, _errorElement, invalidInputClass);
    });
  };

  _setEventListener() {
    const inputs = Array.from(
      this._formElement.querySelectorAll(this._validationConfig.inputSelector)
    );
    inputs.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) =>
        this._handleFormInput(evt, inputs)
      );
    });
  };

  _enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListener();
  }
};