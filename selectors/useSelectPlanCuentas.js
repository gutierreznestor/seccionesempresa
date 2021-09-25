import { useSelector } from "react-redux";

const apiToDropdown = (list = []) => {
  let toDropdown = list.map(item => ({
    label: item.Nombre,
    value: item.id,
  }));
  toDropdown = [{ label: "Seleccionar", value: "", disabled: true }].concat(toDropdown);
  return toDropdown;
}

export const useSelectPlanCuentas = () => {
  const { planCuentas } = useSelector(state => state);
  return {
    currentPlanCuenta: planCuentas.currentPlanCuenta,
    errorMessage: planCuentas?.errorMessage,
    loading: planCuentas?.loading,
    message: planCuentas?.message,
    nextPlanCuenta: planCuentas?.nextPlanCuenta,
    planesCuentas: planCuentas?.list,
    planesCuentasDropdown: apiToDropdown(planCuentas?.list),
  };
}
