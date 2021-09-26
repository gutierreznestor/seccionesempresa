import getChildren from './getChildren';

const canEditPlanCuenta = async ({ db, CodigoPlan }) => {
  const children = await getChildren({ db, CodigoPlan });
  console.log('children: ', children);
  if (children.length) {
    return false;
  }
  return true;
};

export default canEditPlanCuenta;
