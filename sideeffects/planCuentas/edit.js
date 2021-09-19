import { put, takeLatest } from 'redux-saga/effects';
import { replace } from 'connected-next-router';
import { editPlanCuenta, editPlanCuentaSuccess, editPlanCuentaError } from '../../store/planCuentas';

function* edit({ payload: { id, CodigoPlan, Nombre, db, Tipo } }) {
  try {
    const url = `http://localhost:3000/api/plan-cuentas/edit-plan-cuenta?id=${id}`;
    const res = yield fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        CodigoPlan,
        Nombre,
        db,
        Tipo,
      }),
    });
    const data = yield res.json()
    if (data.errorMessage) {
      return yield put(editPlanCuentaError(data.errorMessage))
    }
    yield put(editPlanCuentaSuccess("Plan de cuenta editada correctamente."));
    yield put(replace('/contabilidad/plan-cuentas'));
  } catch (error) {
    yield put(editPlanCuentaError(error))
  }
};

function* rootSaga() {
  yield takeLatest(editPlanCuenta.type, edit);
};

export default rootSaga;
