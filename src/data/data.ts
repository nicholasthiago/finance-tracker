// -------------------------------------- //
// --- Data Simulation for App to Run --- //
// -------------------------------------- //

import { Category, Item } from 'types/types';

export const tableHeader : Item = {
	date	: new Date(  ),
	type	: "type",
	title	: "title",
	value	: 1.00,
};

export const items : Item[] = [
	{
		date	: new Date( 2022, 10, 15 ),
		type	: "food",
		title	: "McDonalds",
		value	: 13.90
	},{
		date	: new Date( 2022, 10, 15 ),
		type	: "salary",
		title	: "Bulls",
		value	: 44.90
	},{
		date	: new Date( 2022, 10, 15 ),
		type	: "rent",
		title	: "Metropolitan",
		value	: 1395.00
	},{
		date	: new Date( 2022, 10, 15 ),
		type	: "food",
		title	: "Fionn McColl's",
		value	: 26.90
	},{
		date	: new Date( 2022, 11, 15 ),
		type	: "food",
		title	: "Fionn McColl's",
		value	: 26.90
	},
];


export const types: Category = {
	food: {
		title	: 'Food'	,
		color	: 'red'		,
		expense	: true		,
	},
	rent: {
		title	: 'Rent'	,
		color	: 'orange'	,
		expense	: true		,
	},
	salary: {
		title	: 'Salary'	,
		color	: 'green'	,
		expense	: false		,
	},
};