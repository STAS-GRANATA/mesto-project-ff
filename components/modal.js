//Функция открывает попап
function openPopup(popup) {
  popup.classList.add('popup_is-opened'); 
  document.addEventListener('keydown', closeByEsc);
}

// Функция закрывает попап по клику на оверлей
function closePopupByOverlay(event) {
  if (event.target.classList.contains('popup')) {
    closePopup(event.target); 
  }
}

//Функция закрывает попап по нажатию клавиши Esc
function closeByEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

//Функция закрывает попап
function closePopup(popup) {
  popup.classList.remove('popup_is-opened'); 
  document.removeEventListener('click', closePopupByOverlay); 
  document.removeEventListener('keydown', closeByEsc);
}

export {openPopup, closePopup, closePopupByOverlay};