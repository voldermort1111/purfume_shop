import { AuthReduxAction } from '../store.constant';

export function hasChangeAuth(accessToken) {
	return { type: AuthReduxAction.hasChangeAuth, accessToken };
}
