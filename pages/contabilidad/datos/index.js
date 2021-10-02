import React from 'react';
import Layout from '../../../components/Layout'
import AppLink from '../../../components/AppLink/AppLink.component';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.component';
import customServerSideHoc from '../../../helpers/customServerSideProps';
import useContabilidad from '../../../customHooks/useContabilidad';
import Form from '../../../components/Form/Form.component';

const ContabilidadForm = [
  {
    label: 'Nombre de la empresa',
    type: 'text',
    name: 'NombreEmpresa',
    placeholder: 'Nombre empresa',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
  {
    label: 'Apertura de ejercicio',
    type: 'date',
    name: 'AperturaEjercicio',
    placeholder: '01/01/2021',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
  {
    label: 'Cierre de ejercicio',
    type: 'date',
    name: 'CierreEjercicio',
    placeholder: '31/12/2021',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
  {
    label: 'Última emisión libro diario',
    type: 'date',
    name: 'UltimaEmisionLibroDiario',
    placeholder: '31/12/2021',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
  {
    label: 'Último asiento',
    type: 'number',
    name: 'UltimoAsiento',
    placeholder: '0',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
    min: 0,
    max: 1,
  },
];

const DatosContabilidad = ({ user, db }) => {
  const {
    data: { errorMessage, currentContabilidad },
    handlers: { editContabilidad, fetchContabilidad }
  } = useContabilidad({ db, user });

  React.useEffect(() => {
    fetchContabilidad();
  }, []);

  const onSubmit = (values) => {
    editContabilidad(values);
  }

  return (
    <Layout title='Datos contabilidad' user={user}>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {currentContabilidad ?
        <Form
          onFormSubmit={onSubmit}
          config={ContabilidadForm}
          buttonLabel="Guardar"
          defaultValues={currentContabilidad}
        /> :
        'loading...'
      }
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default DatosContabilidad;
