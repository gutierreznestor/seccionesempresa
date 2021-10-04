import React from 'react';
import Layout from '../../../components/Layout'
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import DataTable from '../../../components/DataTable/DataTable.component';
import customServerSideHoc from '../../../helpers/customServerSideProps';
import { useSelectLibroDiario } from '../../../selectors/useSelectLibroDiario';
import useLibroDiario from '../../../customHooks/useLibroDiario';
import Form from '../../../components/Form/Form.component';
import Button from '../../../components/Button/Button.component';
import { formatDate } from '../../../helpers/dates';

const LibroDiarioForm = [
  {
    label: 'Hasta fecha',
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
  const [Fecha, setFecha] = React.useState(new Date());
  const [showButton, setShowButton] = React.useState(false);
  const [title, setTitle] = React.useState('');

  const onSubmit = (data) => {
    fetchLibroDiario(data);
    setFecha(data.Fecha);
    setShowButton(true);
    setTitle(`Libro Diario ${formatDate({
      date: data.Fecha.toLocaleDateString(),
      formatString: 'dd/MM/yyyy',
    })}`);
  }

  const registerLibroDiario = () => {
    const message = `¿Generar libro diario con fecha ${formatDate({
      date: Fecha.toLocaleDateString(),
      formatString: 'dd/MM/yyyy',
    })} y modificar los registros?`;
    const ok = confirm(message);
    if (ok) {

    }
  }

  return (
    <Layout title='Libro diario' user={user}>
      {errorMessage && <ErrorMessage message={'errorMessage'} />}
      <Form
        onFormSubmit={onSubmit}
        config={LibroDiarioForm}
        defaultValues={{ Fecha }}
        buttonLabel="Mostrar libro diario"
        buttonStyles={{ marginTop: '1rem' }}
      />
      {showButton && <Button label="Registrar libro diario" onClick={registerLibroDiario} style={{ marginBottom: '1rem' }} />}
      <DataTable
        allowPrint
        data={libroDiario}
        user={user}
        path='asientos'
        readonly
        showViewButton
        title={title}
      />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default LibroDiario;
