import { setIngredientsLoading, setIngredientsError, setIngredientList } from '../services/ingredientList';
import { API_URL } from './constants';

export const loadIngredientsList = (init) => {
  return async (dispatch) => {  
    dispatch(setIngredientsLoading(true))
    dispatch(setIngredientsError(null));
  
    try {
      const response = await fetch(API_URL + '/ingredients', init);
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
  
      const result = await response.json();
  
      dispatch(setIngredientList(result.data));
    } catch (err) {
      if (err.name !== 'AbortError') {
        dispatch(setIngredientsError(err.message));
      }
    } finally {
      dispatch(setIngredientsLoading(false))
    }
  }
}
