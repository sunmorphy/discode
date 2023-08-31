import { ThreadDetailActionType } from "./action";

function threadDetailReducer(detailThread = null, action = {}) {
  switch (action.type) {
    case ThreadDetailActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.detailThread;
    case ThreadDetailActionType.CLEAR_THREAD_DETAIL:
      return null;
    case ThreadDetailActionType.TOGGLE_VOTE_THREAD_DETAIL:
      if (action.payload.isUpVote === true) {
        return {
          ...detailThread,
          upVotesBy: detailThread.upVotesBy.includes(action.payload.userId)
            ? detailThread.upVotesBy
            : detailThread.upVotesBy.concat([action.payload.userId]),
          downVotesBy: detailThread.downVotesBy.includes(action.payload.userId)
            ? detailThread.downVotesBy.filter(
                (id) => id !== action.payload.userId,
              )
            : detailThread.downVotesBy,
        };
      } else if (action.payload.isUpVote === false) {
        return {
          ...detailThread,
          upVotesBy: detailThread.upVotesBy.includes(action.payload.userId)
            ? detailThread.upVotesBy.filter(
                (id) => id !== action.payload.userId,
              )
            : detailThread.upVotesBy,
          downVotesBy: detailThread.downVotesBy.includes(action.payload.userId)
            ? detailThread.downVotesBy
            : detailThread.downVotesBy.concat([action.payload.userId]),
        };
      }

      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
        downVotesBy: detailThread.downVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
      };
    case ThreadDetailActionType.TOGGLE_VOTE_COMMENT_THREAD_DETAIL:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            if (action.payload.isUpVote === true) {
              return {
                ...comment,
                upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                  ? comment.upVotesBy
                  : comment.upVotesBy.concat([action.payload.userId]),
                downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                  ? comment.downVotesBy.filter(
                      (id) => id !== action.payload.userId,
                    )
                  : comment.downVotesBy,
              };
            } else if (action.payload.isUpVote === false) {
              return {
                ...comment,
                upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                  ? comment.upVotesBy.filter(
                      (id) => id !== action.payload.userId,
                    )
                  : comment.upVotesBy,
                downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                  ? comment.downVotesBy
                  : comment.downVotesBy.concat([action.payload.userId]),
              };
            }

            return {
              ...comment,
              upVotesBy: comment.upVotesBy.filter(
                (id) => id !== action.payload.userId,
              ),
              downVotesBy: comment.downVotesBy.filter(
                (id) => id !== action.payload.userId,
              ),
            };
          }

          return comment;
        }),
      };
    case ThreadDetailActionType.ADD_COMMENT_THREAD_DETAIL:
      return {
        ...detailThread,
        comments: [action.payload.comment, ...detailThread.comments],
      };
    default:
      return detailThread;
  }
}

export default threadDetailReducer;
