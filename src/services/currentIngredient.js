import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  item: null
}

const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    setCurrentIngredient: (state, action) => {
      state.item = action.payload
    },
    deleteCurrentIngredient: (state) => {
      state.item = null
    },
  },
});

export const { setCurrentIngredient, deleteCurrentIngredient } = currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;
