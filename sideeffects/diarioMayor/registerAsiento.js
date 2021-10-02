import { put, takeLatest } from 'redux-saga/effects';
import { replace } from 'connected-next-router';
import { registerAsiento, registerAsientoSuccess, registerAsientoError } from '../../store/diarioMayor';

function* register({
  payload: {
    db,
    Numero,
  },
}) {
  try {
    const url = `http://localhost:3000/api/diarioMayor/register-asiento`;
    const res = yield fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        db,
        Numero,
      }),
    });
    const data = yield res.json();
    if (data.errorMessage) {
      return yield put(registerAsientoError(data.errorMessage))
    }
    yield put(registerAsientoSuccess("Asiento editado correctamente."));
    yield put(replace('/contabilidad/asientos'));
  } catch (error) {
    yield put(registerAsientoError(error.message))
  }
};

function* rootSaga() {
  yield takeLatest(registerAsiento.type, register);
};

export default rootSaga;
