const BASE_URL = 'https://auth.nomoreparties.co';

export const registration = (email, password) => {
  return fetch(`${BASE_URL}/signup`, doRequest(email, password))
  .then(getResponse);
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, doRequest(email, password))
  .then(getResponse);
};

const doRequest = (email, password) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email })
  };
};

const getResponse = (res) => {
    return res.ok 
    ?  res.json() 
    :  Promise.reject(`произошла ошибка: ${res.status}`);
};
