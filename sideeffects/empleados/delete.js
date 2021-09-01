import { replace } from "connected-next-router";
import { all, takeLatest, put } from "redux-saga/effects";
import {
  deleteEmpleado,
  deleteEmpleadoSuccess,
  deleteEmpleadoError,
  getEmpleados,
} from "../../store/empleados";

function* deleteSeccion({ payload }) {
  const { idEmpleado, DB } = payload;
  const url = `http://localhost:3000/api/empleados/delete-empleado`;
  let res = yield fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idEmpleado,
      DB,
    }),
  });

  const data = yield res.json();
  if (data.errorMessage) {
    yield put(deleteEmpleadoError(data.errorMessage));
  } else {
    yield put(deleteEmpleadoSuccess(data.message));
    yield put(getEmpleados(DB));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(deleteEmpleado.type, deleteSeccion)
  ]);
};

export default rootSaga;