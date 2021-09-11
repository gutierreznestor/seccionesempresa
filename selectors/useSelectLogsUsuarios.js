import { useSelector } from "react-redux";

export const useSelectLogsUsuarios = () => {
  const { logsUsuarios } = useSelector(state => state);
  return {
    logsUsuarios: logsUsuarios?.list,
    loading: logsUsuarios?.loading,
    message: logsUsuarios?.message,
    errorMessage: logsUsuarios?.errorMessage,
  };
}
