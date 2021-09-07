import Popup from "./Popup";

export default class PopupDelete extends Popup {
  constructor({ handleDeleteSubmit }, popupSelector) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".popup__info");
    this._handleDeleteSubmit = handleDeleteSubmit;
  }

  open(card, cardId) {
    super.open();
    this._cardId = cardId;
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleDeleteSubmit(this._card, this._cardId);
    });
  }
}
