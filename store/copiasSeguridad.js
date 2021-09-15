import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  DB: '',
  errorMessage: '',
  fileName: '',
  list: [],
  loading: false,
  message: '',
  restoreMessage: '',
};

export const copiaSeguridadSlice = createSlice({
  name: 'copiasSeguridad',
  initialState,
  reducers: {
    getCopiasSeguridad: (state, _) => {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    getCopiasSeguridadSuccess: (state, { payload }) => {
      state.list = payload;
      state.loading = false;
    },
    getCopiasSeguridadError: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload;
    },
    newCopiaSeguridad: (state, _) => {
      state.fileName = '';
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
      state.restoreMessage = '';
    },
    newCopiaSeguridadSuccess: (state, { payload: { fileName, message } }) => {
      state.fileName = fileName;
      state.loading = false;
      state.message = message;
    },
    newCopiaSeguridadError: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload;
    },
    restoreCopiaSeguridad: (state) => {
      state.fileName = '';
      state.loading = true;
      state.errorMessage = '';
      state.message = '';
      state.restoreMessage = '';
    },
    restoreCopiaSeguridadSuccess: (state, { payload: { fileName, message } }) => {
      state.fileName = fileName;
      state.loading = false;
      state.errorMessage = '';
      state.message = message;
      state.restoreMessage = message;
    },
    restoreCopiaSeguridadError: (state, { payload }) => {
      state.fileName = '';
      state.loading = false;
      state.message = '';
      state.errorMessage = payload;
      state.restoreMessage = '';
    },
    setCopiaSeguridad: (state) => {
      state.loading = true;
    },
    setCopiaSeguridadSuccess: (state, { payload }) => {
      state.DB = payload;
      state.loading = false;
      state.errorMessage = '';
    },
    setCopiaSeguridadError: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload;
    },
  }
});

export const {
  getCopiasSeguridad,
  getCopiasSeguridadSuccess,
  getCopiasSeguridadError,
  newCopiaSeguridad,
  newCopiaSeguridadSuccess,
  newCopiaSeguridadError,
  restoreCopiaSeguridad,
  restoreCopiaSeguridadSuccess,
  restoreCopiaSeguridadError,
  setCopiaSeguridad,
  setCopiaSeguridadSuccess,
  setCopiaSeguridadError,
} = copiaSeguridadSlice.actions;

export default copiaSeguridadSlice.reducer;
