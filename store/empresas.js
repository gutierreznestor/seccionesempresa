import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  loading: false,
  message: '',
  errorMessage: '',
  DB: '',
};

export const empresasSlice = createSlice({
  name: 'empresas',
  initialState,
  reducers: {
    getEmpresas: (state, _) => {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    getEmpresasSuccess: (state, { payload }) => {
      state.list = payload;
      state.loading = false;
      state.message = 'Fetch empresas ok';
    },
    getEmpresasError: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload;
    },
    newEmpresa: (state, _) => {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    newEmpresaSuccess: (state, { payload }) => {
      state.loading = false;
      state.message = 'New empresa ok';
    },
    newEmpresaError: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload;
    },
    setDB: (state) => {
      state.loading = true;
    },
    setDBSuccess: (state, { payload }) => {
      state.DB = payload;
      state.loading = false;
    },
    setDBError: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload;
    },
  }
});

export const {
  getEmpresas,
  getEmpresasSuccess,
  getEmpresasError,
  newEmpresa,
  newEmpresaSuccess,
  newEmpresaError,
  setDB,
  setDBSuccess,
  setDBError,
} = empresasSlice.actions;

export default empresasSlice.reducer;
