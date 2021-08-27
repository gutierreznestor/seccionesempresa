import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectSeccionesEmpresa, useSelectEmpresas } from '../selectors';
import { getSeccionesEmpresa } from '../store/seccionesEmpresa';

const useGetSeccionesEmpresa = () => {
  const dispatch = useDispatch();
  const {
    errorMessage,
    message,
    seccionesEmpresa,
    seccionesEmpresaDropdown,
  } = useSelectSeccionesEmpresa();

  const fetchSeccionesEmpresa = (DB) => {
    dispatch(getSeccionesEmpresa(DB));
  }

  return {
    data: {
      errorMessage,
      message,
      seccionesEmpresa,
      seccionesEmpresaDropdown,
    },
    handlers: {
      fetchSeccionesEmpresa,
    },
  }
};

export default useGetSeccionesEmpresa;
