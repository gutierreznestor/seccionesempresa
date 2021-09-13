import { replace } from "connected-next-router";
import { all, takeLatest, put } from "redux-saga/effects";
import { Operaciones } from "../../constants";
import {
  deleteEmpleado,
  deleteEmpleadoSuccess,
  deleteEmpleadoError,
  getEmpleados,
} from "../../store/empleados";
import { newLogEmpleado } from "../../store/logsEmpleados";

function* deleteEmp({ payload }) {
  const { idEmpleado, DB, user } = payload;
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
    yield put(newLogEmpleado({
      idUsuario: user.idUsuario,
      Operacion: Operaciones.Delete,
      Descripcion: `Se eliminó el empleado: ${idEmpleado}`,
      DB
    }));
    yield put(deleteEmpleadoSuccess(data.message));
    yield put(getEmpleados(DB));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(deleteEmpleado.type, deleteEmp)
  ]);
};

export default rootSaga;