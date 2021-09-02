import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectUsuarios } from '../selectors';
import { newUsuario } from '../store/usuarios';
import { getUsuarios, deleteUsuario as deleteE } from '../store/usuarios';

const useUsuarios = ({ DB, user }) => {
  const dispatch = useDispatch();
  const {
    usuarios,
    errorMessage,
    loading,
    message,
  } = useSelectUsuarios();

  const fetchUsuarios = () => {
    console.log('DB: ', DB);
    dispatch(getUsuarios(DB));
  }

  const createUsuario = ({ Nombre, Apellido, idSeccionEmpresa }) => {
    dispatch(newUsuario({ DB, Nombre, Apellido, idSeccionEmpresa, user }));
  }

  const deleteUsuario = (idUsuario) => {
    dispatch(deleteE({ DB, idUsuario, user }));
  }

  return {
    data: {
      usuarios,
      errorMessage,
      loading,
      message,
    },
    handlers: {
      createUsuario,
      deleteUsuario,
      fetchUsuarios,
    },
  }
};

export default useUsuarios;
