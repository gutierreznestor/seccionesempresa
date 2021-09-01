import React from 'react';

import Layout from '../../../components/Layout';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import SearchInput from '../../../components/SearchInput/SearchInput.component';
import DataTable from '../../../components/DataTable/DataTable.component';
import useLogEmpleados from '../../../customHooks/useLogEmpleados';
import customServerSideHoc from '../../../helpers/customServerSideProps';

const AuditoriaEmpleados = ({ user, error, db }) => {

  const { data: { logsEmpleados }, handlers: { fetchLogsEmpleados } } = useLogEmpleados();

  const [query, setQuery] = React.useState('');

  const handleChange = (value) => {
    setQuery(value)
  };

  const search = (row) => {
    return row.filter(row =>
      row.idLogEmpleado?.toString().toLowerCase().indexOf(query) > -1 ||
      row.Creado?.toString().toLowerCase().indexOf(query) > -1 ||
      row.Usuario?.toString().toLowerCase().indexOf(query) > -1 ||
      row.idUsuario?.toString().toLowerCase().indexOf(query) > -1 ||
      row.Operacion?.toString().toLowerCase().indexOf(query) > -1 ||
      row.Descripcion?.toString().toLowerCase().indexOf(query) > -1
    );
  }

  React.useEffect(() => {
    fetchLogsEmpleados(db);
  }, []);

  return (
    <Layout title="Auditoría Empleados" user={user}>
      {error && <ErrorMessage message={error} />}
      {
        !error &&
        <>
          <SearchInput
            value={query}
            onChange={handleChange}
            placeholder="Buscar" />
          <DataTable
            data={search(logsEmpleados)}
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

export default AuditoriaEmpleados;
