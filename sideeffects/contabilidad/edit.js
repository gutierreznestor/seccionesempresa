import { put, takeLatest } from 'redux-saga/effects';
import { replace } from 'connected-next-router';
import { editContabilidad, editContabilidadSuccess, editContabilidadError } from '../../store/contabilidad';

function* edit({
  payload: {
    NombreEmpresa,
    AperturaEjercicio,
    CierreEjercicio,
    UltimaEmisionLibroDiario,
    UltimoAsiento,
    db,
  },
}) {
  try {

    const url = `http://localhost:3000/api/contabilidad/edit-contabilidad?db=${db}`;
    const res = yield fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        NombreEmpresa,
        AperturaEjercicio,
        CierreEjercicio,
        UltimaEmisionLibroDiario,
        UltimoAsiento,
      }),
    });
    const data = yield res.json()
    if (data.errorMessage) {
      return yield put(editContabilidadError(data.errorMessage))
    }
    yield put(editContabilidadSuccess(data));
    yield put(replace('/contabilidad'));
  } catch (error) {
    yield put(editContabilidadError(error.message))
  }
};

function* rootSaga() {
  yield takeLatest(editContabilidad.type, edit);
};

export default rootSaga;
