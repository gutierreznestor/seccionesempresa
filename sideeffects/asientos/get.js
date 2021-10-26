import { all, put, takeLatest } from 'redux-saga/effects';
import { newDecimal2 } from '../../helpers/decimalNumbers';
import {
  getAsientos,
  getAsientosSuccess,
  getAsientosError,
} from '../../store/asientos';

const convertAsientosToUi = (list = []) => {
  return list.map(asiento => {
    return {
      ...asiento,
      Deb: newDecimal2(asiento.Deb),
      Cred: newDecimal2(asiento.Cred),
    }
  })
}

function* getA({ payload }) {
  const res = yield fetch(`http://localhost:3000/api/asientos/get-asientos?db=${payload}`, {
    method: 'GET',
  });
  const data = yield res.json();
  if (data.errorMessage) {
    yield put(getAsientosError(data.errorMessage));
  } else {
    yield put(getAsientosSuccess(convertAsientosToUi(data)))
  }
};

function* rootSaga() {
  yield all([
    takeLatest(getAsientos.type, getA),
  ]);
};

export default rootSaga;
