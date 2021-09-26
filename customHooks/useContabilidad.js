import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectContabilidad } from '../selectors';
import { getContabilidad } from '../store/contabilidad';

const useContabilidad = ({ db }) => {
  const dispatch = useDispatch();
  const {
    errorMessage,
    message,
    currentContabilidad,
  } = useSelectContabilidad();

  const fetchContabilidad = () => {
    dispatch(getContabilidad(db));
  }

  return {
    data: {
      errorMessage,
      message,
      currentContabilidad,
    },
    handlers: {
      fetchContabilidad,
    },
  }
};

export default useContabilidad;
