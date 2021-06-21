import React, { useState, useEffect } from 'react';

import { getLogsPerfiles } from '../../../services/logs.service';

import Layout from '../../../components/Layout';
import LogsPerfilesList from '../../../components/LogsPerfilesList/LogsPerfilesList.component';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';

const AuditoriaPerfiles = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [logsPerfiles, setLogsPerfiles] = useState([]);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await getLogsPerfiles();
      if (data.errorMessage) return setErrorMessage(data.errorMessage)
      setLoading(false)
      setLogsPerfiles(data);
    }
    getData();
  }, []);
  return (
    <Layout title="Auditoría Empleados">
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {loading ?
        <span>Cargando...</span> :
        !errorMessage && <LogsPerfilesList list={logsPerfiles} />
      }
    </Layout>
  )
}

export default AuditoriaPerfiles;
