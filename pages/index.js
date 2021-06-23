import React from 'react';
import Router from 'next/router';

const index = () => {
  React.useEffect(() => {
    Router.push('/secciones-empresa');
  }, [])
  return null
}

export default index
