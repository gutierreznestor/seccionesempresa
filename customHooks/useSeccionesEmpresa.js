import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectSeccionesEmpresa } from '../selectors';
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

  const deleteSeccionEmpresa = ({ idSeccionEmpresa, DB }) => {
    dispatch(deleteSE({ idSeccionEmpresa, DB }));
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
      deleteSeccionEmpresa,
    },
  }
};

export default useSeccionesEmpresa;
