import React from 'react';

import Form from '../../../../components/Form/Form.component';
import Layout from '../../../../components/Layout';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage.component';
import customServerSideHoc from '../../../../helpers/customServerSideProps';
import useAsientos from '../../../../customHooks/useAsientos';
import useGetAsientoParam from '../../../../customHooks/useGetAsientoParam';


const EditarAsientoForm = [
  {
    label: 'Número de asiento',
    type: 'number',
    name: 'Numero',
    placeholder: '99',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
    min: 1,
  },
  {
    label: 'Renglón',
    type: 'number',
    name: 'Renglon',
    placeholder: '99',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
    min: 0,
  },
  {
    label: 'Tipo asiento (1/5/9)',
    type: 'number',
    name: 'TipoAsiento',
    placeholder: '1',
    validations: { required: true, min: 0, max: 9 },
    textValidation: '1 apertura; 5 normal; 9 cierre',
  },
  {
    label: 'Número de cuenta',
    type: 'number',
    name: 'idPlanCuenta',
    placeholder: '99',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
    min: 1,
  },
  {
    label: 'Fecha',
    type: 'date',
    name: 'Fecha',
    placeholder: '01/01/2021',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
  {
    label: 'Fecha de operación',
    type: 'date',
    name: 'FechaOperacion',
    placeholder: '01/01/2021',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
  {
    label: 'Fecha de vencimiento',
    type: 'date',
    name: 'FechaVencimiento',
    placeholder: '01/01/2021',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
  {
    label: 'Comprobante',
    type: 'text',
    name: 'Comprobante',
    placeholder: '99',
  },
  {
    label: 'Debe / Haber',
    type: 'number',
    name: 'DebeHaber',
    placeholder: '0',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
    min: 0,
    max: 1,
  },
  {
    label: 'Importe',
    type: 'number',
    name: 'Importe',
    placeholder: '999.99',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
    step: ".01"
  },
  {
    label: 'Leyenda',
    type: 'text',
    name: 'Leyenda',
    placeholder: 'Internet',
  },
];

const EditarAsiento = ({ user, db }) => {
  const { Numero, Renglon } = useGetAsientoParam();

  const {
    data: { currentAsiento, errorMessage },
    handlers: { editAsiento, fetchAsiento }
  } = useAsientos({ db, user });

  const onSubmit = (data) => {
    editAsiento(data);
  }

  React.useEffect(() => {
    fetchAsiento({ Numero, Renglon });
  }, []);

  return (
    <Layout title='Asiento' user={user}>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {currentAsiento ?
        <Form
          onFormSubmit={onSubmit}
          config={EditarAsientoForm}
          buttonLabel="Guardar"
          defaultValues={currentAsiento}
        /> :
        'loading...'
      }
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default EditarAsiento;
