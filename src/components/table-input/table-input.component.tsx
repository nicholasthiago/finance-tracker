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
		type	: ""	,
		title	: ""	,
		value	: 0.00
	});

	const [ date , setDate	] = useState( new Date() );
	const [ type , setType	] = useState( ''	);
	const [ title, setTitle	] = useState( ''	);
	const [ value, setValue	] = useState( 0.00	);

	const setItemInput = () => onItemInput( currItem );


	const selector_Type = ( types: Types ) => {
		return (
			<Form.Select size={'sm'} onChange={ e => setType(( e.target.value ).toLowerCase() )} >

				<option> {'Select type'} </option>

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

			<div className={'input-group tw-justify-around'}>
				<div className={'item-date'	}>
					<Form.Control type={'date'} size={'sm'}
						onChange={ e => setDate( new Date( e.target.value ) )}
					/>
				</div>

				<div className={'item-type'	}>
					{ selector_Type( types ) }
				</div>

				<div className={'item-title'}>
					<Form.Control placeholder={'Title'} size={'sm'}
						onInput={ e => setTitle(( e.target as HTMLInputElement ).value )}
					/>
				</div>

				<div className={'item-value'}>
					<Form.Control type={'number'} name={'price'} size={'sm'} placeholder={'Value'}
						onInput={ e => setValue( parseInt(( e.target as HTMLInputElement ).value ))}
					/>
				</div>
			</div>

			<div className={'item-submit tw-pt-3'}>
				<Button size={'sm'}
					className={'!tw-bg-slate-500 !tw-border-slate-500 !tw-px-10 !tw-py-1'}
					onMouseDown={ () => setItemInput() }
				> {'Add Item'} </Button>
			</div>

		</Container>
	);
};

export default ( TableInput );