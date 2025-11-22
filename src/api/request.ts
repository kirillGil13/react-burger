import { API_URL } from '../utils/constants';

type TRequestPayload = Record<string, any> | FormData

type TRequestResponse<T extends Record<string, any>> = {
  success: boolean
  status?: number
} & T

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

export const post = async <T extends Record<string, any>>(url: string, data: TRequestPayload = {}, options: RequestInit = {}): Promise<TRequestResponse<T>> => {
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

export const patch = async <T extends Record<string, any>>(url: string, data: TRequestPayload = {}, options: RequestInit = {}): Promise<TRequestResponse<T>> => {
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

export const get = async <T extends Record<string, any>>(url: string, options: RequestInit = {}): Promise<TRequestResponse<T>> => {
  return request(url, {
    method: 'GET',
    ...options
  })
}

export const del = async <T extends Record<string, any>>(url: string, options: RequestInit = {}): Promise<TRequestResponse<T>> => {
  return request(url, {
    method: 'DELETE',
    ...options
  })
}
