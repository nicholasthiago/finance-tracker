import React from 'react';

import {
	Nav			,
	Navbar		,
	Container,	} from 'react-bootstrap';
import { LinkContainer as Link } from 'react-router-bootstrap';

import { MenuProps, MenuRef, menu_ref } from './menu.reference';


const menuConstructor = ( ref: MenuRef ) =>
	Object.values( ref ).map( ( option, i ) => {
		return (
			<Link to={ option.route } key={ i }>
				<Nav.Link href={ option.route }
					className={ `menu-item-${ option.title }` }
					onMouseDown={ () => console.log( option.route ) }
				>
					{ option.title }
				</Nav.Link>
			</Link>
		);
	});


const Menu = ({ dark = false } : MenuProps ) => {
	return (
		<Navbar className={'page-menu tw-bg-white'}
			fixed={'top'}
			expand={'md'}
			style={{ boxShadow:'4px 0 8px #DDD' }}
		>
			<Container>

				<Link to={'/'}>
					<Navbar.Brand> {'Finance Tracker'} </Navbar.Brand>
				</Link>

				<Navbar.Toggle aria-controls={"basic-navbar-nav"} />

				<Navbar.Collapse id={"basic-navbar-nav"}>
					<Nav className={"me-auto tw-bg-white"}>
						
						{ menuConstructor( menu_ref ) }

					</Nav>
				</Navbar.Collapse>

			</Container>
		</Navbar>
	);
};

export default ( Menu );