import { createSlice } from "@reduxjs/toolkit";

export const logEmpleadosSlice = createSlice({
  name: 'logsEmpleados',
  initialState: {
    list: [],
    loading: false,
    message: '',
    errorMessage: '',
  },
  reducers: {
    newLogEmpleado(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    newLogEmpleadoSuccess(state, { payload }) {
      state.loading = false;
      state.list = payload;
    },
    newLogEmpleadoError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
    getLogsEmpleados(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    getLogsEmpleadosSuccess(state, { payload }) {
      state.loading = false;
      state.list = payload;
    },
    getLogsEmpleadosError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
  },
});

export const {
  newLogEmpleado,
  newLogEmpleadoSuccess,
  newLogEmpleadoError,
  getLogsEmpleados,
  getLogsEmpleadosSuccess,
  getLogsEmpleadosError,
} = logEmpleadosSlice.actions;

export default logEmpleadosSlice.reducer;
