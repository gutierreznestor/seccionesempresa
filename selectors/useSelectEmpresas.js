import { useSelector } from "react-redux";

const apiToDropdown = (list = []) => {
  const toDropdown = list.map(item => ({
    label: item.Empresa,
    value: item.DB,
  }));
  return toDropdown;
}

export const useSelectEmpresas = () => {
  const { empresas } = useSelector(state => state);
  return {
    empresas: empresas?.list,
    empresasDropdown: apiToDropdown(empresas?.list),
    loading: empresas?.loading,
    message: empresas?.message,
    errorMessage: empresas?.errorMessage,
  };
}
