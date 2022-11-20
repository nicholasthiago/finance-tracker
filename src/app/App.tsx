import React from 'react';
import './App.scss';

import { Routes, Route } from 'react-router';

import Menu from 'components/menu/menu.component';
import Main from 'pages/main/main.component';


const App = () => {
	return (
		<div className={'App tw-self-center'}>

			<Menu />

			<Routes>
				<Route path={'/'} element={ <Main /> } />
			</Routes>

		</div>
	);
}

export default ( App );