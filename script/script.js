const page = document.querySelector(".page");
const profileEditBtn = page.querySelector(".profile__edit");
const profileName = page.querySelector(".profile__name");
const profileDesc = page.querySelector(".profile__desc");
const popupProfile = document.querySelector("#popupEdit");
const profileForm = popupProfile.querySelector(".popup__info")
const inputName = popupProfile.querySelector(".popup__input_edit_name");
const inputDescription = popupProfile.querySelector(".popup__input_edit_about");
const profilePopupCloseBtn = popupProfile.querySelector(".popup__close");
const popupAddPlace = document.querySelector("#popupPlace");
const closePlaceBtn = popupAddPlace.querySelector(".popup__close");
const placeInfo = popupAddPlace.querySelector("#placeInfo");
const buttonAddCard = document.querySelector(".profile__add");
const popup = document.querySelector(".popup");
const popupInput = document.querySelector(".popup__input");
const saveButton = document.querySelectorAll(".popup__save");
const popups = Array.from(document.querySelectorAll(".popup"));
const popupImage = document.querySelector("#popup__image");
const imageContainer = document.querySelector(".popup__image-container");
const popupImageContent = imageContainer.querySelector(".popup__image-content");
const popupImageText =  imageContainer.querySelector(".popup__image-text");
const inputTitle = popupAddPlace.querySelector('.popup__input_edit_title');
const inputImage = popupAddPlace.querySelector('.popup__input_edit_image');
const forms = document.querySelectorAll(".popup__info");


function openModal(modal){
  modal.classList.add("popup_opened");
  window.addEventListener("keydown", keyHandler);
  }


function addPlaceForm(modal){
  placeInfo.reset();
  openModal(modal)
}


function keyHandler(evt){
  if(evt.key === "Escape"){
    const popupOpened = document.querySelector(".popup_opened");
    closeModal(popupOpened);
  }
};

function closeModal(modal){
    modal.classList.remove("popup_opened");
    window.removeEventListener("keydown", keyHandler);
  };

function openProfileForm(){
  openModal(popupProfile);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDesc.textContent;
}

function submitProfileForm(evt){
  profileDesc.textContent = inputDescription.value;
  profileName.textContent = inputName.value;
  closeModal(popupProfile);
  evt.preventDefault();
};


popups.forEach((modal) =>{
  modal.addEventListener("click", function(evt){
    if(evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close")){
      closeModal(evt.currentTarget);}
  })
});

buttonAddCard.addEventListener('click', () => addPlaceForm(popupAddPlace));
profileForm.addEventListener("submit", submitProfileForm);
profileEditBtn.addEventListener("click", openProfileForm);


function createCard(place) {
  const gridTemp = document.querySelector("#grid-template").content;
  const gridItem = gridTemp.querySelector(".grid-item").cloneNode(true);
  const placeImage = gridItem.querySelector(".grid-item__img");
  const gridList = document.querySelector(".grid__list");

  gridItem.querySelector(".grid-item__text").textContent = place.name;
  placeImage.src = place.link;
  gridList.prepend(gridItem);


  gridItem.querySelector(".grid-item__like").addEventListener("click", function(evt){
    evt.target.classList.toggle("grid-item__like_active");
  });

  gridItem.querySelector(".grid-item__trash").addEventListener("click", function(evt){
      evt.target.parentElement.remove();
  });

  placeImage.addEventListener("click", function (evt){ 

    popupImageContent.src = place.link;
    popupImageText.textContent = place.name;
    popupImageContent.alt = place.name;
    
    openModal(popupImage);
    evt.preventDefault();
  });
  
  return gridItem;
};

placeCards.forEach(createCard);


placeInfo.addEventListener("submit", function(evt){
  evt.preventDefault();
  const newPlace = {
    name: inputTitle.value,
    link: inputImage.value
  }
  createCard(newPlace);
  placeInfo.reset();
  closeModal(popupAddPlace);
});