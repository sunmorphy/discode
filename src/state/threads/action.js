import { createThread, voteThread, VoteType } from "../../utils/api";

const ThreadActionType = {
  RECEIVE_THREADS: "RECEIVE_THREADS",
  FILTER_THREADS: "FILTER_THREADS",
  TOGGLE_VOTE_THREAD: "TOGGLE_VOTE_THREAD",
  ADD_THREAD: "ADD_THREAD",
};

function addThreadActionCreator({ title, body, category }) {
  return {
    type: ThreadActionType.ADD_THREAD,
    payload: {
      title,
      body,
      category,
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
    try {
      const thread = await createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
  };
}

async function asyncToggleVoteThread({ threadId, isUpVote }) {
  return async (dispatch, getState) => {
    const { auth } = getState();
    let voteType = VoteType.UP_VOTE;

    if (!isUpVote) {
      voteType = VoteType.DOWN_VOTE;
    }

    if (isUpVote === null) {
      voteType = VoteType.NEUTRALIZE_VOTE;
    }

    try {
      dispatch(toggleVoteThreadActionCreator({ userId: auth.id, isUpVote }));
      await voteThread({ threadId, voteType });
    } catch (e) {
      alert(e.message);
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
