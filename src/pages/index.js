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
  trashInfo,
  authToken,
} from "../utils/constants.js";

const api = new Api(baseUrl, authToken);

function renderLoading(isLoading, formElement, text) {
  const saveButton = formElement.querySelector(".popup__save");
  if (isLoading) {
    saveButton.textContent = text;
  } else {
    saveButton.textContent = text;
  }
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    document.querySelector(profileName).textContent = userData.name;
    document.querySelector(profileDesc).textContent = userData.about;
    profileImage.src = userData.avatar;
    const userId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
    });

    const cardList = new Section(
      {
        renderer: (item) => {
          const card = new Card(
            {
              data: item,
              handleCardClick: () => {
                imagePopup.open(item);
              },
              handleCardLike: (id, likeButton, likeCounter) => {
                if (likeButton.classList.contains("grid-item__like_active")) {
                  api.addLike(id).then((res) => {
                    likeCounter.textContent = res.likes.length;
                  });
                } else {
                  api.removeLike(id).then((res) => {
                    likeCounter.textContent = res.likes.length;
                  });
                }
              },
              handleCardDelete: (item, id) => {
                popupDelete.open(item, id);
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
    cardList.renderItems(initialCards);
    const imagePopup = new PopupWithImage(popupImage);
    imagePopup.setEventListeners();

    newPlace.setEventListeners();

    addCardBtn.addEventListener("click", () => {
      newPlace.open();
    });
  })
  .catch((err) => {
    console.log(err);
  });

const popupDelete = new PopupDelete(
  {
    handleDeleteSubmit: (card, id) => {
      renderLoading(true, trashInfo, "Deleteing..");
      api
        .deleteCard(id)
        .then(() => {
          card.remove();
          popupDelete.close();
          renderLoading(true, trashInfo, "Yes");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  "#popupTrash"
);

popupDelete.setEventListeners();

//NEW AVATAR
const editAvatar = new PopupWithForm(
  {
    handleFormSubmit: (info) => {
      renderLoading(true, pictureEdit, "Saving...");

      api
        .userAvatar({ avatar: info.profileUrl })
        .then((res) => {
          res.avatar = info.profileUrl;
          profileImage.src = info.profileUrl;
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
        userInfo.setUserInfo({ name: info.name, about: info.about });
        profilePopupForm.close();
        renderLoading(true, profileEditForm, "Save");
      });
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

// FORM VALIDATION
const profileFormValidate = new FormValidator(validationConfig, profileForm);
const placeFormValidate = new FormValidator(validationConfig, placeInfo);

profileFormValidate.enableValidation();
placeFormValidate.enableValidation();
