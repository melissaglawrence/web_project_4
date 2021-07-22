//MAKES THE ERROR MESSAGE/BORDER VISABLE TO THE USER
function showInputError (formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.classList.add("popup__input-error_active");
  errorElement.textContent = errorMessage;
};


//HIDES THE ERROR MESSAGE/VISUAL
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
};


//CHECKS IF INPUT IS VALID AND SHOWS OR HIDES ERROR
function isValid(formElement, inputElement) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }else {
    hideInputError(formElement, inputElement);
  }
};


//CHECKS IF ALL INPUTS ARE VALID --FOR SAVE BUTTON
function hasInvalidInput(inputList){
  return inputList.some((inputElement) => {
     return !inputElement.validity.valid;
  })
}


//MAKES BUTTON INACTIVE OR ACTIVE BASED ON INPUTS
function toggleButtonState(inputList, buttonElement){
  if(hasInvalidInput(inputList)){
  buttonElement.classList.add("popup__save_inactive");
  buttonElement.disabled = true;
  }else{
  buttonElement.classList.remove("popup__save_inactive");
  buttonElement.disabled = false;
}}



//MAKES AN ARRAY OF ALL THE INPUTS AND BUTTONS FROM THE FORMS AND ADD AN EVENT LISTENER TO ALL OF THEM
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElements = Array.from(formElement.querySelectorAll(".popup__save"));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      buttonElements.forEach((btn) => {
      toggleButtonState(inputList, btn);
      })
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__info"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
      const buttonElements = Array.from(formElement.querySelectorAll(".popup__save"));
      const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
      buttonElements.forEach((btn) => {
        toggleButtonState(inputList, btn);
      });
    })
    setEventListeners(formElement);
    
  });
};

enableValidation(); 