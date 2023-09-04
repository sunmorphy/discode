import api from "../../utils/api";
import { addCategoriesActionCreator } from "../categories/action";
import { addTempThreadActionCreator } from "../tempThreads/action";
import {
  hideLoadingActionCreator,
  showLoadingActionCreator,
} from "../loading/action";

const ThreadActionType = {
  RECEIVE_THREADS: "RECEIVE_THREADS",
  FILTER_THREADS: "FILTER_THREADS",
  TOGGLE_VOTE_THREAD: "TOGGLE_VOTE_THREAD",
  ADD_THREAD: "ADD_THREAD",
};

function addThreadActionCreator(thread) {
  return {
    type: ThreadActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function receiveThreadsActionCreator(threads) {
  return {
    type: ThreadActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function filterThreadsActionCreator({ threads, category }) {
  return {
    type: ThreadActionType.FILTER_THREADS,
    payload: {
      threads,
      category,
    },
  };
}

function toggleVoteThreadActionCreator({ userId, threadId, isUpVote }) {
  return {
    type: ThreadActionType.TOGGLE_VOTE_THREAD,
    payload: {
      userId,
      threadId,
      isUpVote,
    },
  };
}

function asyncAddThread({ title, body, category = "" }) {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
      dispatch(addTempThreadActionCreator(thread));
      dispatch(addCategoriesActionCreator(thread.category));
    } catch (error) {
      throw error.message;
    } finally {
      dispatch(hideLoadingActionCreator());
    }
  };
}

function asyncToggleVoteThread({ threadId, isUpVote }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    let voteType = api.VoteType.UP_VOTE;

    if (isUpVote === null) {
      voteType = api.VoteType.NEUTRALIZE_VOTE;
    } else if (!isUpVote) {
      voteType = api.VoteType.DOWN_VOTE;
    }

    dispatch(
      toggleVoteThreadActionCreator({
        userId: authUser.id,
        threadId,
        isUpVote,
      }),
    );

    try {
      await api.voteThread({ threadId, voteType });
    } catch (error) {
      dispatch(
        toggleVoteThreadActionCreator({
          userId: authUser.id,
          threadId,
          isUpVote,
        }),
      );
      throw error.message;
    }
  };
}

export {
  ThreadActionType,
  receiveThreadsActionCreator,
  filterThreadsActionCreator,
  toggleVoteThreadActionCreator,
  addThreadActionCreator,
  asyncToggleVoteThread,
  asyncAddThread,
};
