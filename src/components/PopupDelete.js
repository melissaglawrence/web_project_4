import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor({ deleteSubmit }, popupSelector) {
    super(popupSelector);
    this._deleteSubmit = deleteSubmit;
    this._form = this._popupElement.querySelector(".popup__info");
  }
  setEventListeners(id) {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._deleteSubmit(id);
    });
    super.setEventListeners();
  }
}
