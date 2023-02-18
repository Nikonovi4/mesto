const showInputError = (inputElement, errorElement, invalidInputClass) => {
    inputElement.classList.add(invalidInputClass);
    errorElement.textContent = inputElement.validationMessage;
   };

const hideInputError = (inputElement, errorElement, invalidInputClass) => {
    inputElement.classList.remove(invalidInputClass);
    errorElement.textContent = "";
};

const disableButton = (buttonElement, disableButtonClass) => {
    buttonElement.classList.add(disableButtonClass);
    buttonElement.disabled = true;
   };

const enableButton = (buttonElement, disableButtonClass) => {
    buttonElement.classList.remove(disableButtonClass);
    buttonElement.disabled = false;
};

const toggleButtonState = (buttonElement, disableButtonClass, buttonState) => {
    if (buttonState) {
        disableButton(buttonElement, disableButtonClass);
    } else {
        enableButton(buttonElement, disableButtonClass);
    }
};

const checkInputValidity = (inputElement, errorElement, invalidInputClass) => {
    if (inputElement.validity.valid) {
        hideInputError(inputElement, errorElement, invalidInputClass);
    } else {
        showInputError(inputElement, errorElement, invalidInputClass);
    };
};

const hesInvalidInput = (inputs) => {
    return inputs.some((input) => !input.validity.valid);
};

const handleFormInput = (evt, form, invalidInputClass, submitButtonClass, disableButtonClass, inputs) => {
    const inputElement = evt.target;
    const errorElement = form.querySelector(`.${inputElement.name}-error`);
    const formSubmitButtonElement = form.querySelector(submitButtonClass);
    const buttonState = hesInvalidInput(inputs);

    checkInputValidity(inputElement, errorElement, invalidInputClass);

    toggleButtonState(formSubmitButtonElement, disableButtonClass, buttonState);
};

const resetErrorElements = (form, inputSelector, invalidInputClass) => {
    inputs = Array.from(form.querySelectorAll(inputSelector))
    inputs.forEach((input) =>{
        const errorElement = form.querySelector(`.${input.name}-error`);
        hideInputError(input, errorElement, invalidInputClass);
    })
};

const setEventListener = (formElement, inputSelector, invalidInputClass, submitButtonClass, disableButtonClass) => {
    const inputs = Array.from(formElement.querySelectorAll(inputSelector));
    inputs.forEach((inputElement) => {
        inputElement.addEventListener('input', (evt) => handleFormInput(evt, formElement, invalidInputClass, submitButtonClass, disableButtonClass, inputs));
    });
};

const enableValidation = () => {
    const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));
    forms.forEach((form) => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListener(form, validationConfig.inputSelector, validationConfig.invalidInputClass, validationConfig.submitButtonClass, validationConfig.disableButtonClass)
    })
};

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    invalidInputClass: 'popup__input_type_error',
    submitButtonClass: '.popup__save',
    disableButtonClass:'popup__save_type_disabled'
};

enableValidation(validationConfig)