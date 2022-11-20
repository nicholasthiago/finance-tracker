// -------------------------------------- //
// --- Data Simulation for App to Run --- //
// -------------------------------------- //

import { Types, Item } from 'types/types';

export const tableHeader : Item = {
	date	: new Date(  ),
	type	: "type",
	title	: "title",
	value	: 1.00,
};

export const items : Item [] = [
	{
		date	: new Date( 2022, 10, 15 ),
		type	: "food",
		title	: "McDonalds",
		value	: 13.90
	},{
		date	: new Date( 2022, 10, 15 ),
		type	: "salary",
		title	: "Bulls",
		value	: 1720.00
	},{
		date	: new Date( 2022, 10, 15 ),
		type	: "rent",
		title	: "Building Name",
		value	: 1200.00
	},{
		date	: new Date( 2022, 10, 15 ),
		type	: "food",
		title	: "Restaurant",
		value	: 26.90
	},{
		date	: new Date( 2022, 11, 15 ),
		type	: "food",
		title	: "Restaurant",
		value	: 26.90
	},
];


export const types: Types = {
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