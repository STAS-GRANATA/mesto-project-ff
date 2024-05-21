import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, deleteCard, toggleLikeCard} from './components/card.js';
import {openPopup, closePopup, closePopupByOverlay} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {getUserInfo, getInitialCards, updateProfile, addCard, updateAvatar} from './components/api.js';


// Секция мест (карточек)
const placesList = document.querySelector('.places__list');

// Секция профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const buttonOpenAddCardForm = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileImage = document.querySelector(".profile__image");

// Попап редактирования профиля
const popupTypeEdit = document.querySelector('.popup_type_edit');
const editProfileFormElement = popupTypeEdit.querySelector('.popup__form');
const nameInput = editProfileFormElement.querySelector('.popup__input_type_name');
const jobInput = editProfileFormElement.querySelector('.popup__input_type_description');

// Попап добавления новой карточки
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const addFormElement = popupTypeNewCard.querySelector('.popup__form');
const cardNameInput = addFormElement.querySelector('.popup__input_type_card-name');
const cardUrlInput = addFormElement.querySelector('.popup__input_type_url');

// Попап изображения
export const popupTypeImage = document.querySelector('.popup_type_image');
export const popupImg = popupTypeImage.querySelector('.popup__image');
export const popupCaption = popupTypeImage.querySelector('.popup__caption');

// Попап редактирования аватара
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const editAvatarFormElement = popupTypeAvatar.querySelector('.popup__form');
const avatarUrlInput = editAvatarFormElement.querySelector('.popup__input_type_url');

let userId = '';

const loadInitialData = () => {
  return Promise.all([getUserInfo(), getInitialCards()])
    .then(([userInfo, initialCards]) => {
      userId = userInfo._id;
      profileName.textContent = userInfo.name;
      profileJob.textContent = userInfo.about;
      profileImage.style.backgroundImage = `url(${userInfo.avatar})`;

      initialCards.forEach(function (card) {
        const cardElement = createCard(card, userId, deleteCard, toggleLikeCard, openImgPopup);
        placesList.append(cardElement);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Обработчик клика по кнопке редактирования профиля
profileEditButton.addEventListener('click', function () {
  openPopup(popupTypeEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  
  clearValidation(editProfileFormElement, validationConfig);
});

buttonOpenAddCardForm.addEventListener('click', function () {
  openPopup(popupTypeNewCard);
  
  clearValidation(addFormElement, validationConfig);
  addFormElement.reset();
});

profileImage.addEventListener('click', function () {
  openPopup(popupTypeAvatar);
  
  clearValidation(editAvatarFormElement, validationConfig);
  editAvatarFormElement.reset();
})

// Функция открывает попап изображения
function openImgPopup(event) {
  const card = event.target.closest('.card'); 
  if (card) {
    const cardData = {
      link: card.querySelector('.card__image').src,
      caption: card.querySelector('.card__title').textContent
    };
    setPopupImageContent(cardData.link, cardData.caption);
    openPopup(popupTypeImage);
  }
}

// Функция устанавливает контент для попапа изображения
function setPopupImageContent(link, caption) {
  popupImg.src = link;
  popupImg.alt = `На фотографии изображен географический объект: ${caption}`;
  popupCaption.textContent = caption;
}

document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('click', closePopupByOverlay);
});

// Функция для отображения состояния загрузки
function showLoadingIndicator(isLoading, buttonElement, loadingText = 'Сохранение...', defaultText = 'Сохранить') {
  buttonElement.textContent = isLoading ? loadingText : defaultText;
}


// Обработчик сабмита формы редактирования профиля
function handleEditProfileFormSubmit(event) {
  event.preventDefault()
  const newName = nameInput.value;
  const newJob = jobInput.value;

  showLoadingIndicator(true, event.submitter);

  updateProfile(newName, newJob)
    .then((userInfo) => {
      profileName.textContent = userInfo.name;
      profileJob.textContent = userInfo.about;
      closePopup(popupTypeEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      showLoadingIndicator(false, event.submitter);
    });
}


// Обработчик сабмита формы добавления карточки
function handleAddFormSubmit(event) {
  event.preventDefault();
  const name = cardNameInput.value;
  const link = cardUrlInput.value;
  showLoadingIndicator(true, event.submitter);

  //функция добавления карточки на сервер
  addCard(name, link)
    .then((card) => {
      const cardElement = createCard(
        card,
        userId,
        deleteCard,
        toggleLikeCard, 
        openImgPopup 
      );
      placesList.prepend(cardElement);
      closePopup(popupTypeNewCard);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      showLoadingIndicator(false, event.submitter);
    });
}

// Обработчик сабмита формы редактирования аватара
function handleEditAvatarFormSubmit(event) {
  event.preventDefault();
  const avatarUrl = avatarUrlInput.value;
  showLoadingIndicator(true, event.submitter);

  //функция обновления аватара на сервере
  updateAvatar(avatarUrl)
    .then((userInfo) => {
      profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
      closePopup(popupTypeAvatar);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      showLoadingIndicator(false, event.submitter);
    });
}

const popupTypeEditCloseButton = popupTypeEdit.querySelector('.popup__close');
const popupTypeNewCardButton = popupTypeNewCard.querySelector('.popup__close');
const popupTypeImageButton = popupTypeImage.querySelector('.popup__close');
const popupTypeAvatarButton = popupTypeAvatar.querySelector('.popup__close');

popupTypeEditCloseButton.addEventListener('click', () => closePopup(popupTypeEdit));
popupTypeNewCardButton.addEventListener('click', () => closePopup(popupTypeNewCard));
popupTypeImageButton.addEventListener('click', () => closePopup(popupTypeImage));
popupTypeAvatarButton.addEventListener('click', () => closePopup(popupTypeAvatar))

editProfileFormElement.addEventListener('submit', handleEditProfileFormSubmit);
addFormElement.addEventListener('submit', handleAddFormSubmit);
editAvatarFormElement.addEventListener('submit', handleEditAvatarFormSubmit);

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

loadInitialData();