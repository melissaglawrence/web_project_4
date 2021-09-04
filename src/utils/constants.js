//FORM VALIDATION
export const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};
export const placeInfo = document.querySelector("#placeInfo");
export const profileForm = document.querySelector(".popup__info");

//PROFILE
export const profileName = ".profile__name";
export const profileDesc = ".profile__desc";
export const profileEditBtn = document.querySelector(".profile__edit");
export const inputName = document.querySelector(".popup__input_edit_name");
export const inputDescription = document.querySelector(
  ".popup__input_edit_about"
);
export const popupProfile = "#popupEdit";
export const pictureEdit = document.querySelector("#profilePictureInfo");
export const profileEditForm = document.querySelector("#profileInfo");

//CARDS
export const addCardBtn = document.querySelector(".profile__add");
export const addPlace = document.querySelector("#placeInfo");
export const cardSelector = "#grid-template";
export const popupImage = "#popupImage";
export const gridList = ".grid__list";
export const popupAddPlace = "#popupPlace";
export const popupTrash = document.querySelector("#popupTrash");
export const trashInfo = document.querySelector("#trashInfo");
export const profileImageContainer = document.querySelector(".profile__img");
export const profileImage = document.querySelector(".profile__img__content");
export const baseUrl = "https://around.nomoreparties.co/v1/group-10";
export const cardTitleInput = document.querySelector(
  ".popup__input_edit_title"
);
export const cardImageInput = document.querySelector(
  ".popup__input__edit_image"
);
export const gridTrashItem = document.querySelector(".grid-item__trash_active");
export const userId = "aaddffb00a18a05d24c43b7a";
