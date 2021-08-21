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
    getEmpresasFailure: (state, _) => {
      state.loading = false;
    }
  }
});

export const { getEmpresas, getEmpresasSuccess, getEmpresasFailure } = empresasSlice.actions;

export default empresasSlice.reducer;
