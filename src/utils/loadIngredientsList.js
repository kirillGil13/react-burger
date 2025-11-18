import { setIngredientsLoading, setIngredientsError, setIngredientList } from '../services/ingredientList';
import { request } from './request';

export const loadIngredientsList = (init) => {
  return async (dispatch) => {  
    dispatch(setIngredientsLoading(true))
    dispatch(setIngredientsError(null));
  
    try {
      const result = await request('/ingredients', init)
  
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
