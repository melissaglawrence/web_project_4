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

//CARDS
export const buttonAddCard = document.querySelector(".profile__add");
export const cardSelector = "#grid-template";
export const popupImage = "#popupImage";
export const gridList = ".grid__list";
export const popupAddPlace = "#popupPlace";
