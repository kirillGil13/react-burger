import { ThunkAction } from 'redux-thunk';
import { setIngredientsLoading, setIngredientsError, setIngredientList } from '../services/ingredientList';
import { handleError } from './handleError';
import { fetchIngredients } from '../api/ingredientsListApi';

export const loadIngredientsList = (init: RequestInit): ThunkAction<Promise<void>, unknown, unknown, any> => {
  return async (dispatch) => {  
    dispatch(setIngredientsLoading(true))
    dispatch(setIngredientsError(null));
  
    try {
      const result = await fetchIngredients(init)
  
      dispatch(setIngredientList(result.data));
    } catch (err) {
      const error = handleError(err);
      dispatch(setIngredientsError(error));
    } finally {
      dispatch(setIngredientsLoading(false))
    }
  }
}
