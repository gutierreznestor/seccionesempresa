import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  loading: false,
  message: '',
  errorMessage: '',
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
      state.list = payload;
      state.loading = false;
      state.message = 'New empresa ok';
    },
    newEmpresaError: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload;
    }
  }
});

export const {
  getEmpresas,
  getEmpresasSuccess,
  getEmpresasError,
  newEmpresa,
  newEmpresaSuccess,
  newEmpresaError,
} = empresasSlice.actions;

export default empresasSlice.reducer;
