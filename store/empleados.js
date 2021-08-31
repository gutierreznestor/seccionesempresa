import { createSlice } from "@reduxjs/toolkit";

export const empleadosSlice = createSlice({
  name: 'empleados',
  initialState: {
    list: [],
    loading: false,
    message: '',
    errorMessage: '',
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
    },
    deleteEmpleadoError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
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
  },
});

export const {
  deleteEmpleado,
  deleteEmpleadoSuccess,
  deleteEmpleadoError,
  getEmpleados,
  getEmpleadosSuccess,
  getEmpleadosError,
} = empleadosSlice.actions;

export default empleadosSlice.reducer;
