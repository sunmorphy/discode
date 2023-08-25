import { UserActionType } from "./action";

function usersReducer(users = [], action = {}) {
  switch (action.type) {
    case UserActionType.RECEIVE_USERS:
      return action.payload.users;
    default:
      return users;
  }
}

export default usersReducer;
