import BalanceItem from "components/balance-item/balance-item.component";
import { Container } from "react-bootstrap";
import { getFullDate } from "utils/helpers";
import './table-control.style.scss';


type Props = {
	date	: string ;
	income	: number ;
	expense	: number ;
	onMonthChange: ( newMonth: string ) => void;
}

const TableControl = ({ date, income, expense, onMonthChange }: Props ) => {

	let [ year, month ] = getFullDate( date );

	const setCurrentMonth = ( date: string, type: string = '' ) => {
		let [ year, month ] = date.split('-');

		let currDate = new Date( parseInt( year ), parseInt( month ) );

		currDate.setMonth( currDate.getMonth() -1 );

		switch( type ) {
			case 'next':	currDate.setMonth( currDate.getMonth() +1 ); break ;
			case 'prev':	currDate.setMonth( currDate.getMonth() -1 ); break ;
			default:		onMonthChange(`${ year }-${ month}`); 		 break ;
		};

		onMonthChange(`${ currDate.getFullYear() }-${ currDate.getMonth() + 1 }`);
	};

	return (
		<Container className={'table-control'}>

			<div className={' tw-flex tw-flex-row'}>
				<span className={'arrow tw-bg-slate-300 tw-rounded tw-mx'}
					onMouseDown={ () => console.log( setCurrentMonth( date, 'prev')) }
				> {'<'} </span>
				
				<span className={'tw-mx-2'}> { month + ', ' + year }	</span>
				
				<span className={'arrow tw-bg-slate-300 tw-rounded'}
					onMouseDown={ () => console.log( setCurrentMonth( date, 'next')) }
				> {'>'} </span>
			</div>

			<div className={'table-summary tw-flex tw-flex-row'}>
				<BalanceItem title={'Income'}	value={ income	} />
				<BalanceItem title={'Expense'}	value={ expense	} />
				<BalanceItem title={'Balance'}	value={ income + expense } />
			</div>

		</Container>
	)
};

export default ( TableControl );