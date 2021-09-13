import { useDispatch } from 'react-redux';
import { useSelectEmpresas } from '../selectors/useSelectEmpresas';
import { newEmpresa } from '../store/empresas';

const useCreateEmpresa = () => {
  const dispatch = useDispatch();
  const { message, errorMessage } = useSelectEmpresas();

  const createEmpresa = ({ empresa, DB }) => {
    dispatch(newEmpresa({ empresa: empresa?.toLowerCase(), DB }));
  }

  return {
    data: {
      message,
      errorMessage,
    },
    handlers: {
      createEmpresa,
    }
  }
}

export default useCreateEmpresa;
