import FormValidator from "./FormValidate.js";
import placeCards from "./initial-cards.js";
import Card from "./Card.js";
import { openModal, closeModal } from "./utils/utils.js";

const page = document.querySelector(".page");
const profileEditBtn = page.querySelector(".profile__edit");
const profileName = page.querySelector(".profile__name");
const profileDesc = page.querySelector(".profile__desc");
const popupProfile = document.querySelector("#popupEdit");
const profileForm = popupProfile.querySelector(".popup__info")
const inputName = popupProfile.querySelector(".popup__input_edit_name");
const inputDescription = popupProfile.querySelector(".popup__input_edit_about");
const buttonAddCard = document.querySelector(".profile__add");
const popups = Array.from(document.querySelectorAll(".popup"));

function openProfileForm(){
  openModal(popupProfile);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDesc.textContent;
}

const openAddPlaceForm = (modal) => {
  placeInfo.reset();
  openModal(modal);
}

function submitProfileForm(evt){
  profileDesc.textContent = inputDescription.value;
  profileName.textContent = inputName.value;
  closeModal(popupProfile);
  evt.preventDefault();
};

popups.forEach((modal) =>{
  modal.addEventListener("click", function(evt){
    if(evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close")){
      closeModal(evt.currentTarget);
    }
  })
});

profileForm.addEventListener("submit", submitProfileForm);
profileEditBtn.addEventListener("click", openProfileForm);
buttonAddCard.addEventListener('click', () => openAddPlaceForm(popupAddPlace));

// CREATE CARDS
const gridList = document.querySelector(".grid__list");
const popupAddPlace = document.querySelector("#popupPlace");
const inputTitle = popupAddPlace.querySelector('.popup__input_edit_title');
const inputImage = popupAddPlace.querySelector('.popup__input_edit_image');
const placeInfo = popupAddPlace.querySelector("#placeInfo");
const cardSelector = "#grid-template";

const renderCard = (validationConfig) => {
	const card = new Card(validationConfig, cardSelector);
  return card.generateCard();
};

const createCard = (validationConfig, list) => {
  list.prepend(renderCard(validationConfig));
}

const submitAddCardForm = (evt) => {
  evt.preventDefault(); 
  createCard({ 
    name: inputTitle.value, 
    link: inputImage.value 
  }, gridList); 
  placeInfo.reset(); 
  closeModal(popupAddPlace); 
}; 

placeCards.forEach((place) => {
  createCard(place, gridList);
})

placeInfo.addEventListener("submit", submitAddCardForm); 

// FORM VALIDATION 
const data = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active"
}

const profileFormValidate = new FormValidator(data, profileForm);
const placeFormValidate = new FormValidator(data, placeInfo);

profileFormValidate.enableValidation();
placeFormValidate.enableValidation();