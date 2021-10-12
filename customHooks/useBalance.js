import React from 'react';
import { useDispatch } from 'react-redux';
import {
  getBalance,
} from '../store/balance';

const useBalance = ({ db, user }) => {
  const dispatch = useDispatch();

  const fetchBalance = ({ FechaDesde, FechaHasta }) => {
    dispatch(getBalance({ db, FechaDesde, FechaHasta }));
  }

  return {
    fetchBalance,
  }
};

export default useBalance;

/*
const {
    balanceList,
    errorMessage,
    loading,
    message,
  } = useSelectBalance();
*/