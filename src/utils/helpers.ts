import { Types, Item } from 'types/types';
import { types } from 'data/data';

// -------------------------------------- //
// --- Helper Functions for App --------- //
// -------------------------------------- //

export const getCurrentMonth = () => {
	let now = new Date();

	let year	= now.getFullYear();
	let month	= now.getMonth() + 1; 

	return `${year}-${month}`;
};


export const getFullDate = ( date: string ) => {
	let [ year, month ] = date.split('-');

	let now = new Date( parseInt( year ), parseInt( month ) -1 );
	month = now.toLocaleDateString('en-US',{ month:'long' });

	return [ year, month ];
};


export const listFilterByMonth = ( list: Item[], date: string ): Item[] => {

	let filteredList: Item[] = [];
	let [ year, month ] = date.split('-');

	for ( let item of list ) {
		if (
			( item.date ).getFullYear() === parseInt( year )
			&&
			( item.date ).getMonth() + 1 === parseInt( month )
		) {
			filteredList.push( item );
		};
	};

	return ( filteredList );
};


export const getFinanceBalance = ( list: Item[] ) => {
	let income	= 0;
	let expense	= 0;

	for ( let item of list ) {
		( !types[ item.type ].expense )
		? income	+= item.value
		: expense	-= item.value ;
	};

	return [ income, expense ];
};


export const getPath = ( route: string ) => {
	let appRef = '/finance-tracker';

	return appRef + route ;
};