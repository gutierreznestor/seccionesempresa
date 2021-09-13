import { replace } from "connected-next-router";
import { all, takeLatest, put } from "redux-saga/effects";
import { logout, logoutSuccess, logoutError } from "../../store/auth";

function* logoutUser() {
  const url = `http://localhost:3000/api/logout/logout`;
  let res = yield fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  const data = yield res.json();
  if (data.errorMessage) {
    yield put(logoutError(data.errorMessage));
  } else {
    yield put(logoutSuccess(data.message));
    yield put(replace('seleccionar-empresa'));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(logout.type, logoutUser)
  ]);
};

export default rootSaga;