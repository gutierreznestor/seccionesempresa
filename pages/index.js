import React, { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';

import ErrorMessage from '../components/ErrorMessage/ErrorMessage.component';
import Layout from '../components/Layout'
import SeccionesEmpresaList from '../components/SeccionesEmpresaList/SeccionesEmpresaList.component'
import EmpleadosList from '../components/EmpleadosList/EmpleadosList.component';
import { getSeccionesEmpresa } from '../services/seccionesEmpresa.service';
import { getEmpleados } from '../services/empleados.service';

const Home = ({ listSecciones, listEmpleados }) => {
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    return () => {
      setErrorMessage('');
    }
  }, []);

  return (
    <Layout title="Home">
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <h2>Secciones empresa</h2>
      {
        !errorMessage && <SeccionesEmpresaList list={listSecciones} readonly />
      }
      <h2>Empleados</h2>
      {
        !errorMessage && <EmpleadosList list={listEmpleados} readonly />
      }
    </Layout>
  )
}

Home.getInitialProps = async (ctx) => {
  const cookie = ctx.req?.headers.cookie;
  const respSE = await fetch('http://localhost:3000/api/secciones-empresa/get-secciones-empresa', {
    headers: {
      cookie,
    }
  })
  const listSecciones = await respSE.json();
  const respE = await fetch('http://localhost:3000/api/empleados/get-empleados', {
    headers: {
      cookie,
    }
  })
  const listEmpleados = await respE.json();
  return { listSecciones, listEmpleados };
}

export default Home;
