import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectLogsEmpleados } from '../selectors';
import { getLogsEmpleados } from '../store/logsEmpleados';

const useLogEmpleados = () => {
  const dispatch = useDispatch();
  const {
    errorMessage,
    message,
    loading,
    logsEmpleados,
  } = useSelectLogsEmpleados();

  const fetchLogsEmpleados = (DB) => {
    dispatch(getLogsEmpleados(DB));
  }

  return {
    data: {
      errorMessage,
      message,
      loading,
      logsEmpleados,
    },
    handlers: {
      fetchLogsEmpleados,
    },
  }
};

export default useLogEmpleados;
