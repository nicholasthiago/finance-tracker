import { Item } from 'types/types';
import { Table } from 'react-bootstrap';
import { types } from 'data/data';

// Table Constructors

const tableHeader = ( item: Item ) => {
	return Object.keys( item ).map( ( header, key ) => {
		return ( <th key={ key } className={'tw-capitalize'}> { header } </th> );
	});
};

const typeTag = ( key: string ) => {

	let tagColor = 'tw-bg-' + types[key].color + '-500';
	let tagStyle = `tw-font-medium tw-text-white rounded `;

	console.log( tagColor );

	return (
		<div className={ tagStyle + ' ' + tagColor }>
			{ types[key].title }
		</div>
	)
};

const tablePopulator = ( items: Item[] ) => {
	return ( items ).map( ( item, key ) => {

		let date = item.date.toLocaleDateString( 'en-US', { year	:'numeric'	, month		:'long'	, day:'numeric' });
		let value = item.value.toLocaleString(	 'default', { style	:'currency'	, currency	:'CAD'	});
		let expense = types[item.type].expense ? 'tw-text-red-700' : 'tw-text-green-700';

		return (
			<tr key={ key }>
				<td>
					{ date	} </td>
				<td className={'tw-capitalize'}>
					{ typeTag( item.type )	} </td>
				<td>
					{ item.title	} </td>
				<td className={`${expense} tw-text-end`}>
					{ value.replace('CA$','') } </td>
			</tr>
		);
	});
};

// Table View component

type Props = {
	header	: Item	,
	list	: Item[],
};

const TableView = ({ header, list }: Props ) => {
	return (
		<Table className={'table-view'} bordered hover >
			<thead>
				<tr>
					{ tableHeader( header ) }
				</tr>
			</thead>
			<tbody>
				{ tablePopulator( list ) }
			</tbody>

		</Table>
	);
};

export default ( TableView );