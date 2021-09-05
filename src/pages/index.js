import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupDelete from "../components/PopupDelete";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/api";
import {
  cardSelector,
  profileEditBtn,
  addCardBtn,
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
  baseUrl,
  addPlace,
  profileImage,
  pictureEdit,
  profileImageContainer,
  profileEditForm,
  userId,
  trashInfo,
} from "../utils/constants.js";

const api = new Api(baseUrl);

api.getUserInfo().then((res) => {
  document.querySelector(profileName).textContent = res.name;
  document.querySelector(profileDesc).textContent = res.about;
  profileImage.src = res.avatar;
  userInfo.setUserInfo({
    name: res.name,
    about: res.about,
  });
});

function renderLoading(isLoading, formElement, text) {
  const saveButton = formElement.querySelector(".popup__save");
  if (isLoading) {
    saveButton.textContent = text;
  } else {
    saveButton.textContent = text;
  }
}

//NEW AVATAR
const editAvatar = new PopupWithForm(
  {
    handleFormSubmit: (info) => {
      renderLoading(true, pictureEdit, "Saving...");
      profileImage.src = info.profileUrl;
      api
        .userAvatar({ avatar: info.profileUrl })
        .then((res) => {
          res.avatar = info.profileUrl;
          editAvatar.close();
          renderLoading(false, pictureEdit, "Save");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  "#popupProfilePicture"
);

editAvatar.setEventListeners();

profileImageContainer.addEventListener("click", () => {
  editAvatar.open();
});

//Profile Info
const userInfo = new UserInfo({
  nameSelector: profileName,
  aboutSelector: profileDesc,
});

const profilePopupForm = new PopupWithForm(
  {
    handleFormSubmit: (info) => {
      renderLoading(true, profileEditForm, "Saving...");
      api.updateUserInfo(info).then(() => {
        profilePopupForm.close();
        renderLoading(true, profileEditForm, "Save");
      });
      userInfo.setUserInfo({ name: info.name, about: info.about });
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

//CARD FUNCTIONALITY
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
          handleCardDelete: (id) => {
            const popupDelete = new PopupDelete(
              {
                deleteSubmit: (id) => {
                  renderLoading(true, trashInfo, "Deleteing...");
                  api
                    .deleteCard(id)
                    .then(() => {
                      renderLoading(false, trashInfo, "Yes");
                      card.deleteUserCard();
                      popupDelete.close();
                      console.log(id);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                },
              },
              "#popupTrash"
            );
            popupDelete.setEventListeners(id);
            popupDelete.open();
          },
        },
        userId,
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
      renderLoading(true, addPlace, "Saving...");
      api
        .createNewCard({ name: item.name, link: item.link })
        .then((res) => {
          cardList.renderItems([res]);
          newPlace.close();
          renderLoading(false, addPlace, "Create");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  popupAddPlace
);

newPlace.setEventListeners();

addCardBtn.addEventListener("click", () => {
  newPlace.open();
});

api
  .getInitialCards()
  .then((res) => {
    cardList.renderItems(res);
  })
  .catch((err) => {
    console.log(err);
  });

// FORM VALIDATION
const profileFormValidate = new FormValidator(validationConfig, profileForm);
const placeFormValidate = new FormValidator(validationConfig, placeInfo);

profileFormValidate.enableValidation();
placeFormValidate.enableValidation();
