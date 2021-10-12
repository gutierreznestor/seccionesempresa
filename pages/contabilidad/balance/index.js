import React from 'react';
import Layout from '../../../components/Layout'
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import { isAllowed } from '../../../hocs/auth';
import useBalance from '../../../customHooks/useBalance';
import customServerSideHoc from '../../../helpers/customServerSideProps';
import MayorCuenta from '../../../components/MayorCuenta/MayorCuenta.component';
import Form from '../../../components/Form/Form.component';
import { DesdeHastaDiv, DiarioMayorDiv } from './Balance.styled';
import Heading from '../../../components/Heading/Heading.component';
import ListItem from '../../../components/ListItem';
import usePrinter from '../../../customHooks/usePrinter';
import { formatDate } from '../../../helpers/dates';
import { useSelectBalance } from '../../../selectors/useSelectBalance';
import DataTable from '../../../components/DataTable/DataTable.component';

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

const columnStyles = {
  '0': { width: '60px', textAlign: 'right' },
  '1': { width: '120px', textAlign: 'right' },
  '2': { width: '150px', textAlign: 'left' },
  '3': { width: '100px', textAlign: 'right' },
  '4': { width: '100px', textAlign: 'right' },
  '5': { width: '120px', textAlign: 'right' },
};

const Balance = ({ user, db }) => {
  const {
    fetchBalance
  } = useBalance({ db, user });
  const { loading, errorMessage, balanceList } = useSelectBalance();
  const { ref, PrintButton } = usePrinter({ documentTitle: 'Balance' });
  const [values, setValues] = React.useState({});

  const onSubmit = (data) => {
    fetchBalance(data);
    setValues(data);
  }

  return (
    <Layout title='Balance' user={user}>
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
        <Heading level={1}>Balance completo</Heading>
        <DesdeHastaDiv>
          <ListItem title="Desde" description={values && format(values['FechaDesde'])} />
          <ListItem title="Hasta" description={values && format(values['FechaHasta'])} />
        </DesdeHastaDiv>
        {balanceList.length ? <DataTable columnStyles={columnStyles} data={balanceList} /> : <h3>Todavía no hay registros</h3>}
      </DiarioMayorDiv>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default Balance;
