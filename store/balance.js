import { createSlice } from "@reduxjs/toolkit";

export const balanceSlice = createSlice({
  name: 'balance',
  initialState: {
    errorMessage: '',
    list: [],
    loading: false,
    message: '',
  },
  reducers: {
    getBalance(state, action) {
      state.loading = true;
      state.message = '';
      state.errorMessage = '';
    },
    getBalanceSuccess(state, { payload }) {
      state.loading = false;
      state.list = payload;
    },
    getBalanceError(state, { payload }) {
      state.loading = false;
      state.errorMessage = payload;
    },
  },
});

export const {
  getBalance,
  getBalanceSuccess,
  getBalanceError,
} = balanceSlice.actions;

export default balanceSlice.reducer;

