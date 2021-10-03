import { createSlice } from "@reduxjs/toolkit";

export const libroDiarioSlice = createSlice({
  name: 'libroDiario',
  initialState: {
    errorMessage: '',
    list: [],
    loading: false,
    message: '',
  },
  reducers: {
    getLibroDiario(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    getLibroDiarioSuccess(state, { payload }) {
      state.loading = false;
      state.list = payload;
    },
    getLibroDiarioError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
  },
});

export const {
  getLibroDiario,
  getLibroDiarioSuccess,
  getLibroDiarioError,
} = libroDiarioSlice.actions;

export default libroDiarioSlice.reducer;

