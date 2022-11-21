import React from 'react';
import './App.scss';

import { Routes, Route } from 'react-router';

import Menu from 'components/menu/menu.component';
import Main from 'pages/main/main.component';
import { getPath } from 'utils/helpers';
import About from 'pages/about/about.page';


const App = () => {
	return (
		<div className={'App tw-self-center'}>

			<Menu />

			<Routes>
				<Route path={ getPath('/')		} element={ <Main />	} />
				<Route path={ getPath('/about')	} element={ <About />	} />
			</Routes>

		</div>
	);
}

export default ( App );