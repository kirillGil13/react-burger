import { IIngredient } from '../types';
import { get } from './request';

export const fetchIngredients = async (init: RequestInit = {}) => {
  return get<{data: IIngredient[]}>('/ingredients', init)
}