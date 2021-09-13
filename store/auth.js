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
    loginError: (state, { payload }) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.message = null;
      state.errorMessage = payload;
    },
    logout: (state) => {
      state.loading = true;
      state.message = null;
      state.errorMessage = null;
    },
    logoutSuccess: (state, { payload }) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.message = payload;
      state.errorMessage = null;
    },
    logoutError: (state, { payload }) => {
      state.loading = false;
      state.message = null;
      state.errorMessage = null;
    },
  }
});

export const {
  login,
  loginSuccess,
  loginError,
  logout,
  logoutSuccess,
  logoutError,
} = authSlice.actions;

export default authSlice.reducer;
