import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  loading: false,
};

export const empresasSlice = createSlice({
  name: 'empresas',
  initialState,
  reducers: {
    getEmpresas: (state, _) => {
      state.loading = true;
    },
    getEmpresasSuccess: (state, { payload }) => {
      state.list = payload;
      state.loading = false;
    },
    getEmpresasError: (state, _) => {
      state.loading = false;
    },
    newEmpresa: (state, _) => {
      state.loading = true;
    },
    newEmpresaSuccess: (state, { payload }) => {
      state.list = payload;
      state.loading = false;
    },
    newEmpresaError: (state, _) => {
      state.loading = false;
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
