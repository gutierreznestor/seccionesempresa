import { createSlice } from "@reduxjs/toolkit";

export const logUsuariosSlice = createSlice({
  name: 'logsUsuarios',
  initialState: {
    list: [],
    loading: false,
    message: '',
    errorMessage: '',
  },
  reducers: {
    newLogUsuario(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    newLogUsuarioSuccess(state, { payload }) {
      state.loading = false;
      state.list = payload;
    },
    newLogUsuarioError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
    getLogsUsuarios(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    getLogsUsuariosSuccess(state, { payload }) {
      state.loading = false;
      state.list = payload;
    },
    getLogsUsuariosError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
  },
});

export const {
  newLogUsuario,
  newLogUsuarioSuccess,
  newLogUsuarioError,
  getLogsUsuarios,
  getLogsUsuariosSuccess,
  getLogsUsuariosError,
} = logUsuariosSlice.actions;

export default logUsuariosSlice.reducer;
