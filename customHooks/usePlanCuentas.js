import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectPlanCuentas } from '../selectors';
import { getPlanesCuentas, deletePlanCuentas as deletePC, newPlanCuenta } from '../store/planCuentas';

const usePlanCuentas = ({ db, user }) => {
  const dispatch = useDispatch();
  const {
    errorMessage,
    message,
    planesCuentas,
    planesCuentasDropdown,
  } = useSelectPlanCuentas();

  const fetchPlanCuentas = () => {
    dispatch(getPlanesCuentas(db));
  }

  const createPlanCuenta = ({ CodigoPlan, Nombre, Tipo }) => {
    dispatch(newPlanCuenta({ CodigoPlan, db, Nombre, Tipo, user }));
  }

  const deletePlanCuenta = ({ idPlanCuenta }) => {
    dispatch(deletePC({ db, idPlanCuenta, user }));
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
