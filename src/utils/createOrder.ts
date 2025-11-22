import { ThunkAction } from 'redux-thunk';
import { deleteAllConstructorIngredients } from '../services/constructorIngredients';
import { setCreatedOrder, setCreatedOrderError, setCreatedOrderLoading } from '../services/createdOrder';
import { handleError } from './handleError';
import { IConstructorIngredient } from '../types';
import { orderApi } from '../api';

export const createOrder = (ingredients: IConstructorIngredient['_id'][]): ThunkAction<Promise<boolean>, unknown, unknown, any> => {
  return async (dispatch) => {
    dispatch(setCreatedOrderLoading(true))
    dispatch(setCreatedOrderError(null));

    try {
      const result = await orderApi.createOrder(ingredients)

      dispatch(setCreatedOrder(result.order));
      // TODO
      // @ts-ignore
      dispatch(deleteAllConstructorIngredients())

      return result.success
    } catch (err) {
      const error = handleError(err);
      dispatch(setCreatedOrderError(error));
      return false
    } finally {
      dispatch(setCreatedOrderLoading(false))
    }
  }
}