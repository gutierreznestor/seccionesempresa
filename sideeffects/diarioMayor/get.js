import { all, put, takeLatest } from 'redux-saga/effects';
import {
  getRegistros,
  getRegistrosSuccess,
  getRegistrosError,
} from '../../store/diarioMayor';

const toSaldo = (prev, curr) => {
  let Debe = Number.parseInt(curr.Deb ? curr.Deb : 0);
  let Haber = Number.parseInt(curr.Cred ? curr.Cred : 0);
  let newSaldo = 0;
  if (prev.length === 0) {
    newSaldo = Debe - Haber;
    prev.push({
      ...curr,
      Saldo: newSaldo,
    });
  } else {
    const last = prev[prev.length - 1];
    newSaldo = last.Saldo + Debe - Haber;
    prev.push({
      ...curr,
      Saldo: newSaldo,
    });
  }
  return prev;
}

function* calcularBalance(data = []) {
  const balance = data.reduce(toSaldo, []);
  return balance;
}

function* getA({ payload }) {
  const res = yield fetch(`http://localhost:3000/api/diarioMayor/get-registros?db=${payload}`, {
    method: 'GET',
  });
  const data = yield res.json();
  if (data.errorMessage) {
    yield put(getRegistrosError(data.errorMessage));
  } else {
    const balance = yield calcularBalance(data);
    yield put(getRegistrosSuccess(balance))
  }
};

function* rootSaga() {
  yield all([
    takeLatest(getRegistros.type, getA),
  ]);
};

export default rootSaga;
