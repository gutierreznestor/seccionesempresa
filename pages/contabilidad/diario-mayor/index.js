import React from 'react';
import Layout from '../../../components/Layout'
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import { isAllowed } from '../../../hocs/auth';
import useDiarioMayor from '../../../customHooks/useDiarioMayor';
import customServerSideHoc from '../../../helpers/customServerSideProps';
import MayorCuenta from '../../../components/MayorCuenta/MayorCuenta.component';
import Form from '../../../components/Form/Form.component';
import { DesdeHastaDiv, DiarioMayorDiv } from './DiarioMayor.styled';
import Heading from '../../../components/Heading/Heading.component';
import ListItem from '../../../components/ListItem';
import usePrinter from '../../../customHooks/usePrinter';
import { formatDate } from '../../../helpers/dates';

const format = (date) => {
  if (!date) return '';
  return formatDate({ date, formatString: 'dd/MM/yyyy' });
}

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
  const { ref, PrintButton } = usePrinter({ documentTitle: 'Mayor de cuentas' });
  const [values, setValues] = React.useState({});

  const onSubmit = (data) => {
    fetchDiarioMayor(data);
    setValues(data);
  }

  return (
    <Layout title='Diario mayor' user={user}>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Form
        buttonLabel='Mostrar'
        buttonStyles={{ marginTop: '10px' }}
        config={MayorCuentaForm}
        defaultValues={{
          //FechaDesde: new Date(),
        }}
        formStyle={{ justifyContent: 'center' }}
        onFormSubmit={onSubmit}
      />
      {PrintButton}
      <DiarioMayorDiv ref={ref}>
        <Heading level={1}>Mayores de cuentas</Heading>
        <DesdeHastaDiv>
          <ListItem title="Desde" description={values && format(values['FechaDesde'])} />
          <ListItem title="Hasta" description={values && format(values['FechaHasta'])} />
        </DesdeHastaDiv>
        {diarioMayorList.length ? diarioMayorList.map((diarioMayor) => (
          <MayorCuenta
            cuenta={diarioMayor.cuenta}
            key={diarioMayor[0]?.idPlanCuenta}
            registros={diarioMayor.asientos}
            user={user}
          />
        )) : <h3>Todavía no hay registros</h3>}
      </DiarioMayorDiv>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default DiarioMayor;
