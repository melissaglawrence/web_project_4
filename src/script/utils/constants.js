export const page = document.querySelector(".page");
export const profileEditBtn = page.querySelector(".profile__edit");
export const profileName = ".profile__name";
export const profileDesc = ".profile__desc";
export const popupProfile = document.querySelector("#popupEdit");
export const profileForm = popupProfile.querySelector(".popup__info")
export const inputName = popupProfile.querySelector(".popup__input_edit_name");
export const inputDescription = popupProfile.querySelector(".popup__input_edit_about");
export const buttonAddCard = document.querySelector(".profile__add");
export const popups = Array.from(document.querySelectorAll(".popup"));
export const saveButton = document.querySelector(".popup__save");

export const gridList = document.querySelector(".grid__list");
export const popupAddPlace = document.querySelector("#popupPlace");
export const inputTitle = popupAddPlace.querySelector('.popup__input_edit_title');
export const inputImage = popupAddPlace.querySelector('.popup__input_edit_image');
export const placeInfo = popupAddPlace.querySelector("#placeInfo");
export const cardSelector = "#grid-template";
export const popupImage = document.querySelector("#popupImage");
export const popupImageContent = document.querySelector(".popup__image-content");
export const popupImageText = document.querySelector(".popup__image-text");
export const imageContainer = document.querySelector(".popup__image-container");

export const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active"
}
