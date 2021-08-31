import { createSlice } from "@reduxjs/toolkit";

export const empleadosSlice = createSlice({
  name: 'empleados',
  initialState: {
    list: [],
    loading: false,
    message: '',
    errorMessage: '',
    currentEmpleado: null,
  },
  reducers: {
    deleteEmpleado(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    deleteEmpleadoSuccess(state, { payload }) {
      state.loading = false;
      state.list = payload;
      state.currentEmpleado = null;
    },
    deleteEmpleadoError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
      state.currentEmpleado = null;
    },
    getEmpleados(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    getEmpleadosSuccess(state, { payload }) {
      state.loading = false;
      state.list = payload;
    },
    getEmpleadosError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
    newEmpleado(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    newEmpleadoSuccess(state, { payload }) {
      state.loading = false;
      state.currentEmpleado = payload;
    },
    newEmpleadoError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
      state.currentEmpleado = null;
    },
  },
});

export const {
  deleteEmpleado,
  deleteEmpleadoSuccess,
  deleteEmpleadoError,
  getEmpleados,
  getEmpleadosSuccess,
  getEmpleadosError,
  newEmpleado,
  newEmpleadoSuccess,
  newEmpleadoError,
} = empleadosSlice.actions;

export default empleadosSlice.reducer;
