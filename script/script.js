const page = document.querySelector(".page");
const edit = page.querySelector(".profile__edit");
const profileName = page.querySelector(".profile__name");
const profileDesc = page.querySelector(".profile__desc");
const popup = document.querySelector("#popupEdit");
const popupInfo = popup.querySelector(".popup__info")
const popupName = popup.querySelector(".popup__input_edit_name");
const popupDesc = popup.querySelector(".popup__input_edit_about");
const closeBtn = popup.querySelector(".popup__close");
const placePop = document.querySelector("#popupPlace");
const closePlaceBtn = placePop.querySelector(".popup__close");
const profileAdd = document.querySelector(".profile__add");


function popupForm(){
  popupName.value = profileName.textContent;
  popupDesc.value = profileDesc.textContent;
  popup.classList.remove("popup_opened");
}

function closeForm(){
  popup.classList.add("popup_opened");
}

function saveForm(evt){
  profileDesc.textContent = popupDesc.value;
  profileName.textContent = popupName.value;
  popup.classList.add("popup_opened");
  evt.preventDefault();
}

function placeAdd(){
  placePop.classList.remove("popup_opened");
}

function placeClose(){
  placePop.classList.add("popup_opened");
}


popupInfo.addEventListener("submit", saveForm);
closeBtn.addEventListener("click", closeForm);
edit.addEventListener("click", popupForm);
closePlaceBtn.addEventListener("click", placeClose);
profileAdd.addEventListener("click", placeAdd);


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

const placeInfo = placePop.querySelector("#placeInfo");
const gridList = document.querySelector(".grid__list");
const image = document.querySelector(".image"); 
const imageClose = image.querySelector(".image__close");

function createCard(place) {
  const gridTemp = document.querySelector("#grid-template").content;
  const gridItem = gridTemp.querySelector(".grid-item").cloneNode(true);
  const placeImage = gridItem.querySelector(".grid-item__img");

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
   
    const evtImage = evt.currentTarget.src; 
    const evtText = evt.currentTarget.parentElement.textContent;

    imageContainer.querySelector(".image__content").src = evtImage;
    imageContainer.querySelector(".image__text").textContent = evtText;
    image.classList.remove("image_hidden");
    evt.preventDefault();
   
    return imageContainer; 
  });
  

  imageClose.addEventListener("click", function(){
    image.classList.add("image_hidden");
  });
  

  return gridItem;
};

placeCards.forEach(createCard);


placeInfo.addEventListener("submit", function(evt) {
  const newPlace = {
    name: placePop.querySelector('.popup__input_edit_title').value,
    link: placePop.querySelector('.popup__input_edit_image').value
  }
  placeCards.unshift(newPlace);
  createCard(newPlace);
  evt.preventDefault();
  placeInfo.reset();
  placePop.classList.add("popup_opened");
});


