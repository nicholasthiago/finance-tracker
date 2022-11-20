export type Item = {
	date	: Date		;
	type	: string	;
	title	: string	;
	value	: number	;
}

export type Category = {
	[ key: string ]: {
        title	: string	;
        color	: string	;
        expense	: boolean	;
    };
}