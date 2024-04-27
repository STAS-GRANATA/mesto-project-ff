import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, handleClickLike } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';


// объявление переменных

const cardsContainer = document.querySelector('.places__list');  // список карточек
const profileAddButton = document.querySelector('.profile__add-button'); // кнопка открытия попапа карточек 
const profileEditButton = document.querySelector('.profile__edit-button'); // кнопка открытия попапа профиля

const popupCard = document.querySelector('.popup_type_new-card'); // попап добавления новой карточки
const cardNameInput = popupCard.querySelector('.popup__input_type_card-name'); // название добавляемой карточки
const cardUrlInput = popupCard.querySelector('.popup__input_type_url'); // ссылка на добавляемую карточку

const popupImage = document.querySelector('.popup_type_image'); // попап полнораземного изображения
const popupFullImage = popupImage.querySelector('.popup__image'); // изображение в полном размере
const popupCaption = popupImage.querySelector('.popup__caption'); // подпись под изображением

const popupProfile = document.querySelector('.popup_type_edit'); // попап редактирования профиля
const nameInput = document.querySelector('.popup__input_type_name'); // вводимое имя в профиле
const jobInput = document.querySelector('.popup__input_type_description'); // вводимая работа в профиле

const popupList = document.querySelectorAll('.popup');
const popupCardForm = popupCard.querySelector('.popup__form'); 

const profileName = document.querySelector('.profile__title'); // профиль - имя
const profileJob = document.querySelector('.profile__description'); // профиль - работа

// выведение карточки на страницу 
initialCards.forEach(element => {
  const card = createCard(element, deleteCard, handleClickLike, openImagePopup);
  cardsContainer.append(card);
}); 

// функция открытия модального окна с полноразмерным изображением карточки
function openImagePopup(cardData) {
  popupFullImage.src = cardData.link;
  popupFullImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(popupImage);
};

// редактирование имени и информации о себе
const handleEditProfileFormSubmit = evt => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(popupProfile);
};

// добавление карточки
const handleAddCardFormSubmit = evt => {
  evt.preventDefault();

  const card = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
  };

  cardsContainer.prepend(createCard(card, deleteCard, handleClickLike, openImagePopup));
  popupCardForm.reset();
  closeModal(popupCard);
};

// заполнение полей формы редактирования профиля
const fillProfileInput = (popupProfile) => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(popupProfile);
}

popupList.forEach(function (popupItem) {
  const popupCloseButton = popupItem.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', () => {
    closeModal(popupItem);
  });
});

// слушатель сабмита редактирования профиля
popupProfile.addEventListener('submit', handleEditProfileFormSubmit);

// слушатель сабмита добавления новой карточки
popupCard.addEventListener('submit', handleAddCardFormSubmit);

// слушатель открытия попапа карточек 
profileAddButton.addEventListener('click', () => {
  openModal(popupCard);
});

// слушатель открытия попапа профиля
profileEditButton.addEventListener('click', () => fillProfileInput(popupProfile));