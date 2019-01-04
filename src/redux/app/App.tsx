import React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { MainContainer } from 'redux/app/MainContainer';
import { configureStore } from 'redux/store';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

const { store, history } = configureStore();
Object.assign(window, { store });

export const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route component={MainContainer} />
    </ConnectedRouter>
  </Provider>
);
