import { put, takeLatest } from 'redux-saga/effects';
import { replace } from 'connected-next-router';
import { newPlanCuenta, newPlanCuentaSuccess, newPlanCuentaError } from '../../store/planCuentas';

function* create({ payload: { CodigoPlan, Nombre, db, Tipo } }) {
  try {
    const url = `http://localhost:3000/api/plan-cuentas/new-plan-cuenta`;
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
      return yield put(newPlanCuentaError(data.errorMessage))
    }
    yield put(newPlanCuentaSuccess("Plan de cuenta creada correctamente."));
    yield put(replace('/contabilidad/plan-cuentas'));
  } catch (error) {
    yield put(newPlanCuentaError(error))
  }
};

function* rootSaga() {
  yield takeLatest(newPlanCuenta.type, create);
};

export default rootSaga;
