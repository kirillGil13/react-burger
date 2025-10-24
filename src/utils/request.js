import { API_URL } from './constants';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  throw new Error(`Ошибка: ${res.status}`)
}

export const request = async (url, options) => {
  return fetch(API_URL + url, options).then(checkResponse);
}
