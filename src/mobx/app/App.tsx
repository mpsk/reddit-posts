import React from 'react';
import { Route, Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { MainContainer } from './MainContainer';
import { RootStore, RouterStore } from 'mobx/stores';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

const stores = RootStore.getInstance().getStores();
const history = RouterStore.initHistory(stores.router);

Object.assign(window, { stores });

export const App = () => (
  <Provider {...stores}>
    <Router history={history}>
      <Route component={MainContainer} />
    </Router>
  </Provider>
);
