import { useDispatch } from 'react-redux';
import { useSelectPlanCuentas } from '../selectors';
import {
  getPlanCuenta,
  getPlanesCuentas,
  deletePlanCuentas as deletePC,
  newPlanCuenta,
} from '../store/planCuentas';

const usePlanCuentas = ({ db, user }) => {
  const dispatch = useDispatch();
  const {
    currentPlanCuenta,
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

  const fetchPlanCuenta = (id) => {
    dispatch(getPlanCuenta({ db, id }));
  }

  return {
    data: {
      currentPlanCuenta,
      errorMessage,
      message,
      planesCuentas,
      planesCuentasDropdown,
    },
    handlers: {
      createPlanCuenta,
      deletePlanCuenta,
      fetchPlanCuenta,
      fetchPlanCuentas,
    },
  }
};

export default usePlanCuentas;
