import { useDispatch } from 'react-redux';
import { useSelectPlanCuentas } from '../selectors';
import {
  getPlanCuenta,
  getPlanesCuentas,
  deletePlanCuenta as deletePC,
  newPlanCuenta,
  editPlanCuenta as editPC,
  getNextPlanCuenta as getNexPC,
} from '../store/planCuentas';

const usePlanCuentas = ({ db, user }) => {
  const dispatch = useDispatch();
  const {
    currentPlanCuenta,
    errorMessage,
    message,
    nextPlanCuenta,
    planesCuentas,
    planesCuentasDropdown,
  } = useSelectPlanCuentas();

  const fetchPlanCuentas = () => {
    dispatch(getPlanesCuentas(db));
  }

  const createPlanCuenta = ({ CodigoPlan, Nombre, Tipo }) => {
    dispatch(newPlanCuenta({ CodigoPlan, db, Nombre, Tipo, user }));
  }

  const deletePlanCuenta = ({ id }) => {
    dispatch(deletePC({ db, id }));
  }

  const fetchPlanCuenta = (id) => {
    dispatch(getPlanCuenta({ db, id }));
  }

  const editPlanCuenta = ({ id, CodigoPlan, Nombre, Tipo }) => {
    dispatch(editPC({ id, CodigoPlan, db, Nombre, Tipo, user }));
  }

  const getNextPlanCuenta = (id) => {
    dispatch(getNexPC({ db, id }));
  }

  return {
    data: {
      currentPlanCuenta,
      errorMessage,
      message,
      nextPlanCuenta,
      planesCuentas,
      planesCuentasDropdown,
    },
    handlers: {
      createPlanCuenta,
      deletePlanCuenta,
      editPlanCuenta,
      fetchPlanCuenta,
      fetchPlanCuentas,
      getNextPlanCuenta,
    },
  }
};

export default usePlanCuentas;
