import React from 'react';

import Form from '../../../../components/Form/Form.component';
import Layout from '../../../../components/Layout';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage.component';
import HelperCuenta from '../../../../components/HelperCuenta/HelperCuenta.component';
import customServerSideHoc from '../../../../helpers/customServerSideProps';
import useAsientos from '../../../../customHooks/useAsientos';
import usePlanCuentas from '../../../../customHooks/usePlanCuentas';
import useGetAsientoParam from '../../../../customHooks/useGetAsientoParam';
import useContabilidad from '../../../../customHooks/useContabilidad';
import Contabilidad from '../../../../components/Contabilidad';


const NuevoAsientoForm = [
  {
    label: 'Asiento',
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
    label: 'Tipo asiento (1 apertura / 5 normal / 9 cierre)',
    type: 'number',
    name: 'TipoAsiento',
    placeholder: '1',
    validations: { required: true, min: 0, max: 9 },
    textValidation: '1 apertura; 5 normal; 9 cierre',
  },
  {
    label: 'Cuenta',
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
    label: '0 Debe / 1 Haber',
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

const NuevoAsiento = ({ user, db }) => {

  const {
    data: { errorMessage, proximoAsiento },
    handlers: { createAsiento }
  } = useAsientos({ db, user });

  const {
    handlers: { fetchContabilidad },
  } = useContabilidad({ db });

  React.useEffect(() => {
    fetchContabilidad();
  }, []);

  const {
    data: { errorMessage: errorPlanCuenta, currentPlanCuenta },
    handlers: { fetchPlanCuenta }
  } = usePlanCuentas({ db, user });

  const { Numero, Renglon } = useGetAsientoParam();

  const onSubmit = (data) => {
    createAsiento(data);
  }

  const watchingPlanCuenta = (value) => {
    if (value) {
      fetchPlanCuenta(value);
    }
  }

  return (
    <Layout title='Nuevo asiento' user={user}>
      <Contabilidad />
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Form
        onFormSubmit={onSubmit}
        config={NuevoAsientoForm}
        defaultValues={{
          Fecha: new Date(),
          FechaOperacion: new Date(),
          FechaVencimiento: new Date(),
          Numero: proximoAsiento?.Numero ? proximoAsiento.Numero : Numero,
          Renglon: proximoAsiento?.Renglon ? proximoAsiento.Renglon : Renglon,
        }}
        watcher='idPlanCuenta'
        watching={watchingPlanCuenta}
        watchValue={errorPlanCuenta ? errorPlanCuenta : currentPlanCuenta?.Nombre}
        helpers={[{ name: 'idPlanCuenta', component: <HelperCuenta user={user} db={db} /> }]}
      />
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default NuevoAsiento;
