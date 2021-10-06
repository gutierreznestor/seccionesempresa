import React from 'react';
import Layout from '../../../components/Layout'
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import DataTable from '../../../components/DataTable/DataTable.component';
import { isAllowed } from '../../../hocs/auth';
import useDiarioMayor from '../../../customHooks/useDiarioMayor';
import customServerSideHoc from '../../../helpers/customServerSideProps';
import MayorCuenta from '../../../components/MayorCuenta/MayorCuenta.component';

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
      {diarioMayorList.length ? diarioMayorList.map((diarioMayor) => (
        <MayorCuenta user={user} registros={diarioMayor} key={diarioMayor[0]?.idPlanCuenta} />
      )) : <h3>Todavía no hay registros</h3>}
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default DiarioMayor;
