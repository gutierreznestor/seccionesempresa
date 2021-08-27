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
  getSeccionesEmpresa,
  getSeccionesEmpresaSuccess,
  getSeccionesEmpresaError,
} = seccionesEmpresaSlice.actions;

export default seccionesEmpresaSlice.reducer;
