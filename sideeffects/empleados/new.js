import { put, takeLatest, fork } from 'redux-saga/effects';
import { replace } from 'connected-next-router';
import { newEmpleado, newEmpleadoSuccess, newEmpleadoError } from '../../store/empleados';
import { newLogEmpleado } from '../../store/logsEmpleados';
import { Operaciones } from '../../constants';

function* create({ payload: { Nombre, Apellido, idSeccionEmpresa, DB, user } }) {
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
    yield put(newLogEmpleado({ idUsuario: user.idUsuario, Operacion: Operaciones.Create, Descripcion: 'Nuevo empleado', DB }));
    yield put(newEmpleadoSuccess("Empleado creado correctamente."));
    yield put(replace('/empleados'));
  } catch (error) {
    yield put(newEmpleadoError(error.message))
  }
};

function* rootSaga() {
  yield takeLatest(newEmpleado.type, create);
};

export default rootSaga;
