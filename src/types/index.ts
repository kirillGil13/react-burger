export type TIngredientType = 'bun' | 'sauce' | 'main'

export interface IIngredient {
  _id: string
  name: string
  type: TIngredientType
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_large: string
}

export interface IConstructorIngredient extends IIngredient {
  uuid: string
}

export interface IUser {
  email: string
  name: string
}

export interface IAuthData {
  accessToken: string
  refreshToken: string
}

export interface IRegisterForm {
  email: string;
  password: string;
  name: string;
}

export interface IChangeUserForm {
  email: string;
  name: string;
}

export interface IResetPasswordForm {
  password: string;
  token: string;
}

export interface ISignInForm {
  email: string;
  password: string;
}

export interface IApiError extends Error {}

