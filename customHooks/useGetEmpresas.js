import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectEmpresas } from '../selectors/useSelectEmpresas';
import { getEmpresas } from '../store/data/empresas';

const apiToDropdown = (list = []) => {
  const toDropdown = list.map(item => ({
    label: item.Empresa,
    value: item.DB,
  }));
  return toDropdown;
}

const useGetEmpresas = () => {
  const dispatch = useDispatch();
  const { empresas } = useSelectEmpresas();
  const [empresasDropdown, setEmpresasDropdown] = React.useState([]);

  React.useEffect(() => {
    if (empresas?.length) {
      setEmpresasDropdown(apiToDropdown(empresas));
    }
  }, [empresas]);

  const fetchEmpresas = () => {
    dispatch(getEmpresas());
  }

  return {
    data: {
      empresas,
      empresasDropdown,
    },
    handlers: {
      fetchEmpresas,
    },
  }
};

export default useGetEmpresas;
