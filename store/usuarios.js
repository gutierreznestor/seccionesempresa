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
    getUsuario(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    getUsuarioSuccess(state, { payload }) {
      state.loading = false;
      state.currentUsuario = payload;
    },
    getUsuarioError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
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
  getUsuario,
  getUsuarioSuccess,
  getUsuarioError,
  getUsuarios,
  getUsuariosSuccess,
  getUsuariosError,
  newUsuario,
  newUsuarioSuccess,
  newUsuarioError,
} = usuariosSlice.actions;

export default usuariosSlice.reducer;
