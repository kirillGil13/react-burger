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

export interface IApiError extends Error {}
