// Type declaration for Menu and Menu items
export type MenuRef = {
	[ key: string ]: {
		title	: string	;
		route	: string	;
		external: boolean	;
	}
};

// Menu component : props reference
export interface MenuProps {
	dark?	: Boolean		;
}

// Menu Reference
const appRef = '/finance-tracker';

export const menu_ref: MenuRef = {
	home	: {
		title		: 'Home'	,
		external	: false		,
		route		: appRef + '/'	,
	},
	about	: {
		title		: 'About'	,
		external	: false		,
		route		: appRef + '/about'	,
	},
	github	: {
		title		: 'GitHub'	,
		external	: true		,
		route		: 'https://github.com/nicholasthiago/finance-tracker'	,
	},
	/*
	month	: {
		title: 'By Month'	,
		external: false		,
		route: '/month'		,
	},
	year	: {
		title: 'By Year'	,
		external: false		,
		route: '/year'		,
	},
	*/
};