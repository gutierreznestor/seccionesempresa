import { useDispatch } from 'react-redux';
import { useSelectEmpresas } from '../selectors/useSelectEmpresas';
import { setDB } from '../store/empresas';

const useSetEmpresa = () => {
  const dispatch = useDispatch();
  const { empresas, empresasDropdown, DB } = useSelectEmpresas();

  const setEmpresa = (db) => {
    dispatch(setDB(db));
  }

  return {
    data: {
      empresas,
      empresasDropdown,
      DB,
    },
    handlers: {
      setEmpresa,
    },
  }
};

export default useSetEmpresa;
