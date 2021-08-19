import React from 'react';
import { getEmpresas } from '../services/empresas.service';

const apiToDropdown = (list = []) => {
  return list.map(item => ({
    label: item.Empresa,
    value: item.idEmpresa,
  }));
}

const useGetEmpresas = () => {
  const [empresas, setEmpresas] = React.useState([]);
  const fetch = async () => {
    const response = await getEmpresas();
    setEmpresas(apiToDropdown(response));
  }
  return {
    data: {
      empresas,
    },
    handlers: {
      fetch,
    },
  }
};

export default useGetEmpresas;
