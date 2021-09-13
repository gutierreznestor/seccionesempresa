import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectUsuarios } from '../selectors';
import { newUsuario } from '../store/usuarios';
import { getUsuarios, deleteUsuario as deleteE, getUsuario } from '../store/usuarios';

const useUsuarios = ({ db, user }) => {
  const dispatch = useDispatch();
  const {
    usuarios,
    errorMessage,
    loading,
    message,
  } = useSelectUsuarios();

  const fetchUsuarios = () => {
    dispatch(getUsuarios(db));
  }

  const fetchUsuario = (id) => {
    dispatch(getUsuario({ db, id }));
  }

  const createUsuario = ({ Nombre, Apellido, Usuario, Password }) => {
    dispatch(newUsuario({ db, Nombre, Apellido, Usuario, Password, user }));
  }

  const deleteUsuario = (idUsuario) => {
    dispatch(deleteE({ db, idUsuario, user }));
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
      fetchUsuario,
      fetchUsuarios,
    },
  }
};

export default useUsuarios;
