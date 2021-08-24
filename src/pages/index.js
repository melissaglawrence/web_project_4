import "./index.css";
import FormValidator from "../components/FormValidator.js";
import initialCards from "../utils/initial-cards.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  cardSelector,
  profileEditBtn,
  buttonAddCard,
  profileDesc,
  profileName,
  validationConfig,
  profileForm,
  inputName,
  inputDescription,
  popupAddPlace,
  gridList,
  popupImage,
  popupProfile,
} from "../utils/constants.js";

//Profile Info
const userInfo = new UserInfo({
  nameSelector: profileName,
  aboutSelector: profileDesc,
});

const profilePopupForm = new PopupWithForm(
  {
    handleFormSubmit: (info) => {
      userInfo.setUserInfo({ name: info.name, about: info.about });
      profilePopupForm.close();
    },
  },
  popupProfile
);

profilePopupForm.setEventListeners();

profileEditBtn.addEventListener("click", () => {
  const profileInputs = userInfo.getUserInfo();
  inputName.value = profileInputs.name;
  inputDescription.value = profileInputs.about;
  profilePopupForm.open();
});

//Creating new Card
const imagePopup = new PopupWithImage(popupImage);
imagePopup.setEventListeners();

const cardList = new Section(
  {
    renderer: (item) => {
      const card = new Card(
        {
          data: item,
          handleCardClick: () => {
            imagePopup.open(item);
          },
        },
        cardSelector
      );
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  gridList
);

const newPlace = new PopupWithForm(
  {
    handleFormSubmit: (item) => {
      const newCards = [{ name: item.title, link: item.imageUrl }];
      cardList.renderItems(newCards);
      newPlace.close();
    },
  },
  popupAddPlace
);

newPlace.setEventListeners();

buttonAddCard.addEventListener("click", () => {
  newPlace.open();
});

cardList.renderItems(initialCards);

// FORM VALIDATION
const profileFormValidate = new FormValidator(validationConfig, profileForm);
const placeFormValidate = new FormValidator(validationConfig, placeInfo);

profileFormValidate.enableValidation();
placeFormValidate.enableValidation();
