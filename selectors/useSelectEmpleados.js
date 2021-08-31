import { useSelector } from "react-redux";

export const useSelectEmpleados = () => {
  const { empleados } = useSelector(state => state);
  return {
    empleados: empleados?.list,
    loading: empleados?.loading,
    message: empleados?.message,
    errorMessage: empleados?.errorMessage,
  };
}
