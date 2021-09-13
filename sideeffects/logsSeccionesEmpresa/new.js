import { put, takeLatest } from 'redux-saga/effects';
import { newLogSeccionEmpresa, newLogSeccionEmpresaSuccess, newLogSeccionEmpresaError } from '../../store/logsSeccionesEmpresa';

function* createNewLog({ payload: { idUsuario, Operacion, Descripcion, DB } }) {
  try {
    const url = `http://localhost:3000/api/logsSeccionesEmpresa/add-log-seccion-empresa`;
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
      return yield put(newLogSeccionEmpresaError(data.errorMessage))
    }
    yield put(newLogSeccionEmpresaSuccess("Log de sección empresa creado correctamente."));
  } catch (error) {
    yield put(newLogSeccionEmpresaError(error))
  }
};

function* rootSaga() {
  yield takeLatest(newLogSeccionEmpresa.type, createNewLog);
};

export default rootSaga;
