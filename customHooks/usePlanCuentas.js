import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectPlanCuentas } from '../selectors';
import { getPlanesCuentas, deletePlanCuentas as deletePC, newPlanCuenta } from '../store/planCuentas';

const usePlanCuentas = ({ DB, user }) => {
  const dispatch = useDispatch();
  const {
    errorMessage,
    message,
    planesCuentas,
    planesCuentasDropdown,
  } = useSelectPlanCuentas();

  const fetchPlanCuentas = () => {
    dispatch(getPlanesCuentas(DB));
  }

  const createPlanCuenta = ({ CodigoPlan, Nombre }) => {
    dispatch(newPlanCuenta({ CodigoPlan, DB, Nombre, user }));
  }

  const deletePlanCuenta = ({ idPlanCuenta }) => {
    dispatch(deletePC({ DB, idPlanCuenta, user }));
  }

  return {
    data: {
      errorMessage,
      message,
      planesCuentas,
      planesCuentasDropdown,
    },
    handlers: {
      createPlanCuenta,
      deletePlanCuenta,
      fetchPlanCuentas,
    },
  }
};

export default usePlanCuentas;
