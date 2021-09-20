import React from 'react';

import Form from '../../../../../components/Form/Form.component';
import Layout from '../../../../../components/Layout';
import ErrorMessage from '../../../../../components/ErrorMessage/ErrorMessage.component';
import customServerSideHoc from '../../../../../helpers/customServerSideProps';
import usePlanCuentas from '../../../../../customHooks/usePlanCuentas';
import useGetIdParam from '../../../../../customHooks/useGetIdParam';


const EditPlanCuentaForm = [
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
    validations: { required: true },
    textValidation: 'Este campo es requerido.',
  },
];

const EditPlanCuenta = ({ user, db }) => {
  const id = useGetIdParam();
  const {
    data: { errorMessage, currentPlanCuenta },
    handlers: { editPlanCuenta, fetchPlanCuenta }
  } = usePlanCuentas({ db, user });

  const onSubmit = (data) => {
    const { CodigoPlan, Nombre, Tipo } = data;
    editPlanCuenta({ id, CodigoPlan, Nombre, Tipo });
  }

  React.useEffect(() => {
    fetchPlanCuenta(id);
  }, []);

  return (
    <Layout title='Editar plan de cuenta' user={user}>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Form
        buttonLabel='Guardar'
        config={EditPlanCuentaForm}
        defaultValues={currentPlanCuenta}
        onFormSubmit={onSubmit}
      />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default EditPlanCuenta;
