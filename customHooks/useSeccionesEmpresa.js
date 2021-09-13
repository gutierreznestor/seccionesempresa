import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectSeccionesEmpresa } from '../selectors';
import { newSeccionEmpresa } from '../store/seccionesEmpresa';
import { getSeccionesEmpresa as getSE, deleteSeccionEmpresa as deleteSE } from '../store/seccionesEmpresa';

const useSeccionesEmpresa = ({ DB, user }) => {
  const dispatch = useDispatch();
  const {
    errorMessage,
    message,
    seccionesEmpresa,
    seccionesEmpresaDropdown,
  } = useSelectSeccionesEmpresa();

  const fetchSeccionesEmpresa = () => {
    dispatch(getSE(DB));
  }

  const createSeccionEmpresa = ({ Nombre }) => {
    dispatch(newSeccionEmpresa({ DB, Nombre, user }));
  }

  const deleteSeccionEmpresa = ({ idSeccionEmpresa }) => {
    dispatch(deleteSE({ DB, idSeccionEmpresa, user }));
  }

  return {
    data: {
      errorMessage,
      message,
      seccionesEmpresa,
      seccionesEmpresaDropdown,
    },
    handlers: {
      createSeccionEmpresa,
      deleteSeccionEmpresa,
      fetchSeccionesEmpresa,
    },
  }
};

export default useSeccionesEmpresa;
