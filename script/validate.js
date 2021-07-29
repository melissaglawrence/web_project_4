const showInputError = (input, settings) => {
  const error = document.querySelector(`.${input.id}-error`);
  console.log(error);
  input.classList.add(settings.inputErrorClass);
  error.classList.add(settings.errorClass);
  error.textContent = input.validationMessage;
}

const hideInputError = (input, settings) => {
  const error = document.querySelector(`.${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);
  error.classList.remove(settings.errorClass);
  error.textContent = "";
}

const checkInputValidity = (input, settings) => {
  if(input.validity.valid){
    hideInputError(input, settings);
  }else{
    showInputError(input, settings);
  }
}


const toggleButtonState = (inputs, button, settings) =>{
  const isValid = inputs.every(input => input.validity.valid);
  if(!isValid){
    button.classList.add(settings.inactiveButtonClass);
    button.disabled = true;
  }else{
    button.classList.remove(settings.inactiveButtonClass);
    button.disabled = false;
  }
}


const enableValidation = (settings) => {
  const forms = [...document.querySelectorAll(settings.formSelector)];

  forms.forEach(form => {
    form.addEventListener("submit", evt => {
     toggleButtonState(inputs, button, settings);
      evt.preventDefault();
    })
    const inputs = [...form.querySelectorAll(settings.inputSelector)];
    const button = form.querySelector(settings.submitButtonSelector);
   
    inputs.forEach(input => {
      input.addEventListener("input", () => {
        checkInputValidity(input, settings);
        toggleButtonState(inputs, button, settings);
      })
    })
  })
}

enableValidation({
  formSelector: ".popup__info",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inputContainer: ".popup__input-container",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active"
}) 







