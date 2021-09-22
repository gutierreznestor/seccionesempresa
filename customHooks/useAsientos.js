import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelectAsientos } from '../selectors';
import {
  newAsiento,
  getAsientos,
  deleteAsiento as deleteA
} from '../store/asientos';

const useAsientos = ({ db, user }) => {
  const dispatch = useDispatch();
  const {
    asientos,
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

  return {
    data: {
      asientos,
      errorMessage,
      loading,
      message,
    },
    handlers: {
      createAsiento,
      deleteAsiento,
      fetchAsientos,
    },
  }
};

export default useAsientos;
