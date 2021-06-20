import React, { useState, useEffect } from 'react';

import { getLogsSeccionesEmpresa } from '../../../services/logs.service';

import Layout from '../../../components/Layout';
import LogsSeccionesEmpresaList from '../../../components/LogsSeccionesEmpresaList/LogsSeccionesEmpresaList.component';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';

const AuditoriaSeccionesEmpresa = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [logsSeccionesEmpresa, setLogsSeccionesEmpresa] = useState([]);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await getLogsSeccionesEmpresa();
      if (data.errorMessage) return setErrorMessage(data.errorMessage)
      setLoading(false)
      setLogsSeccionesEmpresa(data);
    }
    getData();
  }, []);
  return (
    <Layout title="Auditoría Secciones empresa">
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {loading ?
        <span>Cargando...</span> :
        !errorMessage && <LogsSeccionesEmpresaList list={logsSeccionesEmpresa} />
      }
    </Layout>
  )
}

export default AuditoriaSeccionesEmpresa;
