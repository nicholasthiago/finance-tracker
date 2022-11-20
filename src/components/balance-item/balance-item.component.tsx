import './balance-item.style.scss';

type Props = {
	title: string ;
	value: number ;
}

const BalanceItem = ({ title, value } : Props ) => {
	let txtColor = ( value < 0 ) ? 'tw-text-red-600' : 'tw-text-green-600' ;
	let formattedValue = value.toLocaleString(	 'default', { style	:'currency'	, currency	:'CAD'	});

	return (
		<span className={'balance-item'}>
			<h6> { title } </h6>
			<h6 className={'' + txtColor}> $ { formattedValue.replace('CA$','') } </h6>
		</span>
	);
};

export default ( BalanceItem );