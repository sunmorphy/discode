import { getAllThreads, getAllUsers, getLeaderboards } from "../../utils/api";
import { receiveUsersActionCreator } from "../users/action";
import { receiveThreadsActionCreator } from "../threads/action";
import { receiveLeaderboardsActionCreator } from "../leaderboards/action";

function asyncPopulateUsersThreadsAndLeaderboards() {
  return async (dispatch) => {
    try {
      const users = await getAllUsers();
      const threads = await getAllThreads();
      const leaderboards = await getLeaderboards();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (e) {
      alert(e.message);
    }
  };
}

export { asyncPopulateUsersThreadsAndLeaderboards };
