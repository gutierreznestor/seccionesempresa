import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectCopiasSeguridad } from '../selectors';
import { getCopiasSeguridad, newCopiaSeguridad } from '../store/copiasSeguridad';

const useCopiasSeguridad = ({ db }) => {
  const dispatch = useDispatch();
  const { copiasSeguridad, errorMessage } = useSelectCopiasSeguridad();

  const fetchCopiasSeguridad = () => {
    dispatch(getCopiasSeguridad(db));
  }

  const newBackup = () => {
    dispatch(newCopiaSeguridad({ db }));
  }

  return {
    data: {
      copiasSeguridad,
      errorMessage,
    },
    handlers: {
      fetchCopiasSeguridad,
      newBackup,
    },
  }
};

export default useCopiasSeguridad;
