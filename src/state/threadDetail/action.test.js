/**
 * test scenario
 *
 * - asyncReceiveThreadDetail thunk
 *  - should dispatch action correctly when data fetching success
 *  - should throw message correctly when data fetching failed
 *
 * - asyncToggleVoteThreadDetail thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and throw message correctly when data fetching failed
 *
 * - asyncToggleVoteCommentThreadDetail thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and throw message correctly when data fetching failed
 *
 * - asyncAddCommentThreadDetail thunk
 *  - should dispatch action correctly when data fetching success
 *  - should throw message correctly when data fetching failed
 */

import api from "../../utils/api";
import {
  addCommentThreadDetailActionCreator,
  asyncAddCommentThreadDetail,
  asyncReceiveThreadDetail,
  asyncToggleVoteCommentThreadDetail,
  asyncToggleVoteThreadDetail,
  clearThreadDetailActionCreator,
  receiveThreadDetailActionCreator, toggleVoteCommentThreadDetailActionCreator,
  toggleVoteThreadDetailActionCreator,
} from "./action";
import {
  hideLoadingActionCreator,
  showLoadingActionCreator,
} from "../loading/action";

const fakeProfileResponse = {
  user: {
    id: "john_doe",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://generated-image-url.jpg",
  },
};

const fakeThreadDetailResponse = {
  detailThread: {
    id: "thread-1",
    title: "Thread Pertama",
    body: "Ini adalah thread pertama",
    category: "General",
    createdAt: "2021-06-21T07:00:00.000Z",
    owner: {
      id: "users-1",
      name: "John Doe",
      avatar: "https://generated-image-url.jpg",
    },
    upVotesBy: [],
    downVotesBy: [],
    comments: [
      {
        id: "comment-1",
        content: "Ini adalah komentar pertama",
        createdAt: "2021-06-21T07:00:00.000Z",
        owner: {
          id: "users-1",
          name: "John Doe",
          avatar: "https://generated-image-url.jpg",
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ],
  },
};

const fakeVoteThreadResponse = {
  vote: {
    id: "vote-1",
    userId: "users-1",
    threadId: "thread-1",
    voteType: 1,
  },
};

const fakeVoteThreadCommentResponse = {
  vote: {
    id: "vote-1",
    userId: "users-1",
    commentId: "comment-1",
    voteType: 1,
  },
};

const fakeCreateCommentResponse = {
  comment: {
    id: "comment-1",
    content: "Ini adalah komentar pertama",
    createdAt: "2021-06-21T07:00:00.000Z",
    upVotesBy: [],
    downVotesBy: [],
    owner: {
      id: "users-1",
      name: "John Doe",
      email: "john@example.com",
    },
  },
};

const fakeErrorResponse = new Error("Something went wrong");

describe("asyncReceiveThreadDetail thunk", () => {
  beforeEach(() => {
    // backup original implementation
    api._getDetailThread = api.getDetailThread;
  });

  afterEach(() => {
    // restore original implementation
    api.getDetailThread = api._getDetailThread;

    // delete backup
    delete api._getDetailThread;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    // stub implementation
    api.getDetailThread = () => Promise.resolve(fakeThreadDetailResponse);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncReceiveThreadDetail({ threadId: "thread-1" })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadDetailActionCreator(fakeThreadDetailResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });

  it("should throw message correctly when data fetching failed", async () => {
    // arrange
    // stub implementation
    api.getDetailThread = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();

    try {
      // action
      await asyncReceiveThreadDetail({ threadId: "thread-1" })(dispatch);
    } catch (e) {
      // assert
      expect(e).toEqual(fakeErrorResponse.message);
    }
  });
});

describe("asyncToggleVoteThreadDetail thunk", () => {
  beforeEach(() => {
    // backup original implementation
    api._VoteType = api.VoteType;
    api._voteThread = api.voteThread;
  });

  afterEach(() => {
    // restore original implementation
    api.VoteType = api._VoteType;
    api.voteThread = api._voteThread;

    // delete backup
    delete api._VoteType;
    delete api._voteThread;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    // stub implementation
    api.voteThread = () => Promise.resolve(fakeVoteThreadResponse);
    api.VoteType = () => ({
      UP_VOTE: "up-vote",
      DOWN_VOTE: "down-vote",
      NEUTRALIZE_VOTE: "neutral-vote",
    });
    // mock dispatch
    const dispatch = jest.fn();
    const getState = () => ({
      authUser: fakeProfileResponse.user,
      detailThread: fakeThreadDetailResponse.detailThread,
    });

    // action
    await asyncToggleVoteThreadDetail({ isUpVote: true })(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      toggleVoteThreadDetailActionCreator({ userId: "john_doe", isUpVote: true }),
    );
  });

  it("should dispatch action and throw message correctly when data fetching failed", async () => {
    // arrange
    // stub implementation
    api.voteThread = () => Promise.reject(fakeErrorResponse);
    api.VoteType = () => ({
      UP_VOTE: "up-vote",
      DOWN_VOTE: "down-vote",
      NEUTRALIZE_VOTE: "neutral-vote",
    });
    // mock dispatch
    const dispatch = jest.fn();
    const getState = () => ({
      authUser: fakeProfileResponse.user,
      detailThread: fakeThreadDetailResponse.detailThread,
    });

    try {
      // action
      await asyncToggleVoteThreadDetail({ isUpVote: true })(dispatch, getState);
    } catch (e) {
      // assert
      expect(dispatch).toHaveBeenCalledWith(
          toggleVoteThreadDetailActionCreator({ userId: "john_doe", isUpVote: true }),
      );
      expect(e).toEqual(fakeErrorResponse.message);
    }
  });
});

describe("asyncToggleVoteCommentThreadDetail thunk", () => {
  beforeEach(() => {
    // backup original implementation
    api._VoteType = api.VoteType;
    api._voteThreadComment = api.voteThreadComment;
  });

  afterEach(() => {
    // restore original implementation
    api.VoteType = api._VoteType;
    api.voteThreadComment = api._voteThreadComment;

    // delete backup
    delete api._VoteType;
    delete api._voteThreadComment;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    // stub implementation
    api.voteThreadComment = () =>
      Promise.resolve(fakeVoteThreadCommentResponse);
    api.VoteType = () => ({
      UP_VOTE: "up-vote",
      DOWN_VOTE: "down-vote",
      NEUTRALIZE_VOTE: "neutral-vote",
    });
    // mock dispatch
    const dispatch = jest.fn();
    const getState = () => ({
      authUser: fakeProfileResponse.user,
      detailThread: fakeThreadDetailResponse.detailThread,
    });

    // action
    await asyncToggleVoteCommentThreadDetail({
      commentId: "comment-1",
      isUpVote: true,
    })(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      toggleVoteCommentThreadDetailActionCreator({ userId: "john_doe", commentId: "comment-1", isUpVote: true }),
    );
  });

  it("should dispatch action and throw message correctly when data fetching failed", async () => {
    // arrange
    // stub implementation
    api.voteThreadComment = () => Promise.reject(fakeErrorResponse);
    api.VoteType = () => ({
      UP_VOTE: "up-vote",
      DOWN_VOTE: "down-vote",
      NEUTRALIZE_VOTE: "neutral-vote",
    });
    // mock dispatch
    const dispatch = jest.fn();
    const getState = () => ({
      authUser: fakeProfileResponse.user,
      detailThread: fakeThreadDetailResponse.detailThread,
    });

    try {
      // action
      await asyncToggleVoteCommentThreadDetail({
        commentId: "comment-1",
        isUpVote: true,
      })(dispatch, getState);
    } catch (e) {
      // assert
      expect(dispatch).toHaveBeenCalledWith(
          toggleVoteCommentThreadDetailActionCreator({ userId: "john_doe", commentId: "comment-1", isUpVote: true }),
      );
      expect(e).toEqual(fakeErrorResponse.message);
    }
  });
});

describe("asyncAddCommentThreadDetail thunk", () => {
  beforeEach(() => {
    // backup original implementation
    api._createComment = api.createComment;
  });

  afterEach(() => {
    // restore original implementation
    api.createComment = api._createComment;

    // delete backup
    delete api._createComment;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    // stub implementation
    api.createComment = () => Promise.resolve(fakeCreateCommentResponse);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncAddCommentThreadDetail({
      threadId: "thread-1",
      content: "content",
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator())
    expect(dispatch).toHaveBeenCalledWith(
        addCommentThreadDetailActionCreator({ comment: fakeCreateCommentResponse }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });

  it("should throw message correctly when data fetching failed", async () => {
    // arrange
    // stub implementation
    api.createComment = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();

    try {
      // action
      await asyncAddCommentThreadDetail({
        threadId: "thread-1",
        content: "content",
      })(dispatch);
    } catch (e) {
      // assert
      expect(e).toEqual(fakeErrorResponse.message);
    }
  });
});
