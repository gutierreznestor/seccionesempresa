import { createSlice } from "@reduxjs/toolkit";

export const diarioMayorSlice = createSlice({
  name: 'diarioMayor',
  initialState: {
    errorMessage: '',
    list: [],
    loading: false,
    message: '',
    diferencia: null,
  },
  reducers: {
    getRegistros(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    getRegistrosSuccess(state, { payload }) {
      state.loading = false;
      state.list = payload;
    },
    getRegistrosError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
    getDebeHaber(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    getDebeHaberSuccess(state, { payload }) {
      state.loading = false;
      state.diferencia = payload;
    },
    getDebeHaberError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
    newRegistro(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    newRegistroSuccess(state, { payload }) {
      state.loading = false;
    },
    newRegistroError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
  },
});

export const {
  getRegistros,
  getRegistrosSuccess,
  getRegistrosError,
  getDebeHaber,
  getDebeHaberSuccess,
  getDebeHaberError,
  newRegistro,
  newRegistroSuccess,
  newRegistroError,
} = diarioMayorSlice.actions;

export default diarioMayorSlice.reducer;

