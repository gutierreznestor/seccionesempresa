import { put, takeLatest } from 'redux-saga/effects';
import { replace } from 'connected-next-router';
import { editAsiento, editAsientoSuccess, editAsientoError } from '../../store/asientos';

function* edit({
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

    const url = `http://localhost:3000/api/asientos/edit-asiento`;
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
      return yield put(editAsientoError(data.errorMessage))
    }
    yield put(editAsientoSuccess("Asiento editado correctamente."));
    yield put(replace('/contabilidad/asientos'));
  } catch (error) {
    yield put(editAsientoError(error.message))
  }
};

function* rootSaga() {
  yield takeLatest(editAsiento.type, edit);
};

export default rootSaga;
