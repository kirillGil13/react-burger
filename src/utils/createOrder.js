import { deleteAllConstructorIngredients } from '../services/constructorIngredients';
import { setCreatedOrder, setCreatedOrderError, setCreatedOrderLoading } from '../services/createdOrder';
import { API_URL } from './constants';
import { request } from './request';

export const createOrder = (ingredients) => {
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
      dispatch(deleteAllConstructorIngredients())

      return result
    } catch (err) {
      if (err.name !== 'AbortError') {
        dispatch(setCreatedOrderError(err.message));
      }
    } finally {
      dispatch(setCreatedOrderLoading(false))
    }
  }
}