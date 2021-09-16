import { createSlice } from "@reduxjs/toolkit";

export const planCuentasSlice = createSlice({
  name: 'planCuentas',
  initialState: {
    list: [],
    loading: false,
    message: '',
    errorMessage: '',
    currentPlanCuenta: null,
  },
  reducers: {
    deletePlanCuentas(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    deletePlanCuentasSuccess(state, { payload }) {
      state.loading = false;
      state.message = payload;
    },
    deletePlanCuentasError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
    getPlanesCuentas(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    getPlanesCuentasSuccess(state, { payload }) {
      state.loading = false;
      state.list = payload;
    },
    getPlanesCuentasError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
    newPlanCuenta(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    newPlanCuentaSuccess(state, { payload }) {
      state.loading = false;
      state.currentPlanCuenta = payload;
    },
    newPlanCuentaError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
      state.currentPlanCuenta = null;
    },
  },
});

export const {
  deletePlanCuentas,
  deletePlanCuentasSuccess,
  deletePlanCuentasError,
  getPlanesCuentas,
  getPlanesCuentasSuccess,
  getPlanesCuentasError,
  newPlanCuenta,
  newPlanCuentaSuccess,
  newPlanCuentaError,
} = planCuentasSlice.actions;

export default planCuentasSlice.reducer;
