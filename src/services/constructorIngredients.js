import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  list: [],
}

const constructorIngredientsSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  reducers: {
    setConstructorIngredients: {
      reducer: (state, action) => {
        state.list = action.payload
      },
      prepare: (ingredients) => { 
        return {
          payload: ingredients.map((item) => ({...item, uuid: uuidv4()}))
        }
      }
    },
    addConstructorIngredient: {
      reducer: (state, action) => {
        state.list = [...state.list, action.payload]
      },
      prepare: (ingredient) => ({ payload: {...ingredient, uuid: uuidv4()} })
    },
    deleteConstructorIngredient: (state, action) => {
      state.list = state.list.filter((item) => item.uuid !== action.payload)
    },
    deleteAllConstructorIngredients: (state) => {
      state.list = []
    },
    replaceConstructorIngredient: (state, action) => {
      const itemToReplaceIndex = state.list.findIndex((item) => item.uuid === action.payload.from.uuid)

      if (itemToReplaceIndex === -1) return

      const newList = [...state.list]
      newList.splice(itemToReplaceIndex, 1, action.payload.to)
      state.list = newList
    },
    moveConstructorIngredient: (state, action) => {
      const newList = [...state.list]
      const movingItem = newList[action.payload.fromIndex]

      newList.splice(action.payload.fromIndex, 1)    
      newList.splice(action.payload.toIndex, 0, movingItem)

      state.list = newList  
    }
  },
});

export const { 
  setConstructorIngredients, 
  addConstructorIngredient, 
  deleteConstructorIngredient, 
  moveConstructorIngredient,
  replaceConstructorIngredient, 
  deleteAllConstructorIngredients,
} = constructorIngredientsSlice.actions;
export default constructorIngredientsSlice.reducer;
