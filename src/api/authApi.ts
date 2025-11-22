import { IAuthData, IChangeUserForm, IRegisterForm, IResetPasswordForm, ISignInForm, IUser } from '../types';
import { get, patch, post } from './request';

interface IUserResponse {
  user: IUser
}

interface ISignInResponse {
  user: IUser
  accessToken: string
  refreshToken: string
}

interface IRegisterResponse {
  user: IUser
  accessToken: string
  refreshToken: string
}

export const getUser = async (token: string, init: RequestInit = {}) => {
  return get<IUserResponse>('/auth/user', { headers: { Authorization: `Bearer ${token}` }, ...init });
}

export const changeUser = async (form: IChangeUserForm, accessToken: string, init: RequestInit = {}) => {
  return patch<IUserResponse>('/auth/user', form, {headers: { Authorization: `Bearer ${accessToken}` }, ...init})
}

export const getAuthData = async (refreshToken: string, init: RequestInit = {}) => {
  return post<IAuthData>('/auth/token', { token: refreshToken }, init)
}

export const sendResetPassword = async (email: string, init: RequestInit = {}) => {
  return post('/password-reset', { email }, init)
}

export const resetPassword = async (form: IResetPasswordForm, init: RequestInit = {}) => {
  return post(`/password-reset/reset`, form, init)
}

export const signIn = async (form: ISignInForm, init: RequestInit = {}) => {
  return post<ISignInResponse>('/auth/login', form, init)
}

export const logOut = async (refreshToken: string, init: RequestInit = {}) => {
  return post('/auth/logout', {token: refreshToken}, init)
}

export const registerUser = async (form: IRegisterForm, init: RequestInit = {}) => {
  return post<IRegisterResponse>('/auth/register', form, init)
}

