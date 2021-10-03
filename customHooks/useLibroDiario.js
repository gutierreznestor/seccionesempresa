import React from 'react';
import { useDispatch } from 'react-redux';
import {
  getLibroDiario,
} from '../store/libroDiario';

const useLibroDiario = ({ db }) => {
  const dispatch = useDispatch();

  const fetchLibroDiario = (data) => {
    dispatch(getLibroDiario({ ...data, db }));
  }

  return {
    fetchLibroDiario,
  }
};

export default useLibroDiario;
