import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  loading: false,
  message: '',
  errorMessage: '',
  DB: '',
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
      state.message = 'Fetch copias seguridad ok';
    },
    getCopiasSeguridadError: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload;
    },
    newCopiaSeguridad: (state, _) => {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    newCopiaSeguridadSuccess: (state, { payload }) => {
      state.loading = false;
      state.message = 'New copia seguridad ok';
    },
    newCopiaSeguridadError: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload;
    },
    restoreCopiaSeguridad: (state) => {
      state.loading = true;
    },
    restoreCopiaSeguridadSuccess: (state, { payload }) => {
      state.DB = payload;
      state.loading = false;
      state.errorMessage = '';
    },
    restoreCopiaSeguridadError: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload;
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
