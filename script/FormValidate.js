class FormValidator {
  constructor(validationConfig, formElement){
    this._inputSelector = validationConfig.inputSelector,
    this._submitButtonSelector = validationConfig.submitButtonSelector,
    this._inactiveButtonClass = validationConfig.inactiveButtonClass,
    this._inputErrorClass = validationConfig.inputErrorClass,
    this._errorClass = validationConfig.errorClass,
    this._form = formElement
  }

  _showInputError(input){
    const error = document.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.classList.add(this._errorClass);
    error.textContent = input.validationMessage;
  }

  _hideInputError(input){
    const error = document.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = "";
  }

  _checkInputValidity(input){
    if(input.validity.valid){
      this._hideInputError(input);
    }else{
      this._showInputError(input);
    }
  }

  _toggleButtonState(inputs){
    const button = this._form.querySelector(this._submitButtonSelector);
    const isValid = inputs.every(input => input.validity.valid);
    if(!isValid){
      button.classList.add(this._inactiveButtonClass);
      button.disabled = true;
    }else{
      button.classList.remove(this._inactiveButtonClass);
      button.disabled = false;
    }
  }

  _setEventListeners(inputs) {
    inputs.forEach(input => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState(inputs);
      });
    });
  }
  
  enableValidation(){
    const inputs = [...this._form.querySelectorAll(this._inputSelector)];
    
    this._form.addEventListener("submit", evt => {
      evt.preventDefault();
      this._toggleButtonState(inputs);
    })
    this._setEventListeners(inputs);
  }
}

export default FormValidator