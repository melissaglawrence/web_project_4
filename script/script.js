let main = document.querySelector(".main");
let edit = main.querySelector(".profile__edit");
let profileName = main.querySelector(".profile__name");
let profileDesc = main.querySelector(".profile__desc");
let form = document.querySelector(".form");
let formName = form.querySelector(".form__name");
let formDesc = form.querySelector(".form__desc");
let close = form.querySelector(".close");
let save = form.querySelector(".form__save");

function popup(evt){
    formName.value = profileName.textContent;
    formDesc.value = profileDesc.textContent;
    form.classList.remove("visable");
    main.setAttribute("style", "opacity:50%;");
    evt.preventDefault();
}

function closeForm(evt){
evt.preventDefault();
form.classList.add("visable");
main.setAttribute("style", "opactiy:100%;");
}

function saveForm(evt){
profileDesc.textContent = formDesc.value;
profileName.textContent = formName.value;
form.classList.add("visable");
main.setAttribute("style", "opactiy:100%;");
evt.preventDefault();
}

save.addEventListener("click", saveForm);
close.addEventListener("click", closeForm);
edit.addEventListener("click", popup);