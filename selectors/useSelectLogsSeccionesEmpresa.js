import { useSelector } from "react-redux";

export const useSelectLogsSeccionesEmpresa = () => {
  const { logsSeccionesEmpresa } = useSelector(state => state);
  return {
    logsSeccionesEmpresa: logsSeccionesEmpresa?.list,
    loading: logsSeccionesEmpresa?.loading,
    message: logsSeccionesEmpresa?.message,
    errorMessage: logsSeccionesEmpresa?.errorMessage,
  };
}
