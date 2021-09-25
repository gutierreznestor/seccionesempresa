import React from 'react';

import Form from '../../../../components/Form/Form.component';
import Layout from '../../../../components/Layout';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage.component';
import customServerSideHoc from '../../../../helpers/customServerSideProps';
import usePlanCuentas from '../../../../customHooks/usePlanCuentas';
import useGetCuentaParam from '../../../../customHooks/useGetCuentaParam';


const NuevoPlanCuentaForm = [
  {
    label: 'Nombre',
    type: 'text',
    name: 'Nombre',
    placeholder: 'Bancos',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
  {
    label: 'Código',
    type: 'text',
    name: 'CodigoPlan',
    placeholder: '1.01.01',
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
  {
    label: 'Tipo',
    type: 'number',
    name: 'Tipo',
    placeholder: '0 título; 1 cuenta',
    validations: { required: true, min: 0, max: 1 },
    textValidation: 'Elija 0 para un título y 1 para una cuenta',
  },
];

const NuevoPlanCuenta = ({ user, db }) => {
  const {
    data: { errorMessage },
    handlers: { createPlanCuenta }
  } = usePlanCuentas({ db, user });
  const { CodigoPlan } = useGetCuentaParam();


  const onSubmit = async (data) => {
    const { CodigoPlan, Nombre, Tipo } = data;
    createPlanCuenta({ CodigoPlan, Nombre, Tipo });
  }

  return (
    <Layout title='Nuevo plan de cuenta' user={user}>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Form onFormSubmit={onSubmit} config={NuevoPlanCuentaForm} defaultValues={{ Tipo: 0, CodigoPlan }} />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default NuevoPlanCuenta;
