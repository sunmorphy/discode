import api from "../../utils/api";
import { receiveUsersActionCreator } from "../users/action";
import { receiveThreadsActionCreator } from "../threads/action";
import { receiveLeaderboardsActionCreator } from "../leaderboards/action";
import { receiveCategoriesActionCreator } from "../categories/action";
import { receiveTempThreadsActionCreator } from "../tempThreads/action";
import {
  hideLoadingActionCreator,
  showLoadingActionCreator,
} from "../loading/action";

function asyncPopulateUsersThreadsAndLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();
      const leaderboards = await api.getLeaderboards();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
      dispatch(receiveTempThreadsActionCreator(threads));
      dispatch(receiveCategoriesActionCreator(threads));
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      throw error.message;
    } finally {
      dispatch(hideLoadingActionCreator());
    }
  };
}

export { asyncPopulateUsersThreadsAndLeaderboards };
