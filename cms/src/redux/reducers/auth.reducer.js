import { AuthReduxAction } from "../store.constant";

const AuthReducer = (state = {}, action) => {
  switch (action.type) {
    case AuthReduxAction.hasChangeAuth:
      return { ...state, accessToken: action.accessToken || null };

    default:
      return state;
  }
};

export default AuthReducer;
