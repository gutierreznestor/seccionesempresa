import { createSlice } from "@reduxjs/toolkit";

export const planCuentasSlice = createSlice({
  name: 'planCuentas',
  initialState: {
    list: [],
    loading: false,
    message: '',
    errorMessage: '',
    currentPlanCuenta: null,
    nextPlanCuenta: null,
  },
  reducers: {
    deletePlanCuenta(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    deletePlanCuentaSuccess(state, { payload }) {
      state.loading = false;
      state.message = payload;
    },
    deletePlanCuentaError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
    editPlanCuenta(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    editPlanCuentaSuccess(state, { payload }) {
      state.loading = false;
      state.message = payload;
    },
    editPlanCuentaError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
    getPlanCuenta(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    getPlanCuentaSuccess(state, { payload }) {
      state.loading = false;
      state.currentPlanCuenta = payload;
    },
    getPlanCuentaError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
      state.currentPlanCuenta = null;
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
    getNextPlanCuenta(state) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
      state.nextPlanCuenta = null;
    },
    getNextPlanCuentaSuccess(state, { payload }) {
      state.loading = false;
      state.nextPlanCuenta = payload;
    },
    getNextPlanCuentaError(state, { payload }) {
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
  deletePlanCuenta,
  deletePlanCuentaSuccess,
  deletePlanCuentaError,
  editPlanCuenta,
  editPlanCuentaSuccess,
  editPlanCuentaError,
  getPlanCuenta,
  getPlanCuentaSuccess,
  getPlanCuentaError,
  getPlanesCuentas,
  getPlanesCuentasSuccess,
  getPlanesCuentasError,
  getNextPlanCuenta,
  getNextPlanCuentaSuccess,
  getNextPlanCuentaError,
  newPlanCuenta,
  newPlanCuentaSuccess,
  newPlanCuentaError,
} = planCuentasSlice.actions;

export default planCuentasSlice.reducer;
