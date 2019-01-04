/*tslint:disable*/

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';

import { App as MobxApp } from 'mobx/app/App';
import { App as ReduxApp } from 'redux/app/App';

const REACT_APP_RUN = process.env.REACT_APP_RUN;
const appPath = REACT_APP_RUN === 'MOBX' ? 'mobx/app/App' : 'redux/app/App';
const App = REACT_APP_RUN === 'MOBX' ? MobxApp : ReduxApp; // require('mobx/app/App').App : require('redux/app/App').App;

renderApp();

document.title = `${REACT_APP_RUN} App`;

if ((module as any).hot) {
  (module as any).hot.accept(appPath, renderApp);
}

function renderApp() {
  ReactDOM.render(React.createElement(App), document.getElementById('root'));
}
