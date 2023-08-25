import { getProfile, login, putAccessToken } from "../../utils/api";

const AuthActionType = {
  SET_AUTH: "SET_AUTH",
  UNSET_AUTH: "UNSET_AUTH",
};

function setAuthActionCreator(auth) {
  return {
    type: AuthActionType.SET_AUTH,
    payload: {
      auth,
    },
  };
}

function unsetAuthActionCreator() {
  return {
    type: AuthActionType.SET_AUTH,
    payload: {
      auth: null,
    },
  };
}

function asyncSetAuth({ email, password }) {
  return async (dispatch) => {
    try {
      const token = await login({ email, password });
      putAccessToken(token);
      const authUser = await getProfile();

      dispatch(setAuthActionCreator(authUser));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthActionCreator());
    putAccessToken("");
  };
}

export {
  AuthActionType,
  setAuthActionCreator,
  unsetAuthActionCreator,
  asyncSetAuth,
  asyncUnsetAuthUser,
};
