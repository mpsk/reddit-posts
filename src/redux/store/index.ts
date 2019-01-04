import { applyMiddleware, compose, createStore, AnyAction } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { rootReducer, State } from './reducers';
import { rootSaga } from './sagas';

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const history = createBrowserHistory();

  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const store = createStore<State, AnyAction, {}, {}>(rootReducer(history), compose(applyMiddleware(...middlewares)));

  sagaMiddleware.run(rootSaga);

  return {
    store,
    history
  };
};
