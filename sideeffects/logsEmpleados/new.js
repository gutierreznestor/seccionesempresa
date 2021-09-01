import { put, takeLatest } from 'redux-saga/effects';
import { replace } from 'connected-next-router';
import { newLogEmpleado, newLogEmpleadoSuccess, newLogEmpleadoError } from '../../store/logsEmpleados';

function* create({ payload: { idUsuario, Operacion, Descripcion, DB } }) {
  try {
    const url = `http://localhost:3000/api/logsEmpleados/add-log-empleado`;
    const res = yield fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idUsuario,
        Operacion,
        Descripcion,
        DB,
      }),
    });
    const data = yield res.json()
    if (data.errorMessage) {
      return yield put(newLogEmpleadoError(data.errorMessage))
    }
    yield put(newLogEmpleadoSuccess("Log de empleado creado correctamente."));
    yield put(replace('/auditoria/empleados'));
  } catch (error) {
    yield put(newLogEmpleadoError(error))
  }
};

function* rootSaga() {
  yield takeLatest(newLogEmpleado.type, create);
};

export default rootSaga;
