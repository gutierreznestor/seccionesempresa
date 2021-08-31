import { put, takeLatest, fork } from 'redux-saga/effects';
import { replace } from 'connected-next-router';
import { newEmpleado, newEmpleadoSuccess, newEmpleadoError } from '../../store/empleados';

function* create({ payload: { Nombre, Apellido, idSeccionEmpresa, DB } }) {
  try {
    const url = `http://localhost:3000/api/empleados/new-empleado`;
    const res = yield fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Nombre,
        Apellido,
        idSeccionEmpresa,
        DB,
      }),
    });
    const data = yield res.json()
    if (data.errorMessage) {
      return yield put(newEmpleadoError(data.errorMessage))
    }
    yield put(newEmpleadoSuccess("Empleado creado correctamente."));
    yield put(replace('/empleados'));
  } catch (error) {
    yield put(newEmpleadoError(error))
  }
};

function* rootSaga() {
  yield takeLatest(newEmpleado.type, create);
};

export default rootSaga;
