import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectContabilidad } from '../selectors';
import { editContabilidad as editConta, getContabilidad } from '../store/contabilidad';

const useContabilidad = ({ db }) => {
  const dispatch = useDispatch();
  const {
    errorMessage,
    message,
    currentContabilidad,
  } = useSelectContabilidad();

  const editContabilidad = (data) => {
    dispatch(editConta({ ...data, db }));
  }

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
      editContabilidad,
      fetchContabilidad,
    },
  }
};

export default useContabilidad;
