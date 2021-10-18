import { all, put, takeLatest, select, take } from 'redux-saga/effects';
import {
  registrarLibroDiario,
  registrarLibroDiarioSuccess,
  registrarLibroDiarioError,
  getLibroDiario,
} from '../../store/libroDiario';
import { formatDate, isBeforeOrEqualDate } from '../../helpers/dates';
import { getContabilidad } from '../../store/contabilidad';
import { getContabilidad as contabilidadSelector } from '../../selectors/useSelectContabilidad';

function* validateFecha(Fecha) {
  const { currentContabilidad } = yield select(contabilidadSelector);
  if (isBeforeOrEqualDate(Fecha, currentContabilidad?.UltimaEmisionLibroDiario)) {
    yield put(registrarLibroDiarioError('No se puede registrar el libro con fecha menor o igual a la última emisión.'));
    return false;
  }
  return true;
}

function* registrar({ payload: { Fecha, db } }) {
  let url = `http://localhost:3000/api/libroDiario/registrar-libro-diario?db=${db}`;
  if (Fecha) {
    url += `&Fecha=${formatDate({ date: Fecha, formatString: 'yyyy-MM-dd' })}`;
  }
  const isValid = yield validateFecha(Fecha);
  let res;
  if (isValid) {
    res = yield fetch(url, {
      method: 'GET',
    });
    const data = yield res.json();
    if (data.errorMessage) {
      yield put(registrarLibroDiarioError(data.errorMessage));
    } else {
      yield put(registrarLibroDiarioSuccess(data));
      yield put(getContabilidad(db));
      yield put(getLibroDiario({ db, Fecha }));
    }
  }

}

function* rootSaga() {
  yield all([
    takeLatest(registrarLibroDiario.type, registrar),
  ]);
};

export default rootSaga;
