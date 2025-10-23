import constructorIngredientsReducer from './constructorIngredients';
import createdOrderReducer from './createdOrder';
import currentIngredientReducer from './currentIngredient';
import ingredientListReducer from './ingredientList';

const rootReducer = {
  constructorIngredients: constructorIngredientsReducer,
  createdOrder: createdOrderReducer,
  currentIngredient: currentIngredientReducer,
  ingredientList: ingredientListReducer,
}

export default rootReducer
