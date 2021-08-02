class FormValidator {
  constructor(data, formElement){
    this._inputSelector = data.inputSelector,
    this._submitButtonSelector = data.submitButtonSelector,
    this._inactiveButtonClass = data.inactiveButtonClass,
    this._inputErrorClass = data.inputErrorClass,
    this._errorClass = data.errorClass,
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

  _setEventListeners() {
    const inputs = [...this._form.querySelectorAll(this._inputSelector)];
   
    inputs.forEach(input => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState(inputs);
      });
    });
  }
  
  enableValidation(){
    this._form.addEventListener("submit", evt => {
        evt.preventDefault();
        
      })
    this._setEventListeners();
    }
  }


  export default FormValidator