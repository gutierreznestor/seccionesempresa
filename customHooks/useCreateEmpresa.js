import React from 'react';
import Router from 'next/router';

import { nuevaEmpresa } from "../services/empresas.service";

const useCreateEmpresa = () => {
  const [errorMessage, setErrorMessage] = React.useState('');
  const [message, setMessage] = React.useState('')
  const createEmpresa = async ({ empresa, DB }) => {
    const response = await nuevaEmpresa({ empresa, DB });
    if (response.errorMessage) {
      setErrorMessage(response.errorMessage);
    } else {
      setMessage('La empresa se creó correctamente.');
      Router.push('/');
    }
  }
  const clearErrorMessage = () => {
    setErrorMessage('');
    setMessage('');
  }

  return {
    data: {
      errorMessage,
      message,
    },
    handlers: {
      createEmpresa,
      clearErrorMessage,
    }
  }
}

export default useCreateEmpresa;
