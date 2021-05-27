import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import Layout from '../../components/Layout';
import AppLink from '../../components/AppLink/AppLink.component';
import EmpleadosList from '../../components/EmpleadosList';
import { deleteEmpleado, getEmpleados } from '../../services/empleados.service';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.component';

const Empleados = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchEmpleados = async () => {
    setLoading(true);
    const res = await getEmpleados();
    setLoading(false)
    const data = await res.json()
    setList(data);
  }

  useEffect(() => {
    fetchEmpleados();
    return () => {
      setErrorMessage('');
    }
  }, []);

  const onDelete = async (id) => {
    const ok = confirm('¿Quieres eliminar al empleado?');
    if (ok) {
      setLoading(true);
      const res = await deleteEmpleado(id);
      const json = await res.json();
      if (!res.ok) setErrorMessage(json.message);
      fetchEmpleados();
      Router.push('empleados');
    }
  }

  return (
    <Layout title='Empleados'>
      <h1>Empleados</h1>
      { errorMessage && <ErrorMessage message={errorMessage} />}
      <AppLink href='/empleados/new' title='Nuevo empleado' />
      { loading ?
        <span>Cargando...</span> :
        <EmpleadosList
          list={list}
          onDelete={onDelete}
        />}
    </Layout>
  )
}

export default Empleados;
