import './table-input.style.scss';

import { types } from 'data/data';
import { Types, Item } from 'types/types';
import { useEffect, useState } from 'react';

import { Button, Container, Form } from 'react-bootstrap';


// TableInput : props type
type Props = {
	onItemInput: ( item: Item ) => void;
};

const TableInput = ({ onItemInput }: Props ) => {

	const [ currItem, setCurrItem ] = useState({
		date	: new Date(),
		type	: ''	,
		title	: ''	,
		value	: 0.00
	});

	const [ date , setDate	] = useState( new Date() );
	const [ type , setType	] = useState( ''	);
	const [ title, setTitle	] = useState( ''	);
	const [ value, setValue	] = useState( 0		);

	let typeList: string[] = Object.keys( types );

	const setItemInput = () => {
		let errors: string[] = [];

		if ( value <= 0 ) 					errors.push('Invalid value'			);
		if ( title === '' ) 				errors.push('Empty title field'		);
		if ( isNaN( date.getTime()) ) 		errors.push('Invalid date selected'	);
		if ( !typeList.includes( type ) ) 	errors.push('Invalid type selected'	);
	
		if ( errors.length > 0 ) {
			alert( errors.join('\n') );

		} else {
			setCurrItem({
				date	: date	,
				type	: type	,
				title	: title	,
				value	: value	,
			});
	
			onItemInput( currItem )
			clearInput();
		};

	};

	const clearInput = () => {
		setDate(  new Date() );
		setType(  ''	);
		setTitle( ''	);
		setValue( 0		);
	};

	const selector_Type = ( types: Types ) => {
		return (
			<Form.Select size={'sm'}
				onChange={ e => setType(( e.target.value ).toLowerCase() )}
			>

				<option> {'Type'} </option>

				{	Object.values( types ).map( ( type,i ) => {
						return ( <option key={ i }> { type.title } </option> );
					})
				}
			</Form.Select>
		);
	};

	useEffect( () => {
		setCurrItem({
			date	: date	,
			type	: type	,
			title	: title	,
			value	: value	,
		});
	}, [ date, title, type, value ]);


	return (
		<Container className={'table-input'} >

			<div className={'input-group'}>
				<div className={'item-date'	}>
					<Form.Control type={'date'} size={'sm'}
						onChange={ e => setDate( new Date( e.target.value ) )}
					/>
				</div>

				<div className={'item-type'	}>
					{ selector_Type( types ) }
				</div>

				<div className={'item-title'}>
					<Form.Control placeholder={'Title'} size={'sm'} value={ title }
						onInput={ e => setTitle(( e.target as HTMLInputElement ).value )}
					/>
				</div>

				<div className={'item-value'}>
					<Form.Control type={'number'} size={'sm'}
						placeholder={'Value'}
						step={'0.01'} min={ 0 } value={ value }
						onInput={ e => setValue( parseFloat(( e.target as HTMLInputElement ).value ))}
					/>
				</div>
			</div>

			<div className={'item-submit tw-pt-3'}>
				<Button size={'sm'}
					className={'!tw-bg-slate-500 !tw-border-slate-500 !tw-px-10 !tw-py-1'}
					onMouseDown={ setItemInput }
				> {'Add Item'} </Button>
			</div>

		</Container>
	);
};

export default ( TableInput );