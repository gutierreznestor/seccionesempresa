import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectEmpleados } from '../selectors';
import { newEmpleado } from '../store/empleados';
import { getSeccionesEmpresa as getSE, deleteSeccionEmpresa as deleteSE } from '../store/seccionesEmpresa';

const useEmpleados = () => {
  const dispatch = useDispatch();
  const {
    empleados,
    errorMessage,
    loading,
    message,
  } = useSelectEmpleados();

  const fetchSeccionesEmpresa = (DB) => {
    dispatch(getSE(DB));
  }

  const createEmpleado = ({ DB, Nombre, Apellido, idSeccionEmpresa }) => {
    dispatch(newEmpleado({ DB, Nombre, Apellido, idSeccionEmpresa }));
  }

  const deleteSeccionEmpresa = ({ DB, idSeccionEmpresa }) => {
    dispatch(deleteSE({ DB, idSeccionEmpresa }));
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
      deleteSeccionEmpresa,
      fetchSeccionesEmpresa,
    },
  }
};

export default useEmpleados;
