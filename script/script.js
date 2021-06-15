let page = document.querySelector(".page");
let edit = page.querySelector(".profile__edit");
let profileName = page.querySelector(".profile__name");
let profileDesc = page.querySelector(".profile__desc");
let form = document.querySelector(".form");
let formName = form.querySelector(".form__name");
let formDesc = form.querySelector(".form__desc");
let closeBttn = form.querySelector(".close");
let save = form.querySelector(".form__save");

function popup(evt){
    formName.value = profileName.textContent;
    formDesc.value = profileDesc.textContent;
    form.classList.remove("visable");
    evt.preventDefault();
}

function closeForm(evt){
    evt.preventDefault();
    form.classList.add("visable");
}

function saveForm(evt){
    profileDesc.textContent = formDesc.value;
    profileName.textContent = formName.value;
    form.classList.add("visable");
    evt.preventDefault();
}

save.addEventListener("click", saveForm);
closeBttn.addEventListener("click", closeForm);
edit.addEventListener("click", popup);