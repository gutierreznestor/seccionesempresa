import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectContabilidad } from '../selectors';
import { editContabilidad as editConta, getContabilidad } from '../store/contabilidad';

const useContabilidad = ({ db }) => {
  const dispatch = useDispatch();
  const {
    currentContabilidad,
    errorMessage,
    message,
    proximoAsiento,
  } = useSelectContabilidad();

  const editContabilidad = (data) => {
    dispatch(editConta({ ...data, db }));
  }

  const fetchContabilidad = () => {
    dispatch(getContabilidad(db));
  }

  return {
    data: {
      currentContabilidad,
      errorMessage,
      message,
      proximoAsiento,
    },
    handlers: {
      editContabilidad,
      fetchContabilidad,
    },
  }
};

export default useContabilidad;
