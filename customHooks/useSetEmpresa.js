import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectEmpresas } from '../selectors/useSelectEmpresas';
import { setEmpresa as setDB } from '../store/empresas';

const useSetEmpresa = () => {
  const dispatch = useDispatch();
  const { empresas, empresasDropdown } = useSelectEmpresas();

  const setEmpresa = (db) => {
    dispatch(setDB(db));
  }

  return {
    data: {
      empresas,
      empresasDropdown,
    },
    handlers: {
      setEmpresa,
    },
  }
};

export default useSetEmpresa;
