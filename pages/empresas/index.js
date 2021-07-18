import React from 'react';
import Select from '../../components/Select/Select.component';

import Layout from '../../components/Layout';
import Button from '../../components/Button/Button.component';

const options = [
  { label: 'empresa 1', value: 'empresa1' },
  { label: 'empresa 2', value: 'empresa2' },
  { label: 'empresa 3', value: 'empresa3' },
  { label: 'empresa 4', value: 'empresa4' },
];

const Empresas = () => {
  const [selected, setSelected] = React.useState(null);
  const onSelect = (value) => {
    setSelected(value);
  }
  const selectEmpresa = () => {
    console.log({ selected });
  }
  return (
    <Layout title="Seleccionar empresa" hideNavbar>
      <h1>Seleccionar empresa</h1>
      <Select options={options} onSelect={onSelect} />
      <Button label="Aceptar" onClick={selectEmpresa} />
    </Layout>
  )
}



export default Empresas;
