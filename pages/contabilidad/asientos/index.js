import React from 'react';
import Layout from '../../../components/Layout'
import AppLink from '../../../components/AppLink/AppLink.component';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import DataTable from '../../../components/DataTable/DataTable.component';
import { isAllowed } from '../../../hocs/auth';
import useAsientos from '../../../customHooks/useAsientos';
import useContabilidad from '../../../customHooks/useContabilidad';
import customServerSideHoc from '../../../helpers/customServerSideProps';

const Asientos = ({ user, db }) => {
  const {
    data: {
      errorMessage,
      asientos,
      proximoAsiento,
    },
    handlers: {
      deleteAsiento,
      fetchAsientos,
      getProximoAsiento,
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

  React.useEffect(() => {
    if (currentContabilidad) {
      getProximoAsiento({ Numero: currentContabilidad.UltimoAsiento });
    }
  }, [currentContabilidad]);

  const onDelete = ({ Numero, Renglon }) => {
    const ok = confirm('¿Quieres eliminar el asiento?');
    if (ok) {
      deleteAsiento({ Numero, Renglon });
    }
  }
  return (
    <Layout title='Asientos' user={user}>
      <AppLink
        enabled={!isAllowed(['auditor'], user?.Perfiles)}
        href={`/contabilidad/asientos/new?Numero=${proximoAsiento?.Numero}&Renglon=${proximoAsiento?.Renglon}`}
        title='Nuevo asiento' />
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <DataTable
        allowDelete
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
