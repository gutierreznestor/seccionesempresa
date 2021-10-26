import { put, takeLatest } from 'redux-saga/effects';
import { replace } from 'connected-next-router';
import { editAsiento, editAsientoSuccess, editAsientoError, getAsientoByNumero, getAsiento } from '../../store/asientos';
import { getNextAsientoRef } from '../../helpers/getNextAsientoRef';
import { newDecimal2 } from '../../helpers/decimalNumbers';

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
        Importe: newDecimal2(Importe),
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
    let redirectUrl = getNextAsientoRef({
      Numero, Renglon, path: 'edit'
    });
    yield put(replace(redirectUrl));
    yield put(getAsientoByNumero({ Numero, db }));
    yield put(getAsiento({ db, Numero, Renglon }));
  } catch (error) {
    yield put(editAsientoError(error.message))
  }
};

function* rootSaga() {
  yield takeLatest(editAsiento.type, edit);
};

export default rootSaga;
