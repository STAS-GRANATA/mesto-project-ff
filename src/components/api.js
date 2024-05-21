const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-13',
  headers: {
    authorization: '459f7151-796e-49eb-b108-c1b874f88f6e',
    'Content-Type': 'application/json',
  },
};

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`);
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(response => checkResponse(response));
};


export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(response => checkResponse(response));
};

export const updateProfile = (profileTitle, profileJob) => {
  const userData = {
    name: profileTitle,
    about: profileJob
  };

  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(userData)
  })
    .then(response => checkResponse(response));
};

export const addCard = (name, link) => {
  const cardData = {
    name: name,
    link: link
  };

  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(cardData)
  })
    .then(response => checkResponse(response));
};

export const deleteCardGlobal = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(response => checkResponse(response));
};

export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(response => checkResponse(response));
};

export const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(response => checkResponse(response));
};

export const updateAvatar = (avatarUrl) => {
  const avatarData = {
    avatar: avatarUrl
  };

  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(avatarData)
  })
  .then(response => checkResponse(response));
};