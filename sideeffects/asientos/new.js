import { put, takeLatest } from 'redux-saga/effects';
import { replace } from 'connected-next-router';
import { newAsiento, newAsientoSuccess, newAsientoError } from '../../store/asientos';

function* create({
  payload: {
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
  },
}) {
  try {
    const url = `http://localhost:3000/api/asientos/new-asiento`;
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
      return yield put(newAsientoError(data.errorMessage))
    }
    yield put(newAsientoSuccess("Asiento creado correctamente."));
    yield put(replace('/contabilidad/asientos'));
  } catch (error) {
    yield put(newAsientoError(error.message))
  }
};

function* rootSaga() {
  yield takeLatest(newAsiento.type, create);
};

export default rootSaga;
