import React from 'react';
import Layout from '../../../components/Layout'
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import DataTable from '../../../components/DataTable/DataTable.component';
import customServerSideHoc from '../../../helpers/customServerSideProps';
import { useSelectLibroDiario } from '../../../selectors/useSelectLibroDiario';
import useLibroDiario from '../../../customHooks/useLibroDiario';

const LibroDiario = ({ user, db }) => {

  const { errorMessage, libroDiario } = useSelectLibroDiario();
  const { fetchLibroDiario } = useLibroDiario({ db });

  React.useEffect(() => {
    fetchLibroDiario();
  }, []);

  return (
    <Layout title='Libro diario' user={user}>
      {errorMessage && <ErrorMessage message={'errorMessage'} />}
      <DataTable
        allowDelete
        data={libroDiario}
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

export default LibroDiario;
