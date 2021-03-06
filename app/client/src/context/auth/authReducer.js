export default function authReducer(state, action) {
	switch (action.type) {
		case 'REGISTER_SUCCESS':
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				token: action.payload.token,
				isLoggedIn: true,
				loading: false
			};
		case 'REGISTER_FAIL':
			localStorage.removeItem('token');
			return {
				token: null,
				isLoggedIn: false,
				user: null,
				loading: false,
				error: action.payload
			};
		case 'LOGIN_SUCCESS':
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				token: action.payload.token,
				isLoggedIn: true,
				loading: false
			};
		case 'LOGIN_FAIL':
			localStorage.removeItem('token');
			return {
				token: null,
				isLoggedIn: false,
				user: null,
				loading: false,
				error: action.payload
			};
		case 'USER_LOADED':
			return {
				...state,
				isLoggedIn: true,
				loading: false,
				user: action.payload
			};
		case 'AUTH_ERROR':
			localStorage.removeItem('token');
			return {
				token: null,
				isLoggedIn: false,
				user: null,
				loading: false,
				error: action.payload
			};
		case 'LOGOUT':
			localStorage.removeItem('token');
			return {
				token: null,
				isLoggedIn: false,
				user: null,
				loading: false,
				error: null
			};
		case 'CLEAR_ERRORS':
			return {
				...state,
				error: null
			};
		default:
			return state;
	}
}
