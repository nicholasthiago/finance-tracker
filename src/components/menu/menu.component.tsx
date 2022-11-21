import {
	Nav			,
	Navbar		,
	Container,	} from 'react-bootstrap';
import { LinkContainer as Link } from 'react-router-bootstrap';
import { getPath } from 'utils/helpers';

import { MenuRef, menu_ref } from './menu.reference';


const menuConstructor = ( ref: MenuRef ) =>
	Object.values( ref ).map( ( option, i ) =>
		( !option.external )
		? (	<Link to={ option.route } key={ i } >
				<Nav.Link href={ option.route }
					className={ `menu-item-${ option.title }` }
					onMouseDown={ () => console.log( getPath( option.route )) }
				>
					{ option.title }
				</Nav.Link>
			</Link>
		) : (
			<Nav.Link className={ `menu-item-${ option.title }` }
				onMouseDown={ () => window.location.href = option.route }
			> { option.title } </Nav.Link>
		)
	);


const Menu = () => {
	return (
		<Navbar className={'page-menu tw-bg-white'}
			fixed={'top'}
			expand={'md'}
			style={{ boxShadow:'4px 0 8px #DDD' }}
		>
			<Container>

				<Link to={ getPath('/') } className={'!tw-mr-8'}>
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