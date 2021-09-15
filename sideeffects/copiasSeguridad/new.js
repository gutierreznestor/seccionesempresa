import { put, takeLatest } from 'redux-saga/effects';
import { newCopiaSeguridad, newCopiaSeguridadSuccess, newCopiaSeguridadError, getCopiasSeguridad } from '../../store/copiasSeguridad';

function* create({ payload: { db } }) {
  try {
    const url = `http://localhost:3000/api/copiasSeguridad/make-copia-seguridad`;
    const res = yield fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        db,
      }),
    });
    const data = yield res.json()
    if (data.errorMessage) {
      return yield put(newCopiaSeguridadError(data.errorMessage))
    }
    yield put(newCopiaSeguridadSuccess({
      message: data?.message,
      fileName: data.fileName,
    }));
    yield put(getCopiasSeguridad(db));
  } catch (error) {
    yield put(newCopiaSeguridadError(error))
  }
};

function* rootSaga() {
  yield takeLatest(newCopiaSeguridad.type, create);
};

export default rootSaga;
