import { all, put, takeLatest, select, take } from 'redux-saga/effects';
import {
  getLibroDiario,
  getLibroDiarioSuccess,
  getLibroDiarioError,
} from '../../store/libroDiario';
import { calcularBalance } from '../diarioMayor/get';
import { formatDate } from '../../helpers/dates';

function* getLibro({ payload: { Fecha, db } }) {
  let url = `http://localhost:3000/api/libroDiario/get-libro-diario?db=${db}`;
  if (Fecha) {
    url += `&Fecha=${formatDate({ date: Fecha, formatString: 'yyyy-MM-dd' })}`;
  }
  const res = yield fetch(url, {
    method: 'GET',
  });

  const data = yield res.json();
  if (data.errorMessage) {
    yield put(getLibroDiarioError(data.errorMessage));
  } else {
    yield put(getLibroDiarioSuccess(data))
  }
}

function* rootSaga() {
  yield all([
    takeLatest(getLibroDiario.type, getLibro),
  ]);
};

export default rootSaga;
