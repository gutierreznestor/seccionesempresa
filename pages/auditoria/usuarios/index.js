import React from 'react';

import Layout from '../../../components/Layout';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import SearchInput from '../../../components/SearchInput/SearchInput.component';
import DataTable from '../../../components/DataTable/DataTable.component';
import customServerSideHoc from '../../../helpers/customServerSideProps';
import useLogUsuarios from '../../../customHooks/useLogUsuarios';

const AuditoriaUsuarios = ({ db, user }) => {
  const {
    data: { logsUsuarios, errorMessage },
    handlers: { fetchLogsUsuarios }
  } = useLogUsuarios();

  const [query, setQuery] = React.useState('');

  const handleChange = (value) => {
    setQuery(value)
  };

  const search = (row) => {
    return row.filter(row =>
      row.idLogUsuario?.toString().toLowerCase().indexOf(query) > -1 ||
      row.Creado?.toString().toLowerCase().indexOf(query) > -1 ||
      row.Usuario?.toString().toLowerCase().indexOf(query) > -1 ||
      row.idUsuario?.toString().toLowerCase().indexOf(query) > -1 ||
      row.Operacion?.toString().toLowerCase().indexOf(query) > -1 ||
      row.Descripcion?.toString().toLowerCase().indexOf(query) > -1
    );
  };

  React.useEffect(() => {
    fetchLogsUsuarios(db);
  }, []);

  return (
    <Layout
      h1Title="Auditoría Usuarios"
      title="Auditoría Usuarios"
      user={user}
    >
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {
        !errorMessage &&
        <>
          <SearchInput
            value={query}
            onChange={handleChange}
            placeholder="Buscar" />
          <DataTable
            data={search(logsUsuarios)}
            user={user}
            notAllowed={['auditor']}
            readonly />
        </>
      }
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default AuditoriaUsuarios;
