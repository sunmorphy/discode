import { AuthActionType } from "./action";

function authReducer(auth = null, action = {}) {
  switch (action.type) {
    case AuthActionType.SET_AUTH:
      return action.payload.user;
    case AuthActionType.UNSET_AUTH:
      return null;
    default:
      return auth;
  }
}

export default authReducer;
