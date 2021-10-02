import { put, takeLatest } from 'redux-saga/effects';
import { newRegistro, newRegistroSuccess, newRegistroError } from '../../store/diarioMayor';

function* createRegistro({
  Comprobante,
  db,
  DebeHaber,
  Fecha,
  FechaOperacion,
  FechaVencimiento,
  idPlanCuenta,
  Importe,
  Leyenda,
  Numero,
  TipoAsiento,
  Renglon,
}) {
  try {
    let url = `http://localhost:3000/api/diarioMayor/new-registro`;
    const res = yield fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Comprobante,
        db,
        DebeHaber,
        Fecha,
        FechaOperacion,
        FechaVencimiento,
        idPlanCuenta,
        Importe,
        Leyenda,
        Numero,
        TipoAsiento,
        Renglon,
      }),
    });
    const data = yield res.json()
    if (data.errorMessage) {
      return yield put(newRegistroError(data.errorMessage))
    }
    yield put(newRegistroSuccess("Registro creado correctamente."));
  } catch (error) {
    yield put(newRegistroError(error.message));
  }
}

function* create({
  payload,
}) {
  try {
    yield createRegistro(payload);
  } catch (error) {
    yield put(newRegistroError(error.message))
  }
};

function* rootSaga() {
  yield takeLatest(newRegistro.type, create);
};

export default rootSaga;
