import { API_URL } from './constants';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  throw new Error(`Ошибка: ${res.status}`)
}

const handleError = (err) => {
  if (err.name === 'AbortError') return

  throw err
}

export const request = async (url, options) => {
  return fetch(API_URL + url, options).then(checkResponse).catch(handleError);
}

export const post = async (url, data, options = {}) => {
  return request(url, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...options.headers,
    },
  })
}

export const patch = async (url, data, options = {}) => {
  return request(url, {
    method: 'PATCH',
    body: JSON.stringify(data),
    ...options,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...options.headers,
    },
  })
}

export const get = async (url, options = {}) => {
  return request(url, {
    method: 'GET',
    ...options
  })
}

export const del = async (url, options = {}) => {
  return request(url, {
    method: 'DELETE',
    ...options
  })
}
