import { getAllThreads, getAllUsers, getLeaderboards } from "../../utils/api";
import { receiveUsersActionCreator } from "../users/action";
import { receiveThreadsActionCreator } from "../threads/action";
import { receiveLeaderboardsActionCreator } from "../leaderboards/action";
import toast from "react-hot-toast";
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
      const users = await getAllUsers();
      const threads = await getAllThreads();
      const leaderboards = await getLeaderboards();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
      dispatch(receiveTempThreadsActionCreator(threads));
      dispatch(receiveCategoriesActionCreator(threads));
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoadingActionCreator());
    }
  };
}

export { asyncPopulateUsersThreadsAndLeaderboards };
