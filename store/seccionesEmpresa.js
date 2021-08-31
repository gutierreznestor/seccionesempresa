import { createSlice } from "@reduxjs/toolkit";

export const seccionesEmpresaSlice = createSlice({
  name: 'seccionesEmpresa',
  initialState: {
    list: [],
    loading: false,
    message: '',
    errorMessage: '',
  },
  reducers: {
    deleteSeccionEmpresa(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    deleteSeccionEmpresaSuccess(state, { payload }) {
      state.loading = false;
      state.list = payload;
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
  },
});

export const {
  deleteSeccionEmpresa,
  deleteSeccionEmpresaSuccess,
  deleteSeccionEmpresaError,
  getSeccionesEmpresa,
  getSeccionesEmpresaSuccess,
  getSeccionesEmpresaError,
} = seccionesEmpresaSlice.actions;

export default seccionesEmpresaSlice.reducer;
