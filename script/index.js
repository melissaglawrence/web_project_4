import FormValidator from "./FormValidate.js";
import placeCards from "./initial-cards.js";
import Card from "./Card.js";



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

function openModal(modal){
  modal.classList.add("popup_opened");
  window.addEventListener("keydown", keyHandler);
}

function addPlaceForm(modal){
  placeInfo.reset();
  openModal(modal)
}

function keyHandler(evt){
  if(evt.key === "Escape"){
    const popupOpened = document.querySelector(".popup_opened");
    closeModal(popupOpened);
  }
};

function closeModal(modal){
  modal.classList.remove("popup_opened");
  window.removeEventListener("keydown", keyHandler);
};

function openProfileForm(){
  openModal(popupProfile);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDesc.textContent;
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

buttonAddCard.addEventListener('click', () => addPlaceForm(popupAddPlace));
profileForm.addEventListener("submit", submitProfileForm);
profileEditBtn.addEventListener("click", openProfileForm);




//CREATE CARD CLASSES
const gridList = document.querySelector(".grid__list");
const popupAddPlace = document.querySelector("#popupPlace");
const inputTitle = popupAddPlace.querySelector('.popup__input_edit_title');
const inputImage = popupAddPlace.querySelector('.popup__input_edit_image');
const placeInfo = popupAddPlace.querySelector("#placeInfo");
const cardSelector = "#grid-template";


const renderCard = (data, list) => {
	const card = new Card(data, cardSelector);
  list.prepend(card.generateCard());
};


const renderNewCard = () => {
  placeInfo.addEventListener("submit", function(evt){
    evt.preventDefault();
    renderCard({
      name: inputTitle.value,
      link: inputImage.value
    }, gridList);
    placeInfo.reset();
    closeModal(popupAddPlace);
  });
}

placeCards.forEach((place) => {
  renderCard(place, gridList);
});

renderNewCard();

//FORM VALIDATION CLASSES

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