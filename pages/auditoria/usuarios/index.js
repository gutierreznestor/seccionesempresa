import React from 'react';
import fetch from 'isomorphic-unfetch';
import { verify } from 'jsonwebtoken';

import parseCookies from '../../../helpers/parseCookies';
import { redirectToLogin } from '../../../helpers/redirectToLogin';
import Layout from '../../../components/Layout';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import SearchInput from '../../../components/SearchInput/SearchInput.component';
import DataTable from '../../../components/DataTable/DataTable.component';

const AuditoriaUsuarios = ({ data, user, error }) => {

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
  }

  return (
    <Layout title="Auditoría Usuarios" user={user}>
      {error && <ErrorMessage message={error} />}
      {
        !error &&
        <>
          <SearchInput
            value={query}
            onChange={handleChange}
            placeholder="Buscar" />
          <DataTable
            data={search(data)}
            user={user}
            notAllowed={['auditor']}
            readonly />
        </>
      }
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx.req);
  if (!cookie.auth) {
    redirectToLogin(ctx.res);
  }
  const res = await fetch(`http://localhost:3000/api/logsUsuarios/get-logs-usuarios`, {
    headers: {
      cookie,
    }
  })
  let user = null;
  verify(cookie.auth, 'secret', async (err, decoded) => {
    if (!err && decoded) {
      user = decoded.user;
    }
  });
  let data = await res.json();
  let error = null;
  if (data.errorMessage) {
    error = data.errorMessage;
    data = [];
  }
  return {
    props: { data, user, error },
  }
}

export default AuditoriaUsuarios;
