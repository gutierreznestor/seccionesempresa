import React from 'react';
import Layout from '../../../components/Layout'
import AppLink from '../../../components/AppLink/AppLink.component';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import DataTable from '../../../components/DataTable/DataTable.component';
import { isAllowed } from '../../../hocs/auth';
import usePlanCuentas from '../../../customHooks/usePlanCuentas';
import customServerSideHoc from '../../../helpers/customServerSideProps';

const PlanCuentas = ({ user, error, db }) => {
  const {
    data: {
      errorMessage,
      planesCuentas,
    },
    handlers: {
      fetchPlanCuentas,
      deletePlanCuenta,
    },
  } = usePlanCuentas({ db, user });

  React.useEffect(() => {
    fetchPlanCuentas();
  }, []);

  const onDelete = async (id) => {
    const ok = confirm('¿Quieres eliminar el plan de cuentas?');
    if (ok) {
      deletePlanCuenta({
        idPlanCuenta: id,
        db,
      });
    }
  }
  return (
    <Layout title='Plan de cuentas' user={user} h1Title="Plan de cuentas">
      <AppLink
        enabled={!isAllowed(['auditor'], user?.Perfiles)}
        href='/contabilidad/plan-cuentas/new'
        title='Nuevo plan de cuenta' />
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <DataTable
        data={planesCuentas}
        user={user}
        notAllowed={['auditor']}
        path='plan-cuentas'
        onDelete={onDelete}
        showViewButton
      />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default PlanCuentas;
