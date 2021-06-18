let page = document.querySelector(".page");
let edit = page.querySelector(".profile__edit");
let profileName = page.querySelector(".profile__name");
let profileDesc = page.querySelector(".profile__desc");
let popup = document.querySelector(".popup");
let popupInfo = popup.querySelector(".popup__info")
let popupName = popup.querySelector(".popup__input_edit_name");
let popupDesc = popup.querySelector(".popup__input_edit_about");
let closeBttn = popup.querySelector(".popup__close");

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

popupInfo.addEventListener("submit", saveForm);
closeBttn.addEventListener("click", closeForm);
edit.addEventListener("click", popupForm);