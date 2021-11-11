import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import rootSaga from './sagas';
import { routerMiddleware } from 'connected-react-router';

export default function configureStore(initialState = {}, history) {
  let composeEnhancers = compose;
  let reduxSagaMonitorOptions = {};

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(createReducer(history), initialState, composeEnhancers(...enhancers));

  sagaMiddleware.run(rootSaga);
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {};
  store.injectedSagas = {};

  return store;
}
