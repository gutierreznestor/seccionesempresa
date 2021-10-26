import React from 'react';
import Layout from '../../../components/Layout'
import AppLink from '../../../components/AppLink/AppLink.component';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import DataTable from '../../../components/DataTable/DataTable.component';
import { isAllowed } from '../../../hocs/auth';
import useAsientos from '../../../customHooks/useAsientos';
import useContabilidad from '../../../customHooks/useContabilidad';
import customServerSideHoc from '../../../helpers/customServerSideProps';
import Contabilidad from '../../../components/Contabilidad/Contabilidad.component';

const columnStyles = {
  '0': { width: '60px', textAlign: 'right' },
  '1': { width: '60px', textAlign: 'right' },
  '2': { width: '250px', textAlign: 'left' },
  '3': { width: '250px', textAlign: 'left' },
  '4': { width: '100px', textAlign: 'right' },
  '5': { width: '100px', textAlign: 'right' },
  '6': { width: '100px', textAlign: 'right' },
  '7': { width: '80px', textAlign: 'right' },
  '8': { width: '80px', textAlign: 'right' },
  '9': { width: '60px', textAlign: 'right' },
}

const Asientos = ({ user, db }) => {
  const {
    data: {
      errorMessage,
      asientos,
    },
    handlers: {
      deleteAsiento,
      fetchAsientos,
    },
  } = useAsientos({ db, user });

  const {
    data: { currentContabilidad },
    handlers: { fetchContabilidad },
  } = useContabilidad({ db });

  React.useEffect(() => {
    fetchAsientos();
  }, []);

  React.useEffect(() => {
    fetchContabilidad();
  }, []);

  const onDelete = ({ Numero, Renglon }) => {
    const ok = confirm('¿Quieres eliminar el asiento?');
    if (ok) {
      deleteAsiento({ Numero, Renglon });
    }
  }
  return (
    <Layout title='Asientos' user={user}>
      <Contabilidad />
      <AppLink
        enabled={!isAllowed(['auditor'], user?.Perfiles)}
        href={`/contabilidad/asientos/new?Numero=${currentContabilidad?.Proximo}&Renglon=1`}
        title='Nuevo asiento' />
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <DataTable
        allowDelete
        columnStyles={columnStyles}
        data={asientos}
        user={user}
        notAllowed={['auditor']}
        onDelete={onDelete}
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
