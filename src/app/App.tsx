import React from 'react';
import { Routes, Route } from 'react-router';
import './App.css';

const App = () => {
	return (
		<div className={'App'}>

			<Routes>
				<Route path={'/'} element={ <div> {'Component'} </div> } />
			</Routes>

		</div>
	);
}

export default ( App );