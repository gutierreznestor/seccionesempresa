import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  message: null,
  errorMessage: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = true;
      state.message = null;
      state.errorMessage = null;
    },
    loginSuccess: (state, { user, message }) => {
      state.user = user;
      state.isAuthenticated = true;
      state.loading = false;
      state.message = message;
      state.errorMessage = null;
    },
    loginError: (state, { errorMessage }) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.message = null;
      state.errorMessage = errorMessage;
    },
  }
});

export const {
  login,
  loginSuccess,
  loginError,
} = authSlice.actions;

export default authSlice.reducer;
