import React, { useEffect, useState } from 'react'

import ErrorMessage from '../components/ErrorMessage/ErrorMessage.component';
import Layout from '../components/Layout'
import SeccionesEmpresaList from '../components/SeccionesEmpresaList';
import EmpleadosList from '../components/EmpleadosList';
import { getSeccionesEmpresa } from '../services/seccionesEmpresa.service';
import { getEmpleados } from '../services/empleados.service';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [seccionesList, setSeccionesList] = useState([]);
  const [empleadosList, setEmpleadosList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchSeccionesEmpresa = async () => {
    setLoading(true);
    const res = await getSeccionesEmpresa();
    setLoading(false)
    const data = await res.json()
    setSeccionesList(data);
  }

  const fetchEmpleados = async () => {
    setLoading(true);
    const res = await getEmpleados();
    setLoading(false)
    const data = await res.json()
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
      { errorMessage && <ErrorMessage message={errorMessage} />}
      <h2>Secciones empresa</h2>
      { loading ?
        <span>Cargando...</span> :
        <SeccionesEmpresaList list={seccionesList} readonly />
      }
      <h2>Empleados</h2>
      { loading ?
        <span>Cargando...</span> :
        <EmpleadosList list={empleadosList} readonly />
      }
    </Layout>
  )
}

export default Home;
