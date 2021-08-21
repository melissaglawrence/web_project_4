export default class Card {
  constructor({ data, handleCardClick }, cardSelector){
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;

    this._cardSelector = cardSelector;
  }
  _getTemplate(){
    const cardElement = document.querySelector(this._cardSelector)
    .content.querySelector(".grid-item").cloneNode(true);
    
    return cardElement;
  }
  _likeCard(){
    this._card.querySelector(".grid-item__like").classList.toggle("grid-item__like_active");
  }
  _deleteCard(){
    this._card.remove();
  }
  _setEventListeners(){
    const _likeButton = this._card.querySelector(".grid-item__like");
    const _trashButton = this._card.querySelector(".grid-item__trash");
    const _imageElement = this._card.querySelector(".grid-item__img");

    _imageElement.addEventListener("click", () => {
      this._handleCardClick();
    })
    _trashButton.addEventListener("click", (evt) => {
      this._deleteCard(evt)
    });
     _likeButton.addEventListener("click", (evt) => {
      this._likeCard(evt)
    });
  }
  generateCard(){
    this._card = this._getTemplate();
    this._setEventListeners();

    this._card.querySelector(".grid-item__img").src = this._link;
    const cardText = this._card.querySelector(".grid-item__text");
    cardText.textContent = this._name;
    cardText.alt = this._name;
    return this._card;

  }
}