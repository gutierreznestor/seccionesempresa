import { createSlice } from "@reduxjs/toolkit";

export const seccionesEmpresaSlice = createSlice({
  name: 'seccionesEmpresa',
  initialState: {
    list: [],
    loading: false,
    message: '',
    errorMessage: '',
    currentSeccionEmpresa: null,
  },
  reducers: {
    deleteSeccionEmpresa(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    deleteSeccionEmpresaSuccess(state, { payload }) {
      state.loading = false;
      state.message = payload;
    },
    deleteSeccionEmpresaError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
    getSeccionesEmpresa(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    getSeccionesEmpresaSuccess(state, { payload }) {
      state.loading = false;
      state.list = payload;
    },
    getSeccionesEmpresaError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
    newSeccionEmpresa(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    newSeccionEmpresaSuccess(state, { payload }) {
      state.loading = false;
      state.currentSeccionEmpresa = payload;
    },
    newSeccionEmpresaError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
      state.currentSeccionEmpresa = null;
    },
  },
});

export const {
  deleteSeccionEmpresa,
  deleteSeccionEmpresaSuccess,
  deleteSeccionEmpresaError,
  getSeccionesEmpresa,
  getSeccionesEmpresaSuccess,
  getSeccionesEmpresaError,
  newSeccionEmpresa,
  newSeccionEmpresaSuccess,
  newSeccionEmpresaError,
} = seccionesEmpresaSlice.actions;

export default seccionesEmpresaSlice.reducer;
