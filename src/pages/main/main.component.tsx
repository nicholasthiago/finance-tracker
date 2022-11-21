import React from 'react';

import { useState, useEffect } from 'react';
import { getCurrentMonth, getFinanceBalance, listFilterByMonth } from 'utils/helpers';
import { Item } from 'types/types';

import TableView from 'components/table-view/table-view.component';

import { tableHeader, items, types } from 'data/data';
import TableControl from 'components/table-control/table-control.component';
import TableInput from 'components/table-input/table-input.component';


const Main = () => {

	const [ list	, setList		] = useState( items	);
	const [ type	, setType		] = useState( types	);
	const [ balance	, setBalance	] = useState([ 0,0 ]);

	const [ filteredList, setFilteredList ] = useState< Item [] >( [] );
	const [ currentMonth, setCurrentMonth ] = useState( getCurrentMonth() );

	useEffect( () => {
		setFilteredList( listFilterByMonth( list, currentMonth ) );
		console.log( list );
	}, [ list, currentMonth ] );

	useEffect( () => {
		setBalance( getFinanceBalance( filteredList ));
	}, [ filteredList ] );


	// handle effects and changes
	const handle_monthChange	= ( newMonth : string	) => setCurrentMonth( newMonth );
	const handle_itemInput		= ( item	 : Item		) => {

		let updatedList = list;
		updatedList.push( item );

		setList( updatedList );
	};


	// Balance deconstruct
	let [ income, expense ] = balance;

	return (
		<div className={'page-main tw-w-max tw-flex tw-flex-col tw-justify-start tw-mt-20'}>

			{/* Information		*/}
			<TableControl
				date={ currentMonth	}
				income={	income	}
				expense={	expense	}
				onMonthChange={ handle_monthChange }
			/>

			{/* Input Zone		*/}
			<TableInput
				onItemInput={ () => handle_itemInput }
			/>

			{/* Finance Table	*/}
			<TableView
				header={ tableHeader }
				list={ filteredList }
			/>

		</div>
	);
};

export default ( Main );