import React from 'react';

import Layout from '../../../../components/Layout';
import usePlanCuentas from '../../../../customHooks/usePlanCuentas';
import customServerSideHoc from '../../../../helpers/customServerSideProps';
import ListItem from '../../../../components/ListItem';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage.component';
import AppLink from '../../../../components/AppLink/AppLink.component';
import { isAllowed } from '../../../../hocs/auth';
import useGetIdParam from '../../../../customHooks/useGetIdParam';

const PlanCuenta = ({ db, user }) => {
  const id = useGetIdParam();
  const {
    data: {
      errorMessage,
      loading,
      currentPlanCuenta,
      nextPlanCuenta,
    },
    handlers: { fetchPlanCuenta, getNextPlanCuenta }
  } = usePlanCuentas({ db, user });

  React.useEffect(() => {
    fetchPlanCuenta(id);
    getNextPlanCuenta(id);
  }, []);

  return (
    <Layout title='Plan de cuenta' user={user}>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {loading ? 'Cargando...' :
        !errorMessage && <>
          <ListItem title="Nombre" description={currentPlanCuenta?.Nombre} />
          <ListItem title="Código" description={currentPlanCuenta?.CodigoPlan} />
          <ListItem title="Tipo" description={currentPlanCuenta?.Tipo} />
          <ListItem title="Nivel" description={currentPlanCuenta?.Nivel} />
        </>
      }
      <AppLink
        enabled={!isAllowed(['auditor'], user?.Perfiles)}
        href={`/contabilidad/plan-cuentas/edit/${id}`}
        title='Editar' />
      <AppLink
        enabled={!isAllowed(['auditor'], user?.Perfiles)}
        href={`/contabilidad/plan-cuentas/new?CodigoPlan=${nextPlanCuenta ? nextPlanCuenta.CodigoPlan : ''}`}
        title='Nuevo plan' />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default PlanCuenta;
