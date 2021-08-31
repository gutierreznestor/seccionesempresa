import { useDispatch } from 'react-redux';
import { useSelectEmpresas } from '../selectors/useSelectEmpresas';
import { newSeccionEmpresa } from '../store/empresas';

const useCreateSeccionEmpresa = () => {
  const dispatch = useDispatch();
  const { message, errorMessage } = useSelectEmpresas();

  const createSeccionEmpresa = ({ Nombre, DB }) => {
    dispatch(newSeccionEmpresa({ Nombre, DB }));
  }

  return {
    data: {
      message,
      errorMessage,
    },
    handlers: {
      createSeccionEmpresa,
    }
  }
}

export default useCreateSeccionEmpresa;
