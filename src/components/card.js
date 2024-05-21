import { likeCard, removeLike, deleteCardGlobal } from "./api.js";

const cardTemplate = document.querySelector('#card-template').content;

// Функция возвращает шаблон карточки
function getCardTemplate() {
  return cardTemplate.querySelector('.card').cloneNode(true);
}

//Функция создания карточки на основе данных элемента
function createCard (element, userId, deleteCard, toggleLikeCard, openImgPopup) {
  const cardElement = getCardTemplate(); 

  const cardElementImg = cardElement.querySelector('.card__image'); 
  cardElementImg.src = element.link;
  cardElementImg.alt = `На фотографии изображен географический объект: ${element.name}`;
  cardElement.querySelector('.card__title').textContent = element.name;
  
  const cardElementLikeCount = cardElement.querySelector(".card__like-count");
  cardElementLikeCount.textContent = element.likes.length;

  const buttonDeleteCard = cardElement.querySelector('.card__delete-button'); 
  if (element.owner._id === userId) {
    buttonDeleteCard.addEventListener('click', () => deleteCard(element._id, cardElement));
  } else {
    buttonDeleteCard.remove();
  }
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => toggleLikeCard(element._id, likeButton, cardElementLikeCount));
  cardElementImg.addEventListener('click', (openImgPopup));
  return cardElement;
}

//Функция удаляет карточку из DOM
function deleteCard (cardId, cardElement) {
  deleteCardGlobal(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

//Функция переключает состояние лайка 
function toggleLikeCard (cardId, likeButton, cardElementLikeCount) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  if (isLiked) {
    removeLike(cardId)
      .then((card) => {
        likeButton.classList.remove('card__like-button_is-active');
        cardElementLikeCount.textContent = card.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    likeCard(cardId)
      .then((card) => {
        likeButton.classList.add('card__like-button_is-active');
        cardElementLikeCount.textContent = card.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export {createCard, deleteCard, toggleLikeCard};