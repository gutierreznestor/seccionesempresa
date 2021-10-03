import { all, put, takeLatest, select, take } from 'redux-saga/effects';
import {
  getLibroDiario,
  getLibroDiarioSuccess,
  getLibroDiarioError,
} from '../../store/libroDiario';
import { calcularBalance } from '../diarioMayor/get';

function* getLibro({ payload: { db } }) {
  const res = yield fetch(`http://localhost:3000/api/libroDiario/get-libro-diario?db=${db}`, {
    method: 'GET',
  });

  const data = yield res.json();
  if (data.errorMessage) {
    yield put(getLibroDiarioError(data.errorMessage));
  } else {
    const balance = yield calcularBalance(data);
    const balanceWithId = balance.map((item, idx) => ({ id: idx + 1, ...item }));
    yield put(getLibroDiarioSuccess(balanceWithId))
  }
}

function* rootSaga() {
  yield all([
    takeLatest(getLibroDiario.type, getLibro),
  ]);
};

export default rootSaga;
