import { AuthReduxAction } from '../store.constant';

const AuthReducer = (state = {}, action) => {
	switch (action.type) {
		case AuthReduxAction.hasChangeAuth:
			return { ...state, accessToken: action.accessToken || null };
	}
	return state;
};

export default AuthReducer;
