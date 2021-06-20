import React, { useEffect, useState } from 'react'

import ErrorMessage from '../components/ErrorMessage/ErrorMessage.component';
import Layout from '../components/Layout'
import SeccionesEmpresaList from '../components/SeccionesEmpresaList/SeccionesEmpresaList.component'
import EmpleadosList from '../components/EmpleadosList/EmpleadosList.component';
import { getSeccionesEmpresa } from '../services/seccionesEmpresa.service';
import { getEmpleados } from '../services/empleados.service';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [seccionesList, setSeccionesList] = useState([]);
  const [empleadosList, setEmpleadosList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchSeccionesEmpresa = async () => {
    setLoading(true);
    const data = await getSeccionesEmpresa();
    if (data.errorMessage) return setErrorMessage(data.errorMessage)
    setLoading(false)
    setSeccionesList(data);
  }

  const fetchEmpleados = async () => {
    setLoading(true);
    const data = await getEmpleados();
    setLoading(false)
    if (data.errorMessage) return setErrorMessage(data.errorMessage)
    setEmpleadosList(data);
  }

  useEffect(() => {
    fetchSeccionesEmpresa();
    fetchEmpleados();
    return () => {
      setErrorMessage('');
    }
  }, []);

  return (
    <Layout title="Home">
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <h2>Secciones empresa</h2>
      {loading ?
        <span>Cargando...</span> :
        !errorMessage && <SeccionesEmpresaList list={seccionesList} readonly />
      }
      <h2>Empleados</h2>
      {loading ?
        <span>Cargando...</span> :
        !errorMessage && <EmpleadosList list={empleadosList} readonly />
      }
    </Layout>
  )
}

export default Home;
