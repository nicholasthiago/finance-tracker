import {
	useRef		,
	useState	,
	useEffect	,
	useCallback	,
} from 'react'	;


//	useToggle => toggle boolean values:
//	const [ value, toggleValue ] = useToggle( false )
export function useToggle( defaultValue: boolean ) {

	const [ value, setValue ] = useState( defaultValue )

	function toggleValue( value: boolean ) {
		setValue( currentValue =>
			( typeof value === 'boolean' )
			? value : !currentValue
		)
	};

	return [ value, toggleValue ];
};


//	useTimeout => sets Timeout limits to callbacks
//	const { clear, reset } = useTimeout(() => setCount(0), 1000 )
export function useTimeout( callback: Function, delay: number ) {
	const callbackRef	= useRef < Function > ( callback )
	const timeoutRef	= useRef < any	> ()

	useEffect( () => {
		callbackRef.current = callback
	}, [ callback ]);

	const set = useCallback( () => {
		timeoutRef.current = setTimeout(() =>
			callbackRef.current(), delay
		)
	}, [ delay ]);

	const clear = useCallback( () => {
		timeoutRef.current && clearTimeout( timeoutRef.current )
	}, []);

	useEffect( () => {
		set()
		return clear;
	}, [ delay, set, clear ]);

	const reset = useCallback( () => {
		clear()
		set()
	}, [ clear, set ]);

	return { reset, clear };
};


//	useDelay => triggers callback after delay
//	useDelay( () => printCount(), 1000, count )
export function useDelay( callback: Function, delay: number, deps=[] ) {
	const { clear, reset } = useTimeout( callback, delay )

	useEffect( reset, [...deps, reset ] )
	useEffect( clear, [] ) // eslint-disable-line
};


//	useUpdate => triggers callback action when something changes
//	useUpdate( () => doSomething() )
export function useUpdate( callback: Function, deps=[] ) {
	const firstRenderRef = useRef( true );

	useEffect( () => {
		if ( firstRenderRef.current ) {
			firstRenderRef.current = false
			return
		}
		return callback()
	}, deps ); // eslint-disable-line
};


//	useArray => handle array with many ready to use functions
//	const { array, set, push, remove, filter, update, clear } = useArray( arrayData )
export function useArray( defaultValue: Array< any > ) {
	const [ array, setArray ] = useState( defaultValue )

	function clear() { setArray( [] ) }

	function push( element: any ) { setArray( a => [ ...a, element ] )}

	function filter( callback: any ) { setArray( a => a.filter( callback ) )}

	function update( index: number, newElement: any ) {
		setArray( a => [
			...a.slice( 0, index ),
			newElement,
			...a.slice( index + 1, a.length - 1 )
		])
	}

	function remove( index: number ) {
		setArray( a => [
			...a.slice( 0, index ),
			...a.slice( index + 1, a.length - 1 )
		])
	}

	return { array, set: setArray, push, filter, update, remove, clear };
};


//	usePrevious => store previous state value
//	const prevState = usePrevious( state )
export function usePrevious( value: any ) {
	const currentRef  = useRef( value )
	const previousRef = useRef()

	if ( currentRef.current !== value ) {
		previousRef.current = currentRef.current
		currentRef.current = value
	}

	return previousRef.current
};


//	useStateHistory => get history control of some State
//	const [ count, setCount, { history, pointer, prev, next, go }] = useStateHistory( initCount )
export function useStateHistory(
	defaultValue : any,
	{ capacity = 12 } = {}
) {
	const [ value, setValue ] = useState( defaultValue )
	const historyRef = useRef([ value ])
	const pointerRef = useRef( 0 )

	const set = useCallback(
		( v: ( args: any ) => any ) => {
			const resolvedValue = typeof v === 'function' ? v( value ) : v

			if ( historyRef.current[ pointerRef.current ] !== resolvedValue ) {
				if ( pointerRef.current < historyRef.current.length - 1 ) {
					historyRef.current.splice( pointerRef.current + 1 )
				}
				historyRef.current.push( resolvedValue )

				while ( historyRef.current.length > capacity ) {
					historyRef.current.shift()
				}
				pointerRef.current = historyRef.current.length - 1
			}
			setValue( resolvedValue )
		},
		[ capacity, value ]
	)

	const prev = useCallback( () => {
		if ( pointerRef.current <= 0 ) return
		pointerRef.current--

		setValue( historyRef.current[ pointerRef.current ] )
	}, [])

	const next = useCallback( () => {
		if ( pointerRef.current >= historyRef.current.length - 1 ) return
		pointerRef.current++

		setValue( historyRef.current[ pointerRef.current ] )
	}, [])

	const go = useCallback( ( index: number ) => {
		if ( index < 0 || index >= historyRef.current.length - 1 ) return
		pointerRef.current = index

		setValue( historyRef.current[ pointerRef.current ] )
	}, [])

	return [
		value, set,
		{
			history: historyRef.current,
			pointer: pointerRef.current,
			prev, next, go
		}
	];
};


//	useStorage => save items / functions on local/session Storages
//	const [ value, setValue, delValue ] = useStorage('key','value','local')
export function useStorage( key: String, defaultValue: Object, storageObject: Object ) {

	const storage = storageObject === 'local' ? ( window.localStorage ) : ( window.sessionStorage )

	const [ value, setValue ] = useState( () => {
		const jsonValue = storage.getItem( key.toString() )

		if ( jsonValue != null ) return JSON.parse( jsonValue )

		// ( typeof initialValue === 'function' ) ? defaultValue() : defaultValue ;
	})

	useEffect( () => {
		if ( value === undefined ) return storage.removeItem( key.toString() )

		storage.setItem( key.toString(), JSON.stringify( value ))
	}, [ key, value, storage ])

	const delValue = useCallback( () => setValue( undefined ), [] )

	return [ value, setValue, delValue ];
};


//	useAsync => hook for async functions / requests
//	const { loading, error, value } = useAsync( () => {
//		return new Promise(( resolve, reject ) => {} )
//	})
export function useAsync( callback: any , deps=[] ) {
	const [ loading	, setLoading ] = useState( true )
	const [ error	, setError	 ] = useState()
	const [ value	, setValue	 ] = useState()

	const callbackMemoized = useCallback( () => {

		setLoading( true )
		setError( undefined )
		setValue( undefined )

		callback()
			.then(  setValue )
			.catch( setError )
			.finally( () => setLoading( false ))
	}, deps ) // eslint-disable-line

	useEffect( () => callbackMemoized(), [ callbackMemoized ])

	return [ loading, error, value ];
};


//	useFetch => fetch request hook
//	const { loading, error, value } = useFetch( url, {}, [ deps ])
export type useFetchType = {
	status		: Number	;
	statusText	: String	;
	data		: any		;
	error		: any		;
	loading		: Boolean	;
};

export const useFetch = ( url: String, options = {} ): useFetchType => {
	const fetchOptions = {
		headers: { "Content-Type": "application/json" },
		...options
	};

	const [ status		, setStatus		] = useState<Number>(0)			;
	const [ statusText	, setStatusText	] = useState<String>('')		;
	const [ data		, setData		] = useState<any>()				;
	const [ error		, setError		] = useState<any>()				;
	const [ loading		, setLoading	] = useState<boolean>(false)	;

	const getAPIData = async () => {
		setLoading( true );
		try {
			const apiResponse = await fetch(`${ url }`, fetchOptions );
			const json = await apiResponse.json();

			setStatus(		apiResponse.status		);
			setStatusText(	apiResponse.statusText	);
			setData( json );

		} catch ( error ) { setError(error) }

		setLoading(false);
	};

	useEffect(() => {
		getAPIData();
	}, [] ); // eslint-disable-line react-hooks/exhaustive-deps

	return { status, statusText, data, error, loading };
};


//	useMasked => apply mask formatting to String data
//	const [ value, maskedValue, setValue ] = useMasked([ '900.00','R$ ####.## ])
export function useMasked( defaultValue: String, pattern: String ) {
	const valueRef = useRef( defaultValue )
	const [ value, setValue ] = useState( defaultValue.toString() )

	useEffect(() => {
		setValue( value.replace( pattern.toString(), '$&,'));
	}, [ defaultValue ]) // eslint-disable-line

	return [ valueRef.current, value, setValue ];
};


//	useEventListener => add eventListener to target, with function defined
//	useEventListener( 'mousedown', event => console.log( event ), window.document.element )
export function useListener(
	eventType	: String	= ''			,
	target		: Window	= window		,
	listener	: any		= () => ""		,
	options		: any		= null			,
) {
	const savedListener = useRef < any > ();

	useEffect( () => savedListener.current = ( listener !== undefined ) ? listener : () => "" , [ listener ])

	useEffect( () => {

		if ( !target?.addEventListener ) return;

		const eventListener = ( event:any ) => savedListener.current	( event );

		target.addEventListener( eventType.toString(), eventListener, options );

		return () => 
			target.removeEventListener( eventType.toString(), eventListener, options );
	}, [ eventType, target, options ]);
};


//	useObject =>
//	usage...
//	export function useObject( defaultValue ) {};