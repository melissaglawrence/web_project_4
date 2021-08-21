import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({handleFormSubmit}, popupSelector ){
    super(popupSelector);
    this._formSelector = this._popupElement.querySelector(".popup__info");
    this._handleFormSubmit = handleFormSubmit;
  }
  close(){
    this._formSelector.reset();
    super.close();
  }
  _getInputValues(){
    this._inputList = this._formSelector.querySelectorAll(".popup__input");
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    })

    return this._inputValues;
  }
  setEventListeners(){
    this._formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    })
    super.setEventListeners();
  }
}