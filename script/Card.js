function openModal(modal){
  modal.classList.add("popup_opened");
  window.addEventListener("keydown", keyHandler);
}

function closeModal(modal){
    modal.classList.remove("popup_opened");
    window.removeEventListener("keydown", keyHandler);
  };

function keyHandler(evt){
  if(evt.key === "Escape"){
    const popupOpened = document.querySelector(".popup_opened");
    closeModal(popupOpened);
  }
};


class Card {
    constructor(data, cardSelector){
        this._name = data.name;
        this._link = data.link;

        this._cardSelector = cardSelector;
    }

    _getTemplate(){
      const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector(".grid-item")
      .cloneNode(true);
    
      return cardElement;
    }

    _imageLike(){
        this._card.querySelector(".grid-item__like").classList.toggle("grid-item__like_active");
    }

    _imageTrash(){
        this._card.remove();
    }

    _imagePopup(){
        const imageContainer = document.querySelector(".popup__image-container");
        const popupImageContent = imageContainer.querySelector(".popup__image-content");
        const popupImageText =  imageContainer.querySelector(".popup__image-text");
        popupImageContent.src = this._link;
        popupImageText.textContent = this._name;
        popupImageContent.alt = this._name;
        
        openModal(popupImage);
    }


    _setEventListeners(){
        const _likeButton = this._card.querySelector(".grid-item__like");
        const _trashButton = this._card.querySelector(".grid-item__trash");
        const _imageElement = this._card.querySelector(".grid-item__img");

        _imageElement.addEventListener("click", () => {
        this._imagePopup();
        })
        _trashButton.addEventListener("click", (evt) => {
        this._imageTrash(evt)
        });
        _likeButton.addEventListener("click", (evt) => {
        this._imageLike(evt)
        });
    }

    generateCard(){
        this._card = this._getTemplate();
        this._setEventListeners();

        this._card.querySelector(".grid-item__img").src = this._link;
        this._card.querySelector(".grid-item__text").textContent = this._name;
        this._card.querySelector(".grid-item__text").alt = this._name;

        return this._card;
    }
}

export default Card