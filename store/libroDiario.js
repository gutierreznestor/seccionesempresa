import { createSlice } from "@reduxjs/toolkit";

export const libroDiarioSlice = createSlice({
  name: 'libroDiario',
  initialState: {
    errorMessage: '',
    libroDiario: [],
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
      state.libroDiario = payload;
    },
    getLibroDiarioError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
    registrarLibroDiario(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    registrarLibroDiarioSuccess(state, { payload }) {
      state.loading = false;
      state.libroDiario = payload;
    },
    registrarLibroDiarioError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
  },
});

export const {
  getLibroDiario,
  getLibroDiarioSuccess,
  getLibroDiarioError,
  registrarLibroDiario,
  registrarLibroDiarioSuccess,
  registrarLibroDiarioError,
} = libroDiarioSlice.actions;

export default libroDiarioSlice.reducer;

