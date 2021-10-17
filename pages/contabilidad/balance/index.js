import React from 'react';
import Layout from '../../../components/Layout'
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import useBalance from '../../../customHooks/useBalance';
import customServerSideHoc from '../../../helpers/customServerSideProps';
import Form from '../../../components/Form/Form.component';
import BalanceDiv, { DesdeHastaDiv } from './Balance.styled';
import Heading from '../../../components/Heading/Heading.component';
import ListItem from '../../../components/ListItem';
import usePrinter from '../../../customHooks/usePrinter';
import { formatDate } from '../../../helpers/dates';
import { useSelectBalance } from '../../../selectors/useSelectBalance';
import DataTable from '../../../components/DataTable/DataTable.component';
import useGetBalanceParam from '../../../customHooks/useGetBalanceParam';
import { getBalanceRef } from '../../../helpers/getBalanceRef';
import { useRouter } from 'next/router';

export const format = (date) => {
  if (!date) return '';
  return formatDate({ date, formatString: 'dd/MM/yyyy' });
}

const BalanceForm = [
  // {
  //   label: 'Fecha desde',
  //   type: 'date',
  //   name: 'FechaDesde',
  //   placeholder: '01/01/2021',
  //   textValidation: 'Este campo es requerido.',
  // },
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
  '1': { width: '150px', textAlign: 'left' },
  '2': { width: '300px', textAlign: 'left' },
  '3': { width: '50px', textAlign: 'right' },
  '4': { width: '100px', textAlign: 'right' },
  '5': { width: '100px', textAlign: 'right' },
  '6': { width: '100px', textAlign: 'right' },
  '7': { width: '100px', textAlign: 'right' },
};

const Balance = ({ user, db }) => {
  const {
    fetchBalance
  } = useBalance({ db, user });
  const { loading, errorMessage, balanceList } = useSelectBalance();
  const { ref, PrintButton } = usePrinter({ documentTitle: 'Balance' });
  const { FechaDesde, FechaHasta } = useGetBalanceParam();
  const Router = useRouter();
  const [values, setValues] = React.useState({});

  const onSubmit = (data) => {
    const { FechaDesde, FechaHasta } = data;
    const url = getBalanceRef({ FechaDesde, FechaHasta });
    setValues(data);
    Router.push(url);
    fetchBalance(data);
  }

  React.useEffect(() => {
    const data = { FechaDesde, FechaHasta };
    fetchBalance(data);
    setValues(data);
  }, []);

  const renderTable = balanceList.length ?
    <DataTable columnStyles={columnStyles} data={balanceList} /> :
    <h3>Todavía no hay registros</h3>;

  return (
    <Layout title='Balance' user={user}>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Form
        buttonLabel='Mostrar'
        buttonStyles={{ marginTop: '10px' }}
        config={BalanceForm}
        defaultValues={{
          FechaDesde,
          FechaHasta,
        }}
        formStyle={{ justifyContent: 'center' }}
        onFormSubmit={onSubmit}
      />
      {PrintButton}
      <BalanceDiv ref={ref}>
        <Heading level={1}>Balance completo</Heading>
        <DesdeHastaDiv>
          {format(values['FechaDesde']) ?
            <ListItem title="Desde" description={values && format(values['FechaDesde'])} /> : null}
          <ListItem title="Hasta" description={values && format(values['FechaHasta'])} />
        </DesdeHastaDiv>
        {loading ? <h3>Cargando...</h3> : renderTable}
      </BalanceDiv>
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default Balance;
