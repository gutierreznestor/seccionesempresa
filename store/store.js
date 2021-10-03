import createSagaMiddleware from 'redux-saga';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createRouterMiddleware, routerReducer } from 'connected-next-router';

import asientosReducer from './asientos';
import authReducer from './auth';
import contabilidadReducer from './contabilidad';
import copiasSeguridadReducer from './copiasSeguridad';
import diarioMayorReducer from './diarioMayor';
import empleadosReducer from './empleados';
import empresasReducer from './empresas';
import logsEmpleadosReducer from './logsEmpleados';
import logsSeccionesEmpresaReducer from './logsSeccionesEmpresa';
import logsUsuariosReducer from './logsUsuarios';
import planCuentasReducer from './planCuentas';
import seccionesEmpresaReducer from './seccionesEmpresa';
import usuariosReducer from './usuarios';
import rootSaga from '../sideeffects';

const sagaMiddleware = createSagaMiddleware();
const routerMiddleware = createRouterMiddleware();

const rootReducer = combineReducers({
  asientos: asientosReducer,
  auth: authReducer,
  contabilidad: contabilidadReducer,
  copiasSeguridad: copiasSeguridadReducer,
  diarioMayor: diarioMayorReducer,
  empleados: empleadosReducer,
  empresas: empresasReducer,
  logsEmpleados: logsEmpleadosReducer,
  logsSeccionesEmpresa: logsSeccionesEmpresaReducer,
  logsUsuarios: logsUsuariosReducer,
  planCuentas: planCuentasReducer,
  router: routerReducer,
  seccionesEmpresa: seccionesEmpresaReducer,
  usuarios: usuariosReducer,
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
