import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectEmpleados } from '../selectors/useSelectEmpleados';
import { getEmpleados } from '../store/empleados';

const useGetEmpleados = () => {
  const dispatch = useDispatch();
  const { empleados } = useSelectEmpleados();

  const fetchEmpleados = (db) => {
    dispatch(getEmpleados(db));
  }

  return {
    data: {
      empleados,
    },
    handlers: {
      fetchEmpleados,
    },
  }
};

export default useGetEmpleados;
