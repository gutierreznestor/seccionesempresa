import { useSelector } from "react-redux";

const apiToDropdown = (list = []) => {
  let toDropdown = list.map(item => ({
    label: item.Nombre,
    value: item.DB,
  }));
  toDropdown = [{ label: "Seleccionar", value: "", disabled: true }].concat(toDropdown);
  return toDropdown;
}

export const useSelectSeccionesEmpresa = () => {
  const { seccionesEmpresa } = useSelector(state => state);
  return {
    seccionesEmpresa: seccionesEmpresa?.list,
    seccionesEmpresaDropdown: apiToDropdown(seccionesEmpresa?.list),
    loading: seccionesEmpresa?.loading,
    message: seccionesEmpresa?.message,
    errorMessage: seccionesEmpresa?.errorMessage,
  };
}
