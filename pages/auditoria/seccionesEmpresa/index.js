import React, { useState } from 'react';

import Layout from '../../../components/Layout';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import DataTable from '../../../components/DataTable/DataTable.component';
import SearchInput from '../../../components/SearchInput/SearchInput.component';
import customServerSideHoc from '../../../helpers/customServerSideProps';
import useLogSeccionesEmpresa from '../../../customHooks/useLogSeccionesEmpresa';

const AuditoriaSeccionesEmpresa = ({ user, error, db }) => {
  const { data: { logsSeccionesEmpresa }, handlers: { fetchLogsSeccionesEmpresa } } = useLogSeccionesEmpresa();
  const [query, setQuery] = useState('');
  const handleChange = (value) => {
    setQuery(value)
  };

  const search = (row) => {
    return row ? row.filter(row =>
      row.Creado?.toString().toLowerCase().indexOf(query) > -1 ||
      row.Usuario?.toString().toLowerCase().indexOf(query) > -1 ||
      row.idUsuario?.toString().toLowerCase().indexOf(query) > -1 ||
      row.Operacion?.toString().toLowerCase().indexOf(query) > -1 ||
      row.Descripcion?.toString().toLowerCase().indexOf(query) > -1
    ) : [];
  }

  React.useEffect(() => {
    fetchLogsSeccionesEmpresa(db);
  }, []);

  return (
    <Layout
      h1Title="Auditoría Secciones empresa"
      title="Auditoría Secciones empresa"
      user={user}>
      {error && <ErrorMessage message={error} />}
      {
        !error &&
        <>
          <SearchInput
            value={query}
            onChange={handleChange}
            placeholder="Buscar" />
          <DataTable
            data={search(logsSeccionesEmpresa)}
            user={user}
            notAllowed={['auditor']}
            allowPrint
            readonly />
        </>
      }
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default AuditoriaSeccionesEmpresa;
