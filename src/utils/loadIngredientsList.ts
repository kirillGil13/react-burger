import { ThunkAction } from 'redux-thunk';
import { setIngredientsLoading, setIngredientsError, setIngredientList } from '../services/ingredientList';
import { request } from './request';
import { handleError } from './handleError';

export const loadIngredientsList = (init: RequestInit): ThunkAction<Promise<void>, unknown, unknown, any> => {
  return async (dispatch) => {  
    dispatch(setIngredientsLoading(true))
    dispatch(setIngredientsError(null));
  
    try {
      const result = await request('/ingredients', init)
  
      dispatch(setIngredientList(result.data));
    } catch (err) {
      const error = handleError(err);
      dispatch(setIngredientsError(error));
    } finally {
      dispatch(setIngredientsLoading(false))
    }
  }
}
