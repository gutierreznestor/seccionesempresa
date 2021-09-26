import React from 'react';
import Layout from '../../components/Layout'
import AppLink from '../../components/AppLink/AppLink.component';
import customServerSideHoc from '../../helpers/customServerSideProps';

const Contabilidad = ({ user }) => {

  return (
    <Layout title='Contabilidad' user={user}>
      <AppLink href='/contabilidad/plan-cuentas' title="Plan de cuentas" />
      <AppLink href='/contabilidad/asientos' title="Asientos" />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default Contabilidad;
