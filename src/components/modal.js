// функция открытия модального окна
export const openModal = popup => {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', handleCloseModalByOverlayClick);
  document.addEventListener('keydown', handleCloseModalByEscape);
};

// функция закрытия модального окна
export const closeModal = popup => {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', handleCloseModalByOverlayClick);
  document.removeEventListener('keydown', handleCloseModalByEscape);
};

// функция закрытия модального окна кликом 
const handleCloseModalByOverlayClick = evt => {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
};

// функция закрытия модального окна по клавише Esc
const handleCloseModalByEscape = evt => {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
};

