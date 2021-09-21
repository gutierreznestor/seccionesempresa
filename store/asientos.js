import { createSlice } from "@reduxjs/toolkit";

export const asientosSlice = createSlice({
  name: 'asientos',
  initialState: {
    list: [],
    loading: false,
    message: '',
    errorMessage: '',
    currentAsiento: null,
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
      state.currentAsiento = null;
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
  getAsientos,
  getAsientosSuccess,
  getAsientosError,
  newAsiento,
  newAsientoSuccess,
  newAsientoError,
} = asientosSlice.actions;

export default asientosSlice.reducer;
