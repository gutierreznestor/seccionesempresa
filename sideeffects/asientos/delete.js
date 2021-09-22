import { replace } from "connected-next-router";
import { all, takeLatest, put } from "redux-saga/effects";
import { Operaciones } from "../../constants";
import {
  deleteAsiento,
  deleteAsientoSuccess,
  deleteAsientoError,
  getAsientos,
} from "../../store/asientos";

function* deleteAsi({ payload }) {
  const { Numero, db, Renglon } = payload;
  const url = `http://localhost:3000/api/asientos/delete-asiento`;
  let res = yield fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Numero,
      db,
      Renglon,
    }),
  });

  const data = yield res.json();
  if (data.errorMessage) {
    yield put(deleteAsientoError(data.errorMessage));
  } else {
    yield put(deleteAsientoSuccess(data.message));
    yield put(getAsientos(db));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(deleteAsiento.type, deleteAsi)
  ]);
};

export default rootSaga;