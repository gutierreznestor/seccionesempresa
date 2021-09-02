import { createSlice } from "@reduxjs/toolkit";

export const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState: {
    list: [],
    loading: false,
    message: '',
    errorMessage: '',
    currentUsuario: null,
  },
  reducers: {
    deleteUsuario(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    deleteUsuarioSuccess(state) {
      state.loading = false;
      state.currentUsuario = null;
    },
    deleteUsuarioError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
      state.currentUsuario = null;
    },
    getUsuarios(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    getUsuariosSuccess(state, { payload }) {
      state.loading = false;
      state.list = payload;
    },
    getUsuariosError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
    newUsuario(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    newUsuarioSuccess(state, { payload }) {
      state.loading = false;
      state.currentUsuario = payload;
    },
    newUsuarioError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
      state.currentUsuario = null;
    },
  },
});

export const {
  deleteUsuario,
  deleteUsuarioSuccess,
  deleteUsuarioError,
  getUsuarios,
  getUsuariosSuccess,
  getUsuariosError,
  newUsuario,
  newUsuarioSuccess,
  newUsuarioError,
} = usuariosSlice.actions;

export default usuariosSlice.reducer;
