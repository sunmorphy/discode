import {
  createComment,
  getDetailThread,
  voteThread,
  voteThreadComment,
  VoteType,
} from "../../utils/api";

const ThreadDetailActionType = {
  RECEIVE_THREAD_DETAIL: "RECEIVE_THREAD_DETAIL",
  CLEAR_THREAD_DETAIL: "CLEAR_THREAD_DETAIL",
  TOGGLE_VOTE_THREAD_DETAIL: "TOGGLE_VOTE_THREAD_DETAIL",
  TOGGLE_VOTE_COMMENT_THREAD_DETAIL: "TOGGLE_VOTE_COMMENT_THREAD_DETAIL",
  ADD_COMMENT_THREAD_DETAIL: "ADD_COMMENT_THREAD_DETAIL",
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ThreadDetailActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ThreadDetailActionType.CLEAR_THREAD_DETAIL,
  };
}

function toggleVoteThreadDetailActionCreator({ userId, isUpVote }) {
  return {
    type: ThreadDetailActionType.TOGGLE_VOTE_THREAD_DETAIL,
    payload: {
      userId,
      isUpVote,
    },
  };
}

function toggleVoteCommentThreadDetailActionCreator({ userId, isUpVote }) {
  return {
    type: ThreadDetailActionType.TOGGLE_VOTE_COMMENT_THREAD_DETAIL,
    payload: {
      userId,
      isUpVote,
    },
  };
}

function addCommentThreadDetailActionCreator({ comment }) {
  return {
    type: ThreadDetailActionType.ADD_COMMENT_THREAD_DETAIL,
    payload: {
      comment,
    },
  };
}

async function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await getDetailThread({ threadId });
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (e) {
      alert(e.message);
    }
  };
}

async function asyncToggleVoteThreadDetail(isUpVote) {
  return async (dispatch, getState) => {
    const { auth, threadDetail } = getState();
    let voteType = VoteType.UP_VOTE;

    if (!isUpVote) {
      voteType = VoteType.DOWN_VOTE;
    }

    if (isUpVote === null) {
      voteType = VoteType.NEUTRALIZE_VOTE;
    }

    try {
      dispatch(
        toggleVoteThreadDetailActionCreator({ userId: auth.id, isUpVote }),
      );
      await voteThread({
        threadId: threadDetail.id,
        voteType,
      });
    } catch (e) {
      alert(e.message);
    }
  };
}

async function asyncToggleVoteCommentThreadDetail({ commentId, isUpVote }) {
  return async (dispatch, getState) => {
    const { auth, threadDetail } = getState();
    let voteType = VoteType.UP_VOTE;

    if (!isUpVote) {
      voteType = VoteType.DOWN_VOTE;
    }

    if (isUpVote === null) {
      voteType = VoteType.NEUTRALIZE_VOTE;
    }

    try {
      dispatch(
        toggleVoteThreadDetailActionCreator({ userId: auth.id, isUpVote }),
      );
      await voteThreadComment({
        threadId: threadDetail.id,
        commentId,
        voteType,
      });
    } catch (e) {
      alert(e.message);
    }
  };
}

async function asyncAddCommentThreadDetail({ content }) {
  return async (dispatch, getState) => {
    const { threadDetail } = getState();
    try {
      const comment = await createComment({
        threadId: threadDetail.id,
        content,
      });
      dispatch(addCommentThreadDetailActionCreator({ comment }));
    } catch (e) {
      alert(e.message);
    }
  };
}

export {
  ThreadDetailActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  toggleVoteThreadDetailActionCreator,
  toggleVoteCommentThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncToggleVoteThreadDetail,
  asyncToggleVoteCommentThreadDetail,
  asyncAddCommentThreadDetail,
};
