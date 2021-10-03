import React from 'react';
import Layout from '../../../components/Layout'
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import DataTable from '../../../components/DataTable/DataTable.component';
import { isAllowed } from '../../../hocs/auth';
import useDiarioMayor from '../../../customHooks/useDiarioMayor';
import customServerSideHoc from '../../../helpers/customServerSideProps';

const DiarioMayor = ({ user, db }) => {
  const {
    data: {
      errorMessage,
      diarioMayorList = [],
    },
    handlers: {
      fetchDiarioMayor,
    },
  } = useDiarioMayor({ db, user });


  React.useEffect(() => {
    fetchDiarioMayor();
  }, []);

  return (
    <Layout title='Diario mayor' user={user}>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <DataTable
        allowDelete
        data={diarioMayorList}
        user={user}
        path='asientos'
        readonly
        showViewButton
      />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default DiarioMayor;
