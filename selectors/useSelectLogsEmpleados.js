import { useSelector } from "react-redux";

export const useSelectLogsEmpleados = () => {
  const { logsEmpleados } = useSelector(state => state);
  return {
    logsEmpleados: logsEmpleados?.list,
    loading: logsEmpleados?.loading,
    message: logsEmpleados?.message,
    errorMessage: logsEmpleados?.errorMessage,
  };
}
