import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectDiarioMayor } from '../selectors';
import {
  getRegistros,
  registerAsiento as registerA
} from '../store/diarioMayor';

const useDiarioMayor = ({ db, user }) => {
  const dispatch = useDispatch();
  const {
    diarioMayorList,
    diferencia,
    errorMessage,
    loading,
    message,
  } = useSelectDiarioMayor();

  const fetchDiarioMayor = ({ FechaDesde, FechaHasta }) => {
    dispatch(getRegistros({ db, FechaDesde, FechaHasta }));
  }

  const registerAsiento = (data) => {
    dispatch(registerA({ ...data, db, user }));
  }

  return {
    data: {
      diarioMayorList,
      diferencia,
      errorMessage,
      loading,
      message,
    },
    handlers: {
      registerAsiento,
      fetchDiarioMayor,
    },
  }
};

export default useDiarioMayor;
