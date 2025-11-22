import { IConstructorIngredient } from '../types';
import { post } from './request';

export const createOrder = async (ingredients: IConstructorIngredient['_id'][], init: RequestInit = {}) => {
  return post<{order: number}>('/orders', {ingredients}, init)
}