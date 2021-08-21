import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { verify } from 'jsonwebtoken';

import Layout from '../../../components/Layout';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import parseCookies from '../../../helpers/parseCookies';
import { redirectToLogin } from '../../../helpers/redirectToLogin';
import DataTable from '../../../components/DataTable/DataTable.component';
import SearchInput from '../../../components/SearchInput/SearchInput.component';

const AuditoriaSeccionesEmpresa = ({ data, user, error }) => {
  const [query, setQuery] = useState('');

  const handleChange = (value) => {
    setQuery(value)
  };

  const search = (row) => {
    return row.filter(row =>
      row.Creado?.toString().toLowerCase().indexOf(query) > -1 ||
      row.Usuario?.toString().toLowerCase().indexOf(query) > -1 ||
      row.idUsuario?.toString().toLowerCase().indexOf(query) > -1 ||
      row.Operacion?.toString().toLowerCase().indexOf(query) > -1 ||
      row.Descripcion?.toString().toLowerCase().indexOf(query) > -1
    );
  }

  return (
    <Layout title="Auditoría Secciones empresa" user={user}>
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
    return redirectToLogin();
  }
  const res = await fetch(`http://localhost:3000/api/logsSeccionesEmpresa/get-logs-secciones-empresa?db=${cookie?.db}`, {
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

export default AuditoriaSeccionesEmpresa;
