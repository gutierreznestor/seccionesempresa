import { put, takeLatest, select } from 'redux-saga/effects';
import { replace } from 'connected-next-router';
import { newAsiento, newAsientoSuccess, newAsientoError } from '../../store/asientos';
import { getContabilidad as getConta } from '../../store/contabilidad';
import { getContabilidad } from '../../selectors/useSelectContabilidad';
import { isSameDate } from '../../helpers/dates';

function* validateAsientoApertura({ TipoAsiento, Fecha }) {
  const { currentContabilidad } = yield select(getContabilidad);
  if (TipoAsiento == 1 && !isSameDate(Fecha, currentContabilidad?.AperturaEjercicio)) {
    yield put(newAsientoError('La fecha debe ser igual a la de apertura'));
    return false;
  }
  return true;
}

function* validateAsientoCierre({ TipoAsiento, Fecha }) {
  const { currentContabilidad } = yield select(getContabilidad);
  if (TipoAsiento == 9 && !isSameDate(Fecha, currentContabilidad?.CierreEjercicio)) {
    yield put(newAsientoError('La fecha debe ser igual a la de cierre'));
    return false;
  }
  return true;
}

function* validateAsiento(payload) {
  let validAsiento = yield validateAsientoApertura(payload);
  if (!validAsiento) return false;
  validAsiento = yield validateAsientoCierre(payload);
  if (!validAsiento) return false;
  return true;
}

function* createAsiento({
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
    let url = `http://localhost:3000/api/asientos/new-asiento`;
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
    url = `http://localhost:3000/api/contabilidad/set-ultimo-asiento`;
    yield fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        db,
        Numero,
      }),
    });
    yield put(newAsientoSuccess("Asiento creado correctamente."));
    yield put(getConta(db));
    yield put(replace('/contabilidad/asientos'));
  } catch (error) {
    yield put(newAsientoError(error.message));
  }
}

function* create({
  payload,
}) {
  try {
    const isValid = yield validateAsiento(payload);
    if (isValid) {
      yield createAsiento(payload);
    }
  } catch (error) {
    yield put(newAsientoError(error.message))
  }
};

function* rootSaga() {
  yield takeLatest(newAsiento.type, create);
};

export default rootSaga;
