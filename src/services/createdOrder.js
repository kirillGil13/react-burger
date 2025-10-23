import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  number: null,
  isLoading: false,
  error: null
}

const createdOrderSlice = createSlice({
  name: 'createdOrder',
  initialState: initialState,
  reducers: {
    setCreatedOrder: (state, action) => {
      state.number = action.payload.number
    },
    setCreatedOrderLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setCreatedOrderError: (state, action) => {
      state.error = action.payload
    }
  },
});

export const { setCreatedOrder, setCreatedOrderLoading, setCreatedOrderError } = createdOrderSlice.actions;
export default createdOrderSlice.reducer;
