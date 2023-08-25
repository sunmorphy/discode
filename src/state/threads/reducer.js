import { ThreadActionType } from "./action";

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ThreadActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ThreadActionType.FILTER_THREADS:
      return action.payload.threads.filter((thread) =>
        thread.category.includes(action.payload.category),
      );
    case ThreadActionType.TOGGLE_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          if (action.payload.isUpVote) {
            return {
              ...thread,
              upVotesBy: thread.upVotesBy.includes(action.payload.userId)
                ? thread.upVotesBy
                : thread.upVotesBy.concat([action.payload.userId]),
              downVotesBy: thread.downVotesBy.includes(action.payload.userId)
                ? thread.downVotesBy.filter(
                    (id) => id !== action.payload.userId,
                  )
                : thread.downVotesBy,
            };
          } else if (!action.payload.isUpVote) {
            return {
              ...thread,
              upVotesBy: thread.upVotesBy.includes(action.payload.userId)
                ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
                : thread.upVotesBy,
              downVotesBy: thread.downVotesBy.includes(action.payload.userId)
                ? thread.downVotesBy
                : thread.downVotesBy.concat([action.payload.userId]),
            };
          } else {
            return {
              ...thread,
              upVotesBy: thread.upVotesBy.filter(
                (id) => id !== action.payload.userId,
              ),
              downVotesBy: thread.downVotesBy.filter(
                (id) => id !== action.payload.userId,
              ),
            };
          }
        }

        return thread;
      });
    case ThreadActionType.ADD_THREAD:
      return [action.payload.threads, ...threads];
    default:
      return threads;
  }
}

export default threadsReducer;
