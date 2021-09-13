import { createSlice } from "@reduxjs/toolkit";

export const logsSeccionesEmpresaSlice = createSlice({
  name: 'logsSeccionesEmpresa',
  initialState: {
    list: [],
    loading: false,
    message: '',
    errorMessage: '',
  },
  reducers: {
    newLogSeccionEmpresa(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    newLogSeccionEmpresaSuccess(state, { payload }) {
      state.loading = false;
      state.list = payload;
    },
    newLogSeccionEmpresaError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
    getLogsSeccionesEmpresa(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    getLogsSeccionesEmpresaSuccess(state, { payload }) {
      state.loading = false;
      state.list = payload;
    },
    getLogsSeccionesEmpresaError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
  },
});

export const {
  newLogSeccionEmpresa,
  newLogSeccionEmpresaSuccess,
  newLogSeccionEmpresaError,
  getLogsSeccionesEmpresa,
  getLogsSeccionesEmpresaSuccess,
  getLogsSeccionesEmpresaError,
} = logsSeccionesEmpresaSlice.actions;

export default logsSeccionesEmpresaSlice.reducer;
