import React from 'react';
import Layout from '../../../components/Layout'
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import { isAllowed } from '../../../hocs/auth';
import useDiarioMayor from '../../../customHooks/useDiarioMayor';
import customServerSideHoc from '../../../helpers/customServerSideProps';
import MayorCuenta from '../../../components/MayorCuenta/MayorCuenta.component';
import Form from '../../../components/Form/Form.component';

const MayorCuentaForm = [
  {
    label: 'Fecha desde',
    type: 'date',
    name: 'FechaDesde',
    placeholder: '01/01/2021',
    textValidation: 'Este campo es requerido.',
  },
  {
    label: 'Fecha hasta',
    type: 'date',
    name: 'FechaHasta',
    placeholder: '01/01/2021',
    textValidation: 'Este campo es requerido.',
  },
];

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

  const onSubmit = (data) => {
    fetchDiarioMayor(data);
  }

  React.useEffect(() => {
    // fetchDiarioMayor({});
  }, []);

  return (
    <Layout title='Diario mayor' user={user}>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Form
        onFormSubmit={onSubmit}
        config={MayorCuentaForm}
        defaultValues={{
          FechaDesde: new Date(),
        }}
        buttonStyles={{ marginTop: '10px' }}
      />
      {diarioMayorList.length ? diarioMayorList.map((diarioMayor) => (
        <MayorCuenta
          cuenta={diarioMayor.cuenta}
          key={diarioMayor[0]?.idPlanCuenta}
          registros={diarioMayor.asientos}
          user={user}
        />
      )) : <h3>Todavía no hay registros</h3>}
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default DiarioMayor;
