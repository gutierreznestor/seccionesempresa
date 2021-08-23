import React from 'react';

import Layout from '../../components/Layout';
import Select from '../../components/Select/Select.component';
import useGetEmpresas from '../../customHooks/useGetEmpresas';
import AppLink from '../../components/AppLink/AppLink.component';
import useSetEmpresa from '../../customHooks/useSetEmpresa';

const SeleccionarEmpresa = ({ user }) => {
  const [selected, setSelected] = React.useState('');
  const [enabled, setEnabled] = React.useState(false);

  const {
    data: { empresasDropdown },
    handlers: {
      fetchEmpresas,
    },
  } = useGetEmpresas();

  const {
    handlers: {
      setEmpresa,
    },
  } = useSetEmpresa();

  React.useEffect(() => {
    fetchEmpresas();
  }, []);

  const onSelect = (value) => {
    setEnabled(true);
    setSelected(value);
    setEmpresa(value);
  }

  return (
    <Layout title='Seleccionar empresa' user={user} hideNavbar>
      <h1>Seleccionar empresa</h1>
      <AppLink href='nueva-empresa' title='Crear nueva empresa' bgColor="#168ae9" />
      <Select options={empresasDropdown} onSelect={onSelect} selected={selected} />
      <AppLink href='login' title='Continuar' enabled={enabled} />
    </Layout>
  )
}

export default SeleccionarEmpresa
