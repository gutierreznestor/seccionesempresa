import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectAsientos } from '../selectors';
import {
  newAsiento,
  getAsiento,
  getAsientos,
  deleteAsiento as deleteA
} from '../store/asientos';

const useAsientos = ({ db, user }) => {
  const dispatch = useDispatch();
  const {
    asientos,
    currentAsiento,
    errorMessage,
    loading,
    message,
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

  const fetchAsiento = ({ Numero, Renglon }) => {
    dispatch(getAsiento({ db, Numero, Renglon }));
  }

  return {
    data: {
      asientos,
      currentAsiento,
      errorMessage,
      loading,
      message,
    },
    handlers: {
      createAsiento,
      deleteAsiento,
      fetchAsiento,
      fetchAsientos,
    },
  }
};

export default useAsientos;
