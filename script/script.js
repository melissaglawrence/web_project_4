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
const imageContainer = document.querySelector(".popup__image-container");
const popupInput = document.querySelector(".popup__input");
const saveButton = document.querySelectorAll(".popup__save");
const popups = Array.from(document.querySelectorAll(".popup"));

function openModal(modal){
  modal.classList.remove("popup_hidden");
  window.addEventListener("keydown", keyHandler);
}

 

function keyHandler(evt){
  if(evt.key === "Escape"){
    popups.forEach(function(modal){
      modal.classList.add("popup_hidden");
    })
  }
};


function closeModal(modal){
  modal.classList.add("popup_hidden");
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
    if(evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close")){
      closeModal(evt.currentTarget);}
  })
});

profilePopupCloseBtn.addEventListener('click', () => closeModal(popupProfile));
closePlaceBtn.addEventListener("click", () => closeModal(popupAddPlace));
buttonAddCard.addEventListener('click', () => openModal(popupAddPlace));
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
    const popupImage = document.querySelector(".popup__image");
    imageContainer.querySelector(".popup__image-content").src = place.link;
    imageContainer.querySelector(".popup__image-text").textContent = place.name;
    imageContainer.querySelector(".popup__image-content").alt = place.name;
    
    openModal(popupImage);
    evt.preventDefault();
  });
  
  return gridItem;
};

placeCards.forEach(createCard);


placeInfo.addEventListener("submit", function(evt){
  evt.preventDefault();
  const nameInput = popupAddPlace.querySelector('.popup__input_edit_title').value;
  const imageInput = popupAddPlace.querySelector('.popup__input_edit_image').value;
  const newPlace = {
    name: nameInput,
    link: imageInput
  }
  createCard(newPlace);
  placeInfo.reset();
  closeModal(popupAddPlace);
});