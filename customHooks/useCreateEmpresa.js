import React from 'react';
import Router from 'next/router';

import { nuevaEmpresa } from "../services/empresas.service";
import { setEmpresa } from '../services/auth.service';

const useCreateEmpresa = () => {
  const [errorMessage, setErrorMessage] = React.useState('');
  const [message, setMessage] = React.useState('')
  const createEmpresa = async ({ empresa, DB }) => {
    const response = await nuevaEmpresa({ empresa, DB });
    if (response.errorMessage) {
      setErrorMessage(response.errorMessage);
    } else {
      setMessage('La empresa se creó correctamente.');
      await setEmpresa(DB);
      Router.push('/login');
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
