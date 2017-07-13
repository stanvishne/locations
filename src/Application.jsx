import React from 'react';
import {Provider} from 'react-redux';
import store from './AppStore.js';
import { BrowserRouter, Route } from 'react-router-dom'
import MainScreen from './components/MainScreen.jsx';

class Application extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>					
					<Route path='/' component={MainScreen}/>										
				</BrowserRouter>
			</Provider>		
		);
	}
}

export default Application;