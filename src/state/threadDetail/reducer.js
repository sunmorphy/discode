import { ThreadDetailActionType } from "./action";

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ThreadDetailActionType.RECEIVE_THREAD_DETAIL:
      return threadDetail;
    case ThreadDetailActionType.CLEAR_THREAD_DETAIL:
      return null;
    case ThreadDetailActionType.TOGGLE_VOTE_THREAD_DETAIL:
      if (action.payload.isUpVote) {
        return {
          ...threadDetail,
          upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
            ? threadDetail.upVotesBy
            : threadDetail.upVotesBy.concat([action.payload.userId]),
          downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
            ? threadDetail.downVotesBy.filter(
                (id) => id !== action.payload.userId,
              )
            : threadDetail.downVotesBy,
        };
      } else if (!action.payload.isUpVote) {
        return {
          ...threadDetail,
          upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
            ? threadDetail.upVotesBy.filter(
                (id) => id !== action.payload.userId,
              )
            : threadDetail.upVotesBy,
          downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
            ? threadDetail.downVotesBy
            : threadDetail.downVotesBy.concat([action.payload.userId]),
        };
      } else {
        return {
          ...threadDetail,
          upVotesBy: threadDetail.upVotesBy.filter(
            (id) => id !== action.payload.userId,
          ),
          downVotesBy: threadDetail.downVotesBy.filter(
            (id) => id !== action.payload.userId,
          ),
        };
      }
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;