import React from 'react';
import Layout from '../../../components/Layout'
import AppLink from '../../../components/AppLink/AppLink.component';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import DataTable from '../../../components/DataTable/DataTable.component';
import { isAllowed } from '../../../hocs/auth';
import useAsientos from '../../../customHooks/useAsientos';
import customServerSideHoc from '../../../helpers/customServerSideProps';

const Asientos = ({ user, db }) => {
  const {
    data: {
      errorMessage,
      asientos,
    },
    handlers: {
      fetchAsientos,
    },
  } = useAsientos({ db, user });

  React.useEffect(() => {
    fetchAsientos();
  }, []);

  return (
    <Layout title='Asientos' user={user}>
      <AppLink
        enabled={!isAllowed(['auditor'], user?.Perfiles)}
        href='/contabilidad/asientos/new'
        title='Nuevo asiento' />
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <DataTable
        allowDelete
        data={asientos}
        user={user}
        notAllowed={['auditor']}
        path='asientos'
        showViewButton
      />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default Asientos;
