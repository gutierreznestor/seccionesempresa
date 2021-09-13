import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectEmpleados } from '../selectors';
import { newEmpleado } from '../store/empleados';
import { getEmpleados, deleteEmpleado as deleteE } from '../store/empleados';

const useEmpleados = ({ DB, user }) => {
  const dispatch = useDispatch();
  const {
    empleados,
    errorMessage,
    loading,
    message,
  } = useSelectEmpleados();

  const fetchEmpleados = () => {
    dispatch(getEmpleados(DB));
  }

  const createEmpleado = ({ Nombre, Apellido, idSeccionEmpresa }) => {
    dispatch(newEmpleado({ DB, Nombre, Apellido, idSeccionEmpresa, user }));
  }

  const deleteEmpleado = (idEmpleado) => {
    dispatch(deleteE({ DB, idEmpleado, user }));
  }

  return {
    data: {
      empleados,
      errorMessage,
      loading,
      message,
    },
    handlers: {
      createEmpleado,
      deleteEmpleado,
      fetchEmpleados,
    },
  }
};

export default useEmpleados;
