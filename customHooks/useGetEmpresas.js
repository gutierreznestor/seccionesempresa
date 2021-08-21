import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectEmpresas } from '../selectors/useSelectEmpresas';
import { getEmpresas } from '../store/data/empresas';



const useGetEmpresas = () => {
  const dispatch = useDispatch();
  const { empresas } = useSelectEmpresas();

  const fetchEmpresas = () => {
    dispatch(getEmpresas());
  }

  return {
    data: {
      empresas,
    },
    handlers: {
      fetchEmpresas,
    },
  }
};

export default useGetEmpresas;
