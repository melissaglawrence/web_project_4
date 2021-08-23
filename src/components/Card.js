export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;

    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".grid-item")
      .cloneNode(true);

    return cardElement;
  }
  _likeCard = () => {
    this._card
      .querySelector(".grid-item__like")
      .classList.toggle("grid-item__like_active");
  };
  _deleteCard = () => {
    this._card.remove();
    this._card = null;
  };

  _setEventListeners() {
    const _likeButton = this._card.querySelector(".grid-item__like");
    const _trashButton = this._card.querySelector(".grid-item__trash");
    const _imageElement = this._card.querySelector(".grid-item__img");

    _imageElement.addEventListener("click", this._handleCardClick);
    _trashButton.addEventListener("click", this._deleteCard);
    _likeButton.addEventListener("click", this._likeCard);
  }
  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._card.querySelector(".grid-item__img");
    this._card.querySelector(".grid-item__text").textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    return this._card;
  }
}
