const page = document.querySelector(".page");
const profileEditBtn = page.querySelector(".profile__edit");
const profileName = page.querySelector(".profile__name");
const profileDesc = page.querySelector(".profile__desc");
const popupProfile = document.querySelector("#popupEdit");
const profileForm = popupProfile.querySelector(".popup__info")
const popupName = popupProfile.querySelector(".popup__input_edit_name");
const popupDesc = popupProfile.querySelector(".popup__input_edit_about");
const profilePopupCloseBtn = popupProfile.querySelector(".popup__close");
const placePopup = document.querySelector("#popupPlace");
const closePlaceBtn = placePopup.querySelector(".popup__close");
const placeInfo = placePopup.querySelector("#placeInfo");
const popupAddCard = document.querySelector(".profile__add");
const image = document.querySelector(".image"); 
const imageClose = image.querySelector(".image__close");
const popup = document.querySelector(".popup");


function openModal(modal){
  modal.classList.remove("popup_hidden");
  resetForm();
}

function closeModal(modal){
  modal.classList.add("popup_hidden");
};

function openProfileForm(){
  openModal(popupProfile);
  popupName.value = profileName.textContent;
  popupDesc.value = profileDesc.textContent;
}

function submitProfileForm(evt){
  profileDesc.textContent = popupDesc.value;
  profileName.textContent = popupName.value;
  closeModal(popupProfile);
  evt.preventDefault();
};

function resetForm(){
  const forms = document.querySelectorAll(".popup__info");
  const inputs = document.querySelectorAll(".popup__input");
  inputs.forEach(function(inputBorder){
    inputBorder.classList.remove("popup__input_type_error");
  })
  forms.forEach(function(formInput){
    formInput.reset();
  })
  const errors = document.querySelectorAll(".popup__input-error");
  errors.forEach(function(err){
    err.textContent = "";
  })
}

const popups = Array.from(document.querySelectorAll(".popup"));
popups.forEach(function(modal){
  modal.addEventListener("click", function(evt){
    if(evt.target.classList.contains("popup")){
      evt.currentTarget.classList.add("popup_hidden");}
  })
});

window.addEventListener("keydown", function(evt){
  if(evt.key === "Escape"){
    image.classList.add("image_hidden");
    popups.forEach(function(modal){
      modal.classList.add("popup_hidden");
    })
  }
});


profilePopupCloseBtn.addEventListener('click', () => closeModal(popupProfile));
closePlaceBtn.addEventListener("click", () => closeModal(placePopup));
popupAddCard.addEventListener('click', () => openModal(placePopup));
profileForm.addEventListener("submit", submitProfileForm);
profileEditBtn.addEventListener("click", openProfileForm);


const placeCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

function createCard(place) {
  const gridTemp = document.querySelector("#grid-template").content;
  const gridItem = gridTemp.querySelector(".grid-item").cloneNode(true);
  const placeImage = gridItem.querySelector(".grid-item__img");
  const gridList = document.querySelector(".grid__list");
  const image = document.querySelector(".image"); 


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
    const imageContainer = image.querySelector(".image__container");
   
    imageContainer.querySelector(".image__content").src = place.link;
    imageContainer.querySelector(".image__text").textContent = place.name;
    if(evt.key === "Escape"){
      image.classList.remove("image_hidden");
    }
    image.classList.remove("image_hidden");
    evt.preventDefault();
   
    return imageContainer; 
  });
  
  return gridItem;
};

placeCards.forEach(createCard);


image.addEventListener("click", function(evt){
  if(evt.target.classList.contains("image")){
    evt.currentTarget.classList.add("image_hidden");
  }
});

placeInfo.addEventListener("submit", function(evt){
  evt.preventDefault();
  const newPlace = {
    name: placePopup.querySelector('.popup__input_edit_title').value,
    link: placePopup.querySelector('.popup__input_edit_image').value
  }
  placeCards.unshift(newPlace);
  createCard(newPlace);
  placeInfo.reset();
  closeModal(placePopup);
});


