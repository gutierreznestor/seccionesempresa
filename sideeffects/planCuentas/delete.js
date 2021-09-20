import { all, takeLatest, put } from "redux-saga/effects";
import {
  deletePlanCuenta,
  deletePlanCuentaSuccess,
  deletePlanCuentaError,
  getPlanesCuentas,
} from "../../store/planCuentas";

function* deletePC({ payload }) {
  const { id, db } = payload;
  const url = `http://localhost:3000/api/plan-cuentas/delete-plan-cuenta?id=${id}`;
  let res = yield fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      db,
    }),
  });

  const data = yield res.json();
  if (data.errorMessage) {
    yield put(deletePlanCuentaError(data.errorMessage));
  } else {
    yield put(deletePlanCuentaSuccess("Plan de cuenta eliminada correctamente."));
    yield put(getPlanesCuentas(db));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(deletePlanCuenta.type, deletePC)
  ]);
};

export default rootSaga;