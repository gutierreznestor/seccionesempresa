import React from 'react';
import { useRouter } from 'next/router';

import Layout from '../../../../components/Layout';
import usePlanCuentas from '../../../../customHooks/usePlanCuentas';
import customServerSideHoc from '../../../../helpers/customServerSideProps';
import ListItem from '../../../../components/ListItem';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage.component';
import AppLink from '../../../../components/AppLink/AppLink.component';
import { isAllowed } from '../../../../hocs/auth';

const PlanCuenta = ({ db, user }) => {
  const { query } = useRouter();
  const { id } = query
  const {
    data: { errorMessage, loading, currentPlanCuenta },
    handlers: { fetchPlanCuenta }
  } = usePlanCuentas({ db, user });

  React.useEffect(() => {
    fetchPlanCuenta(id);
  }, []);

  return (
    <Layout title='Plan de cuenta' user={user}>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {loading ? 'Cargando...' :
        !errorMessage && <>
          <ListItem title="Nombre" description={currentPlanCuenta?.Nombre} />
          <ListItem title="Código" description={currentPlanCuenta?.CodigoPlan} />
          <ListItem title="Nivel" description={currentPlanCuenta?.Nivel} />
          <ListItem title="Tipo" description={currentPlanCuenta?.Tipo} />
        </>
      }
      <AppLink
        enabled={!isAllowed(['auditor'], user?.Perfiles)}
        href={`/contabilidad/plan-cuentas/edit/${id}`}
        title='Editar' />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default PlanCuenta;
