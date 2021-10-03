import React from 'react';
import Layout from '../../../components/Layout'
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import DataTable from '../../../components/DataTable/DataTable.component';
import customServerSideHoc from '../../../helpers/customServerSideProps';
import { useSelectLibroDiario } from '../../../selectors/useSelectLibroDiario';
import useLibroDiario from '../../../customHooks/useLibroDiario';
import Form from '../../../components/Form/Form.component';

const LibroDiarioForm = [
  {
    label: 'Fecha',
    type: 'date',
    name: 'Fecha',
    placeholder: '01/01/2021',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
];

const LibroDiario = ({ user, db }) => {

  const { errorMessage, libroDiario } = useSelectLibroDiario();
  const { fetchLibroDiario } = useLibroDiario({ db });

  React.useEffect(() => {
    fetchLibroDiario();
  }, []);

  const onSubmit = (data) => {
    fetchLibroDiario(data);
  }

  return (
    <Layout title='Libro diario' user={user}>
      {errorMessage && <ErrorMessage message={'errorMessage'} />}
      <Form
        onFormSubmit={onSubmit}
        config={LibroDiarioForm}
        defaultValues={{}}
        buttonLabel="Generar libro diario"
        buttonStyles={{ marginTop: '1rem' }}
      />
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
