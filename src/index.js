import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import AuthProvider from "./AuthProvider"

ReactDOM.render(
<React.StrictMode>
	<AuthProvider></AuthProvider> 
	 	<Provider store={store}>
			<AuthProvider>
				<App />
			</AuthProvider> 
		</Provider>
</React.StrictMode>,
document.getElementById('root')
);

