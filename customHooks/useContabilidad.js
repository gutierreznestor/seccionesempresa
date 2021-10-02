import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectContabilidad } from '../selectors';
import { editContabilidad as editConta, getContabilidad } from '../store/contabilidad';
import useAsientos from '../customHooks/useAsientos';

const useContabilidad = ({ db }) => {
  const dispatch = useDispatch();
  const {
    currentContabilidad,
    errorMessage,
    message,
    proximoAsiento,
  } = useSelectContabilidad();

  const {
    handlers: {
      getProximoAsiento,
    },
  } = useAsientos({ db });

  const editContabilidad = (data) => {
    dispatch(editConta({ ...data, db }));
  }

  const fetchContabilidad = () => {
    dispatch(getContabilidad(db));
  }

  React.useEffect(() => {
    if (currentContabilidad) {
      getProximoAsiento({ Numero: currentContabilidad.UltimoAsiento });
    }
  }, [currentContabilidad]);

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
