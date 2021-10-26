import React from 'react';
import { useDispatch } from 'react-redux';
import {
  getLibroDiario,
  registrarLibroDiario as registrar,
} from '../store/libroDiario';

const useLibroDiario = ({ db }) => {
  const dispatch = useDispatch();

  const fetchLibroDiario = (data) => {
    dispatch(getLibroDiario({ ...data, db }));
  }

  const registrarLibroDiario = (data) => {
    dispatch(registrar({ ...data, db }));
  }

  return {
    fetchLibroDiario,
    registrarLibroDiario,
  }
};

export default useLibroDiario;
