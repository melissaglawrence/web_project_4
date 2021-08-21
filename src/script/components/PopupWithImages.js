import Popup from "./Popup.js";

export default class PopupWithImages extends Popup {

  open({ name, link }){
    const image = this._popupElement.querySelector(".popup__image-content");
    image.src = link;
    image.alt = name;
    this._popupElement.querySelector(".popup__image-text").textContent = name;
    super.open();
  }
}