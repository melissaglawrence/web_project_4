const openModal = (modal) => {
  modal.classList.add("popup_opened");
  window.addEventListener("keydown", keyHandler);
}

const closeModal = (modal) => {
    modal.classList.remove("popup_opened");
    window.removeEventListener("keydown", keyHandler);
  };

const keyHandler = (evt) => {
  if(evt.key === "Escape"){
    const popupOpened = document.querySelector(".popup_opened");
    closeModal(popupOpened);
  }
};

export {openModal, closeModal, keyHandler}