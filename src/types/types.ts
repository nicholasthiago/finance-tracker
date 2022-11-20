export type Item = {
	date	: Date		;
	type	: string	;
	title	: string	;
	value	: number	;
}

export type Types = {
	[ key: string ]: {
        title	: string	;
        color	: string	;
        expense	: boolean	;
    };
}