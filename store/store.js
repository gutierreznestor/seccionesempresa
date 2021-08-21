import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';

import empresasReducer from './data/empresas';
import rootSaga from '../sideeffects/empresasSaga';

const sagaMiddleware = createSagaMiddleware();

const reducer = {
  empresas: empresasReducer,
};

export const store = configureStore({
  reducer,
  middleware: [sagaMiddleware],
  devTools: true,
})

export const makeStore = () => {
  sagaMiddleware.run(rootSaga);
  return store;
};

export const Wrapper = createWrapper(makeStore, { debug: true })
