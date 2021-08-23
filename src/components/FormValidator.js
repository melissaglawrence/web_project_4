class FormValidator {
  constructor(validationConfig, formElement) {
    (this._inputSelector = validationConfig.inputSelector),
      (this._submitButtonSelector = validationConfig.submitButtonSelector),
      (this._inactiveButtonClass = validationConfig.inactiveButtonClass),
      (this._inputErrorClass = validationConfig.inputErrorClass),
      (this._errorClass = validationConfig.errorClass),
      (this._form = formElement);
    this._button = this._form.querySelector(this._submitButtonSelector);

    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._button = this._form.querySelector(this._submitButtonSelector);
  }

  _showInputError(input) {
    const error = document.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.classList.add(this._errorClass);
    error.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    const error = document.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = "";
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  }

  _toggleButtonState(inputs) {
    const isValid = inputs.some((input) => !input.validity.valid);
    if (isValid) {
      this._button.classList.add(this._inactiveButtonClass);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState(this._inputList);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._toggleButtonState(this._inputList);
    });
    this._setEventListeners(this._inputList);
  }
}

export default FormValidator;
