const cardTemplate = document.querySelector('#card-template').content;

// функция создания карточки
export function createCard(cardData, deleteCallback, handleClickLike, handleClickCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener('click', () => deleteCallback(cardElement));
  likeButton.addEventListener('click', () => handleClickLike(likeButton));
  cardImage.addEventListener('click', () => handleClickCard(cardData));

  return cardElement;
}

// функция удаления карточки
export const deleteCard = (cardElement) => { 
  cardElement.remove();
}

// функция добавления/удаления лайка 
export const handleClickLike = (likeButton) => {
  likeButton.classList.toggle('card__like-button_is-active');
}