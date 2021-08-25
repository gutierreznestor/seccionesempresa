import React from 'react';

import Layout from '../../components/Layout';
import Select from '../../components/Select/Select.component';
import useGetEmpresas from '../../customHooks/useGetEmpresas';
import AppLink from '../../components/AppLink/AppLink.component';
import useSetEmpresa from '../../customHooks/useSetEmpresa';
import parseCookies from '../../helpers/parseCookies';

const SeleccionarEmpresa = ({ db }) => {
  const [enabled, setEnabled] = React.useState(false);

  const {
    data: { empresasDropdown },
    handlers: {
      fetchEmpresas,
    },
  } = useGetEmpresas();

  const {
    data: {
      DB: currentDB
    },
    handlers: {
      setEmpresa,
    },
  } = useSetEmpresa();

  React.useEffect(() => {
    setEmpresa(db);
    fetchEmpresas();
  }, []);

  const onSelect = (value) => {
    setEnabled(true);
    setEmpresa(value);
  }
  return (
    <Layout title='Seleccionar empresa' hideNavbar>
      <h1>Seleccionar empresa</h1>
      <AppLink href='nueva-empresa' title='Crear nueva empresa' bgColor="#168ae9" />
      <Select options={empresasDropdown} onSelect={onSelect} selected={currentDB} />
      <AppLink href='login' title='Continuar' enabled={db || enabled} />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx.req);
  const returnProp = {}
  if (cookie.db) {
    returnProp.db = cookie.db;
  }
  return {
    props: returnProp,
  }
}

export default SeleccionarEmpresa
