import getChildren from './getChildren';

const canEditPlanCuenta = async ({ db, CodigoPlan }) => {
  const children = await getChildren({ db, CodigoPlan });
  if (children.length) {
    return false;
  }
  return true;
};

export default canEditPlanCuenta;
