import "./index.css";
import FormValidator from "../script/components/FormValidate.js";
import initialCards from "../script/utils/initial-cards.js";
import Card from "../script/components/Card.js";
import Section from "../script/components/Section.js";
import PopupWithForm from "../script/components/PopupWithForm.js";
import PopupWithImages from "../script/components/PopupWithImages.js";
import UserInfo from "../script/components/UserInfo.js";
import { 
  cardSelector, 
  profileEditBtn, 
  buttonAddCard,  
  profileDesc,
  profileName,
  validationConfig, 
  profileForm,
  inputName,
  inputDescription } from "../script/utils/constants.js";

//Profile Info

const userInfo = new UserInfo ({name: profileName, about: profileDesc})

const profilePopupForm = new PopupWithForm({
  handleFormSubmit: (info) => {
    userInfo.setUserInfo({name: info.name, about: info.about});
  }
}, "#popupEdit")

profilePopupForm.setEventListeners();

profileEditBtn.addEventListener("click", () =>{
  const profileInputs = userInfo.getUserInfo()
  inputName.value = profileInputs.name;
  inputDescription.value = profileInputs.about;
  profilePopupForm.open();
})

//Creating new Card
const imagePopup = new PopupWithImages("#popupImage");
imagePopup.setEventListeners();

const createList = new Section({data: initialCards, renderer: (item) => {
  const card = new Card({data: item, handleCardClick: () =>{
    imagePopup.open(item);
  }}, cardSelector)
  const cardElement = card.generateCard();
  createList.addItem(cardElement);
}}, ".grid__list");

const newPlace = new PopupWithForm({handleFormSubmit: (item) => {
  const newCard = new Card({data: { name: item.title, link: item.imageUrl }, handleCardClick: () =>{
    imagePopup.open( {name: item.title, link: item.imageUrl} );
  }}, cardSelector)
  const cardElement = newCard.generateCard();
  createList.addItem(cardElement);
}}, "#popupPlace")

newPlace.setEventListeners();

buttonAddCard.addEventListener("click", () => {
  newPlace.open();
})

createList.renderItems();

// FORM VALIDATION 
const profileFormValidate = new FormValidator(validationConfig, profileForm);
const placeFormValidate = new FormValidator(validationConfig, placeInfo);

profileFormValidate.enableValidation();
placeFormValidate.enableValidation();
