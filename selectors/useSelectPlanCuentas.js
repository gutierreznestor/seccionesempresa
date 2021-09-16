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
    errorMessage: planCuentas?.errorMessage,
    loading: planCuentas?.loading,
    message: planCuentas?.message,
    planesCuentas: planCuentas?.list,
    planesCuentasDropdown: apiToDropdown(planCuentas?.list),
  };
}
