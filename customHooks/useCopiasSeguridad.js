import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectCopiasSeguridad } from '../selectors';
import { getCopiasSeguridad } from '../store/copiasSeguridad';

const useCopiasSeguridad = ({ db }) => {
  const dispatch = useDispatch();
  const { copiasSeguridad, errorMessage } = useSelectCopiasSeguridad();

  const fetchCopiasSeguridad = () => {
    dispatch(getCopiasSeguridad(db));
  }

  return {
    data: {
      copiasSeguridad,
      errorMessage,
    },
    handlers: {
      fetchCopiasSeguridad,
    },
  }
};

export default useCopiasSeguridad;
