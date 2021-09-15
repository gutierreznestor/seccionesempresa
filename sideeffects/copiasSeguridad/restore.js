import { put, takeLatest } from 'redux-saga/effects';
import { restoreCopiaSeguridad, restoreCopiaSeguridadSuccess, restoreCopiaSeguridadError, getCopiasSeguridad } from '../../store/copiasSeguridad';

function* restore({ payload: { db, fileName } }) {
  try {
    const url = `http://localhost:3000/api/copiasSeguridad/restaurar-copia-seguridad`;
    const res = yield fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        db,
        fileName,
      }),
    });
    const data = yield res.json()
    if (data.errorMessage) {
      return yield put(restoreCopiaSeguridadError(data.errorMessage))
    }
    yield put(restoreCopiaSeguridadSuccess("Copia de seguridad restaurada correctamente."));
    yield put(getCopiasSeguridad(db));
  } catch (error) {
    yield put(restoreCopiaSeguridadError(error))
  }
};

function* rootSaga() {
  yield takeLatest(restoreCopiaSeguridad.type, restore);
};

export default rootSaga;
