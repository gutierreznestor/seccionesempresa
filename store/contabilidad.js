import { createSlice } from "@reduxjs/toolkit";

export const contabilidadSlice = createSlice({
  name: 'contabilidad',
  initialState: {
    loading: false,
    message: '',
    errorMessage: '',
    currentContabilidad: null,
  },
  reducers: {
    getContabilidad(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    getContabilidadSuccess(state, { payload }) {
      state.loading = false;
      state.currentContabilidad = payload;
    },
    getContabilidadError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
    editContabilidad(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    editContabilidadSuccess(state, { payload }) {
      state.loading = false;
      state.currentContabilidad = payload;
    },
    editContabilidadError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
  },
});

export const {
  getContabilidad,
  getContabilidadSuccess,
  getContabilidadError,
  editContabilidad,
  editContabilidadSuccess,
  editContabilidadError,
} = contabilidadSlice.actions;

export default contabilidadSlice.reducer;
