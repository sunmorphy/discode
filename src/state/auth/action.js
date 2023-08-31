import { getProfile, login, putAccessToken } from "../../utils/api";
import {
  hideLoadingActionCreator,
  showLoadingActionCreator,
} from "../loading/action";

const AuthActionType = {
  SET_AUTH_USER: "SET_AUTH_USER",
  UNSET_AUTH_USER: "UNSET_AUTH_USER",
};

function setAuthUserActionCreator(authUser) {
  return {
    type: AuthActionType.SET_AUTH_USER,
    payload: {
      authUser: authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: AuthActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());

    try {
      const token = await login({ email, password });
      putAccessToken(token);
      const authUser = await getProfile();

      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      throw error.message;
    } finally {
      dispatch(hideLoadingActionCreator());
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    putAccessToken("");
  };
}

export {
  AuthActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
