import { LeaderboardActionType } from "./action";

function leaderboardsReducer(leaderboards = [], action = {}) {
  switch (action.type) {
    case LeaderboardActionType.RECEIVE_LEADERBOARDS:
      return action.payload.leaderboards;
    default:
      return leaderboards;
  }
}

export default leaderboardsReducer;
