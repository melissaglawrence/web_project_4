import { baseUrl } from "../utils/constants";
import Api from "./api";

const api = new Api(baseUrl);

export default class Card {
  constructor(
    { data, handleCardClick, handleCardLike, handleCardDelete },
    userId,
    cardSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;

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
    this._likeCounter = this._card.querySelector(".grid-item__like-counter");
    this._card
      .querySelector(".grid-item__like")
      .classList.toggle("grid-item__like_active");
    this._handleCardLike(this._id, this._likeButton, this._likeCounter);
  };
  _isLiked() {
    const _likesArr = Array.from(this._likes);
    _likesArr.some((like) => {
      if (like._id === this._userId) {
        this._likeButton.classList.add("grid-item__like_active");
      }
    });
  }
  _deleteCardIcon() {
    if (this._userId === this._ownerId) {
      this._card
        .querySelector(".grid-item__trash")
        .classList.add("grid-item__trash_active");
    }
  }
  deleteUserCard = () => {
    this._card.remove();
    this._card = null;
  };
  _setEventListeners() {
    this._likeButton = this._card.querySelector(".grid-item__like");
    this._trashButton = this._card.querySelector(".grid-item__trash");
    this._imageElement = this._card.querySelector(".grid-item__img");

    this._imageElement.addEventListener("click", this._handleCardClick);
    this._trashButton.addEventListener("click", () => {
      this._handleCardDelete(this._id);
    });
    this._likeButton.addEventListener("click", this._likeCard);
  }
  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();
    this._likeCounter = this._card.querySelector(
      ".grid-item__like-counter"
    ).textContent = this._likes.length;
    this._deleteCardIcon();
    this._isLiked();
    const cardImage = this._card.querySelector(".grid-item__img");
    this._card.querySelector(".grid-item__text").textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    return this._card;
  }
}
