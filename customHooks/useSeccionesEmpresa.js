import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectSeccionesEmpresa } from '../selectors';
import { newSeccionEmpresa } from '../store/empresas';
import { getSeccionesEmpresa as getSE, deleteSeccionEmpresa as deleteSE } from '../store/seccionesEmpresa';

const useSeccionesEmpresa = () => {
  const dispatch = useDispatch();
  const {
    errorMessage,
    message,
    seccionesEmpresa,
    seccionesEmpresaDropdown,
  } = useSelectSeccionesEmpresa();

  const fetchSeccionesEmpresa = (DB) => {
    dispatch(getSE(DB));
  }

  const createSeccionEmpresa = ({ DB, Nombre }) => {
    dispatch(newSeccionEmpresa({ DB, Nombre }));
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
      createSeccionEmpresa,
    },
  }
};

export default useSeccionesEmpresa;
