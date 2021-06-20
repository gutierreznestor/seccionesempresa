import React, { useState, useEffect } from 'react';

import { getLogsUsuarios } from '../../../services/logs.service';

import Layout from '../../../components/Layout';
import LogsEmpleadosList from '../../../components/LogsEmpleadosList/LogsEmpleadosList.component';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';

const AuditoriaEmpleados = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [logsUsuarios, setLogsUsuarios] = useState([]);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await getLogsUsuarios();
      if (data.errorMessage) return setErrorMessage(data.errorMessage)
      setLoading(false)
      setLogsUsuarios(data);
    }
    getData();
  }, []);
  return (
    <Layout title="Auditoría Empleados">
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {loading ?
        <span>Cargando...</span> :
        !errorMessage && <LogsEmpleadosList list={logsUsuarios} />
      }
    </Layout>
  )
}

export default AuditoriaEmpleados;
