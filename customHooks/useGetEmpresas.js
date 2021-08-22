import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectEmpresas } from '../selectors/useSelectEmpresas';
import { getEmpresas } from '../store/empresas';

const useGetEmpresas = () => {
  const dispatch = useDispatch();
  const { empresas, empresasDropdown } = useSelectEmpresas();

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
