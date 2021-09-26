import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectAsientos } from '../selectors';
import {
  editAsiento as editA,
  newAsiento,
  getAsiento,
  getAsientos,
  deleteAsiento as deleteA,
  getProximoAsiento as proximo,
} from '../store/asientos';

const useAsientos = ({ db, user }) => {
  const dispatch = useDispatch();
  const {
    asientos,
    currentAsiento,
    errorMessage,
    loading,
    message,
    proximoAsiento,
  } = useSelectAsientos();

  const fetchAsientos = () => {
    dispatch(getAsientos(db));
  }

  const createAsiento = (data) => {
    dispatch(newAsiento({ ...data, db, user }));
  }

  const deleteAsiento = ({ Numero, Renglon }) => {
    dispatch(deleteA({ db, Numero, Renglon }));
  }

  const editAsiento = (data) => {
    dispatch(editA({ ...data, db, user }));
  }

  const fetchAsiento = ({ Numero, Renglon }) => {
    dispatch(getAsiento({ db, Numero, Renglon }));
  }

  const getProximoAsiento = ({ Numero }) => {
    dispatch(proximo({ db, Numero }));
  }

  return {
    data: {
      asientos,
      currentAsiento,
      errorMessage,
      loading,
      message,
      proximoAsiento,
    },
    handlers: {
      createAsiento,
      deleteAsiento,
      editAsiento,
      fetchAsiento,
      fetchAsientos,
      getProximoAsiento,
    },
  }
};

export default useAsientos;
