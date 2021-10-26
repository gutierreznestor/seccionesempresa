import React from 'react';
import Layout from '../../components/Layout'
import AppLink from '../../components/AppLink/AppLink.component';
import customServerSideHoc from '../../helpers/customServerSideProps';

const Contabilidad = ({ user }) => {

  return (
    <Layout title='Contabilidad' user={user}>
      <AppLink href='/contabilidad/plan-cuentas' title="Plan de cuentas" />
      <AppLink href='/contabilidad/asientos' title="Asientos" />
      <AppLink href='/contabilidad/datos' title="Datos contabilidad" />
      <AppLink href='/contabilidad/diario-mayor' title="Diario mayor" />
      <AppLink href='/contabilidad/libro-diario' title="Libro diario" />
      <AppLink href='/contabilidad/balance' title="Balance" />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default Contabilidad;
