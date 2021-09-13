import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectLogsSeccionesEmpresa } from '../selectors';
import { getLogsSeccionesEmpresa } from '../store/logsSeccionesEmpresa';

const useLogSeccionesEmpresa = () => {
  const dispatch = useDispatch();
  const {
    errorMessage,
    message,
    loading,
    logsSeccionesEmpresa,
  } = useSelectLogsSeccionesEmpresa();

  const fetchLogsSeccionesEmpresa = (DB) => {
    dispatch(getLogsSeccionesEmpresa(DB));
  }

  return {
    data: {
      errorMessage,
      message,
      loading,
      logsSeccionesEmpresa,
    },
    handlers: {
      fetchLogsSeccionesEmpresa,
    },
  }
};

export default useLogSeccionesEmpresa;
