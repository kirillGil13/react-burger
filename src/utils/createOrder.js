import { setCreatedOrder, setCreatedOrderError, setCreatedOrderLoading } from '../services/createdOrder';
import { API_URL } from './constants';

export const createOrder = (ingredients) => {
  return async (dispatch) => {
    dispatch(setCreatedOrderLoading(true))
    dispatch(setCreatedOrderError(null));

    try {
      const response = await fetch(API_URL + '/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ingredients})
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const result = await response.json();

      dispatch(setCreatedOrder(result.order));

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