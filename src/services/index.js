import constructorIngredientsReducer from './constructorIngredients';
import createdOrderReducer from './createdOrder';
import currentIngredientReducer from './currentIngredient';
import ingredientListReducer from './ingredientList';
import userReducer from './user';

const rootReducer = {
  constructorIngredients: constructorIngredientsReducer,
  createdOrder: createdOrderReducer,
  currentIngredient: currentIngredientReducer,
  ingredientList: ingredientListReducer,
  user: userReducer,
}

export default rootReducer
