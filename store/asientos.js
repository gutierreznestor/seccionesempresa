import { createSlice } from "@reduxjs/toolkit";

export const asientosSlice = createSlice({
  name: 'asientos',
  initialState: {
    currentAsiento: null,
    errorMessage: '',
    list: [],
    loading: false,
    message: '',
    proximoAsiento: null,
  },
  reducers: {
    deleteAsiento(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    deleteAsientoSuccess(state) {
      state.loading = false;
      state.currentAsiento = null;
    },
    deleteAsientoError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
    editAsiento(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    editAsientoSuccess(state, { payload }) {
      state.loading = false;
      state.currentAsiento = payload;
    },
    editAsientoError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
    getAsiento(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    getAsientoSuccess(state, { payload }) {
      state.loading = false;
      state.currentAsiento = payload;
    },
    getAsientoError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
    getAsientos(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    getAsientosSuccess(state, { payload }) {
      state.loading = false;
      state.list = payload;
    },
    getAsientosError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
    getProximoAsiento(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    getProximoAsientoSuccess(state, { payload }) {
      state.loading = false;
      state.proximoAsiento = payload;
    },
    getProximoAsientoError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
      state.proximoAsiento = null;
    },
    newAsiento(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    newAsientoSuccess(state, { payload }) {
      state.loading = false;
      state.currentAsiento = payload;
    },
    newAsientoError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
      state.currentAsiento = null;
    },
  },
});

export const {
  deleteAsiento,
  deleteAsientoSuccess,
  deleteAsientoError,
  editAsiento,
  editAsientoSuccess,
  editAsientoError,
  getAsiento,
  getAsientoSuccess,
  getAsientoError,
  getAsientos,
  getAsientosSuccess,
  getAsientosError,
  getProximoAsiento,
  getProximoAsientoSuccess,
  getProximoAsientoError,
  newAsiento,
  newAsientoSuccess,
  newAsientoError,
} = asientosSlice.actions;

export default asientosSlice.reducer;
