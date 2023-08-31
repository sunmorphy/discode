import {
  createComment,
  getDetailThread,
  voteThread,
  voteThreadComment,
  VoteType,
} from "../../utils/api";
import {
  hideLoadingActionCreator,
  showLoadingActionCreator,
} from "../loading/action";

const ThreadDetailActionType = {
  RECEIVE_THREAD_DETAIL: "RECEIVE_THREAD_DETAIL",
  CLEAR_THREAD_DETAIL: "CLEAR_THREAD_DETAIL",
  TOGGLE_VOTE_THREAD_DETAIL: "TOGGLE_VOTE_THREAD_DETAIL",
  TOGGLE_VOTE_COMMENT_THREAD_DETAIL: "TOGGLE_VOTE_COMMENT_THREAD_DETAIL",
  ADD_COMMENT_THREAD_DETAIL: "ADD_COMMENT_THREAD_DETAIL",
};

function receiveThreadDetailActionCreator(detailThread) {
  return {
    type: ThreadDetailActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      detailThread,
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

function toggleVoteCommentThreadDetailActionCreator({
  userId,
  commentId,
  isUpVote,
}) {
  return {
    type: ThreadDetailActionType.TOGGLE_VOTE_COMMENT_THREAD_DETAIL,
    payload: {
      userId,
      commentId,
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

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());
    dispatch(clearThreadDetailActionCreator());
    try {
      const detailThread = await getDetailThread({ threadId });
      dispatch(receiveThreadDetailActionCreator(detailThread));
    } catch (error) {
      throw error.message;
    } finally {
      dispatch(hideLoadingActionCreator());
    }
  };
}

function asyncToggleVoteThreadDetail({ isUpVote }) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    let voteType = VoteType.UP_VOTE;

    if (isUpVote === null) {
      voteType = VoteType.NEUTRALIZE_VOTE;
    } else if (!isUpVote) {
      voteType = VoteType.DOWN_VOTE;
    }

    dispatch(
      toggleVoteThreadDetailActionCreator({
        userId: authUser.id,
        isUpVote,
      }),
    );

    try {
      await voteThread({
        threadId: detailThread.id,
        voteType,
      });
    } catch (error) {
      dispatch(
        toggleVoteThreadDetailActionCreator({
          userId: authUser.id,
          isUpVote,
        }),
      );
      throw error.message;
    }
  };
}

function asyncToggleVoteCommentThreadDetail({ commentId, isUpVote }) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    let voteType = VoteType.UP_VOTE;

    if (isUpVote === null) {
      voteType = VoteType.NEUTRALIZE_VOTE;
    } else if (!isUpVote) {
      voteType = VoteType.DOWN_VOTE;
    }

    dispatch(
      toggleVoteCommentThreadDetailActionCreator({
        userId: authUser.id,
        commentId,
        isUpVote,
      }),
    );

    try {
      await voteThreadComment({
        threadId: detailThread.id,
        commentId,
        voteType,
      });
    } catch (error) {
      dispatch(
        toggleVoteCommentThreadDetailActionCreator({
          userId: authUser.id,
          commentId,
          isUpVote,
        }),
      );
      throw error.message;
    }
  };
}

function asyncAddCommentThreadDetail({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoadingActionCreator());
    try {
      const comment = await createComment({
        threadId,
        content,
      });
      dispatch(addCommentThreadDetailActionCreator({ comment }));
    } catch (error) {
      throw error.message;
    } finally {
      dispatch(hideLoadingActionCreator());
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
