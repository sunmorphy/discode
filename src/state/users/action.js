import { register } from "../../utils/api";

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
  return async () => {
    try {
      await register({ name, email, password });
    } catch (error) {
      alert(error.message);
    }
  };
}

export { UserActionType, receiveUsersActionCreator, asyncRegisterUser };
