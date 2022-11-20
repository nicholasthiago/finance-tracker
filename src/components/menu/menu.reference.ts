// Type declaration for Menu and Menu items
export type MenuRef = {
	[ key: string ]: {
		title	: string	;
		route	: string	;
	}
};

// Menu component : props reference
export interface MenuProps {
	dark?	: Boolean		;
}

// Menu Reference
export const menu_ref: MenuRef = {
	home	: {
		title: 'Home'		,
		route: '/'			,
	},
	month	: {
		title: 'By Month'	,
		route: '/month'		,
	},
	year	: {
		title: 'By Year'	,
		route: '/year'		,
	},
	about	: {
		title: 'About'	,
		route: '/about'	,
	},
	github	: {
		title: 'GitHub'	,
		route: '/git'	,
	},
};