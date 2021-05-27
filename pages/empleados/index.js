import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import Layout from '../../components/Layout';
import AppLink from '../../components/AppLink/AppLink.component';
import EmpleadosList from '../../components/EmpleadosList';
import { deleteEmpleado, getEmpleados } from '../../services/empleados.service';

const Empleados = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const fetchEmpleados = async () => {
    setLoading(true);
    const res = await getEmpleados();
    setLoading(false)
    const data = await res.json()
    setList(data);
  }

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const onDelete = async (id) => {
    const ok = confirm('¿Quieres eliminar al empleado?');
    if (ok) {
      setLoading(true);
      const res = await deleteEmpleado(id);
      const json = await res.json();
      if (!res.ok) throw Error(json.message)
      fetchEmpleados();
      Router.push('empleados');
    }
  }

  const onEdit = (id) => {

  }

  return (
    <Layout title='Empleados'>
      <h1>Empleados</h1>
      <AppLink href='/empleados/new' title='Nuevo empleado' />
      { loading ?
        <span>Cargando...</span> :
        <EmpleadosList
          list={list}
          onDelete={onDelete}
          onEdit={onEdit} />}
    </Layout>
  )
}

export default Empleados;
