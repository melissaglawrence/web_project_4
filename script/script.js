let page = document.querySelector(".page");
let edit = page.querySelector(".profile__edit");
let profileName = page.querySelector(".profile__name");
let profileDesc = page.querySelector(".profile__desc");
let popup = document.querySelector("#popup__edit");
let popupInfo = popup.querySelector(".popup__info")
let popupName = popup.querySelector(".popup__input_edit_name");
let popupDesc = popup.querySelector(".popup__input_edit_about");
let closeBtn = popup.querySelector(".popup__close");
let placePop = document.querySelector("#popup__place");
let closePlaceBtn = placePop.querySelector(".popup__close");
let profileAdd = document.querySelector(".profile__add");


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

function placeAdd(evt){
  placePop.classList.remove("popup_opened");
  evt.preventDefault();

}

function placeClose(evt){
    placePop.classList.add("popup_opened");
    evt.preventDefault();
}


popupInfo.addEventListener("submit", saveForm);
closeBtn.addEventListener("click", closeForm);
edit.addEventListener("click", popupForm);
closePlaceBtn.addEventListener("click", placeClose);
profileAdd.addEventListener("click", placeAdd);


const initialCards = [
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

let placeCards = Array.from(initialCards);

let placeInfo = placePop.querySelector(".place__info");
let gridList = document.querySelector(".grid__list");

function createCard(place) {
  const gridTemp = document.querySelector("#grid-template").content;
  const gridItem = gridTemp.querySelector(".grid-item").cloneNode(true);
  const placeImage = gridItem.querySelector(".grid-item__img");

  gridItem.querySelector(".grid-item__text").textContent = place.name;
  placeImage.src = place.link;

  gridItem.querySelector(".grid-item__like").addEventListener("click", function(evt){
    evt.target.classList.toggle("grid-item__like_active");
  });

  gridItem.querySelector(".grid-item__trash").addEventListener("click", function(evt){
      evt.target.parentElement.remove();
  })

  let image = document.querySelector(".image"); 
  let imageClose = image.querySelector(".image__close"); 

  placeImage.addEventListener("click", function (evt){ 
    let imageContainer = image.querySelector(".image__container");
   
    let evtImage = evt.currentTarget.src; 
    let evtText = evt.currentTarget.parentElement.textContent;

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



function displayCards(){
  placeCards.forEach(function(place) {
  gridList.append(createCard(place));
});
};

function displayNew(){
  placeInfo.addEventListener("submit", function(evt) {
  const newPlace = {
    name: placePop.querySelector('.popup__input_edit_title').value,
    link: placePop.querySelector('.popup__input_edit_image').value
  }
  placeCards.unshift(newPlace);
  placePop.classList.add("popup_opened");
  evt.preventDefault();
  return placeCards;
  });
}

displayCards();

