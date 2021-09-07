import { put, takeLatest, fork } from 'redux-saga/effects';
import { replace } from 'connected-next-router';
import { newSeccionEmpresa, newSeccionEmpresaSuccess, newSeccionEmpresaError } from '../../store/seccionesEmpresa';
import { newLogSeccionEmpresa } from '../../store/logsSeccionesEmpresa';
import { Operaciones } from '../../constants';

function* create({ payload: { Nombre, DB, user } }) {
  try {
    const url = `http://localhost:3000/api/secciones-empresa/new-secciones-empresa`;
    const res = yield fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Nombre,
        DB,
      }),
    });
    const data = yield res.json()
    if (data.errorMessage) {
      return yield put(newSeccionEmpresaError(data.errorMessage))
    }
    yield put(newSeccionEmpresaSuccess("Sección de empresa creada correctamente."));
    yield put(newLogSeccionEmpresa({ idUsuario: user.idUsuario, Operacion: Operaciones.Create, Descripcion: Nombre, DB }));
    yield put(replace('/secciones-empresa'));
  } catch (error) {
    yield put(newSeccionEmpresaError(error))
  }
};

function* rootSaga() {
  yield takeLatest(newSeccionEmpresa.type, create);
};

export default rootSaga;
