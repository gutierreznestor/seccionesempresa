import createSagaMiddleware from 'redux-saga';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createRouterMiddleware, routerReducer } from 'connected-next-router';

import empresasReducer from './empresas';
import rootSaga from '../sideeffects';

const sagaMiddleware = createSagaMiddleware();
const routerMiddleware = createRouterMiddleware();

const rootReducer = combineReducers({
  empresas: empresasReducer,
  router: routerReducer
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    if (typeof window !== 'undefined' && state?.router) {
      // preserve router value on client side navigation
      nextState.router = state.router
    }
    return nextState
  } else {
    return rootReducer(state, action)
  }
}

export const store = configureStore({
  reducer,
  middleware: [sagaMiddleware, routerMiddleware],
  devTools: true,
})

export const makeStore = () => {
  sagaMiddleware.run(rootSaga);
  return store;
};

export const Wrapper = createWrapper(makeStore, { debug: true })
