import * as React from 'react';
import { Route, Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { MainContainer } from './MainContainer';
import { initStores } from 'mobx/stores';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

const { stores, history } = initStores();
Object.assign(window, { stores });

export const App = () => (
	<Provider {...stores}>
		<Router history={history} >
			<Route component={MainContainer} />
		</Router>
	</Provider>
);
