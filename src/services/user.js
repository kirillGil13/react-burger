import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  accessToken: null,
  initialUser: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setInitialUser: (state, action) => {
      state.initialUser = action.payload
    },
    setUserLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setUserError: (state, action) => {
      state.error = action.payload
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
    }
  }
})

export const { setUser, setUserLoading, setUserError, setAccessToken, setInitialUser } = userSlice.actions
export default userSlice.reducer