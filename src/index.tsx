import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from "react-router-dom";

import App from 'app/App';
import reportWebVitals from 'utils/reportWebVitals';


const root = ReactDOM.createRoot(
	document.getElementById('app-root') as HTMLElement
);

root.render(
	<Router>
		<App />
	</Router>
);

reportWebVitals();