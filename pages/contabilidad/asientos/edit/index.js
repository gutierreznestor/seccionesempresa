import React from 'react';

import Form from '../../../../components/Form/Form.component';
import Layout from '../../../../components/Layout';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage.component';
import customServerSideHoc from '../../../../helpers/customServerSideProps';
import useAsientos from '../../../../customHooks/useAsientos';
import useGetAsientoParam from '../../../../customHooks/useGetAsientoParam';
import { getNextAsientoRef } from '../../../../helpers/getNextAsientoRef';
import AppLink from '../../../../components/AppLink/AppLink.component';
import { isAllowed } from '../../../../hocs/auth';
import Asiento from '../../../../components/AsientosByNumero/AsientosByNumero.component';
import usePlanCuentas from '../../../../customHooks/usePlanCuentas';
import HelperCuenta from '../../../../components/HelperCuenta/HelperCuenta.component';
import { useSelectAsientos } from '../../../../selectors';


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
    label: 'Tipo asiento (1 apertura / 5 normal / 9 cierre)',
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
    data: { errorMessage: errorPlanCuenta, currentPlanCuenta },
    handlers: { fetchPlanCuenta, clearCurrentPlanCuenta }
  } = usePlanCuentas({ db, user });

  const {
    currentAsiento,
    errorMessage,
    loading,
  } = useSelectAsientos();

  const {
    handlers: { editAsiento, fetchAsiento }
  } = useAsientos({ db, user });

  const onSubmit = (data) => {
    editAsiento(data);
  }

  React.useEffect(() => {
    fetchAsiento({ Numero, Renglon });
    return () => {
      clearCurrentPlanCuenta();
    }
  }, []);

  const nuevoAsientoRef = getNextAsientoRef({
    AddRenglon: true,
    Fecha: currentAsiento?.Fecha,
    Leyenda: currentAsiento?.Leyenda,
    Numero,
    Renglon: Renglon,
    TipoAsiento: currentAsiento?.TipoAsiento,
  });

  return (
    <Layout title='Asiento' user={user}>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Asiento db={db} />
      {currentAsiento && !loading ?
        <Form
          onFormSubmit={onSubmit}
          config={EditarAsientoForm}
          buttonLabel="Guardar"
          defaultValues={currentAsiento}
          hideButton={currentAsiento?.Registrado}
          watcher='idPlanCuenta'
          watching={fetchPlanCuenta}
          watchValue={errorPlanCuenta ? errorPlanCuenta : currentPlanCuenta?.Nombre}
          helpers={[{ name: 'idPlanCuenta', component: <HelperCuenta user={user} db={db} /> }]}
        /> :
        'loading...'
      }
      {!currentAsiento?.Registrado ?
        <AppLink
          enabled={!isAllowed(['auditor'], user?.Perfiles)}
          href={nuevoAsientoRef}
          title='Nuevo renglón' /> :
        null
      }
    </Layout>
  )
}

export async function getServerSideProps(ctx) {
  return await customServerSideHoc(ctx);
}

export default EditarAsiento;
