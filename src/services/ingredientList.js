import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  list: [],
}

const ingredientList = createSlice({
  name: 'ingredientList',
  initialState,
  reducers: {
    setIngredientList: (state, action) => {        
        state.list = action.payload
    },
    setIngredientsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setIngredientsError: (state, action) => {
      state.error = action.payload
    }
  },
});

export const { setIngredientList, setIngredientsError, setIngredientsLoading } = ingredientList.actions;
export default ingredientList.reducer;
