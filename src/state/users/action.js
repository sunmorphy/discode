import api from "../../utils/api";
import {
  hideLoadingActionCreator,
  showLoadingActionCreator,
} from "../loading/action";

const UserActionType = {
  RECEIVE_USERS: "RECEIVE_USERS",
};

function receiveUsersActionCreator(users) {
  return {
    type: UserActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());
    try {
      await api.register({ name, email, password });
    } catch (error) {
      throw error.message;
    } finally {
      dispatch(hideLoadingActionCreator());
    }
  };
}

export { UserActionType, receiveUsersActionCreator, asyncRegisterUser };
