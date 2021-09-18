import React from 'react';

import Form from '../../../../components/Form/Form.component';
import Layout from '../../../../components/Layout';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage.component';
import customServerSideHoc from '../../../../helpers/customServerSideProps';
import usePlanCuentas from '../../../../customHooks/usePlanCuentas';


const NuevoPlanCuentaForm = [
  {
    label: 'Código',
    type: 'text',
    name: 'CodigoPlan',
    placeholder: '1.01.01',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
  {
    label: 'Nombre',
    type: 'text',
    name: 'Nombre',
    placeholder: 'Bancos',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
  {
    label: 'Tipo',
    type: 'number',
    name: 'Tipo',
    placeholder: '0 título; 1 cuenta',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
];

const NuevoPlanCuenta = ({ user, db }) => {
  const {
    data: { errorMessage },
    handlers: { createPlanCuenta }
  } = usePlanCuentas({ db, user });


  const onSubmit = async (data) => {
    const { CodigoPlan, Nombre, Tipo } = data;
    console.log({ CodigoPlan, Nombre, Tipo });
    createPlanCuenta({ CodigoPlan, Nombre, Tipo });
  }

  return (
    <Layout title='Nuevo plan de cuenta' user={user}>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Form onFormSubmit={onSubmit} config={NuevoPlanCuentaForm} />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default NuevoPlanCuenta;
