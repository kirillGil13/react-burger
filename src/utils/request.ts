import { API_URL } from './constants';

type RequestPayload = Record<string, any> | FormData

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }

  throw new Error(`Ошибка: ${res.status}`)
}

const handleError = (err: unknown) => {
  if (err instanceof Error && err.name === 'AbortError') return

  throw err
}

export const request = async (url: string, options: RequestInit) => {
  return fetch(API_URL + url, options).then(checkResponse).catch(handleError);
}

export const post = async (url: string, data: RequestPayload = {}, options: RequestInit = {}) => {
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

export const patch = async (url: string, data: RequestPayload = {}, options: RequestInit = {}) => {
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

export const get = async (url: string, options: RequestInit = {}) => {
  return request(url, {
    method: 'GET',
    ...options
  })
}

export const del = async (url: string, options: RequestInit = {}) => {
  return request(url, {
    method: 'DELETE',
    ...options
  })
}
