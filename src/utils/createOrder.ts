import { ThunkAction } from 'redux-thunk';
import { deleteAllConstructorIngredients } from '../services/constructorIngredients';
import { setCreatedOrder, setCreatedOrderError, setCreatedOrderLoading } from '../services/createdOrder';
import { handleError } from './handleError';
import { request } from './request';
import { IConstructorIngredient } from './types';

interface IOrder {
  number: number
}

export const createOrder = (ingredients: IConstructorIngredient[]): ThunkAction<Promise<IOrder>, unknown, unknown, any> => {
  return async (dispatch) => {
    dispatch(setCreatedOrderLoading(true))
    dispatch(setCreatedOrderError(null));

    try {
      const result = await request('/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ingredients})
      });

      dispatch(setCreatedOrder(result.order));
      // TODO
      // @ts-ignore
      dispatch(deleteAllConstructorIngredients())

      return result
    } catch (err) {
      const error = handleError(err);
      dispatch(setCreatedOrderError(error));
    } finally {
      dispatch(setCreatedOrderLoading(false))
    }
  }
}