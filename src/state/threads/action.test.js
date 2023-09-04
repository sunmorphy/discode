/**
 * test scenario
 *
 * - asyncAddThread thunk
 *  - should dispatch action correctly when data fetching success
 *  - should throw message correctly when data fetching failed
 *
 * - asyncToggleVoteThread thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and throw message correctly when data fetching failed
 */

import api from "../../utils/api";
import {
  addThreadActionCreator,
  asyncAddThread,
  asyncToggleVoteThread,
  toggleVoteThreadActionCreator,
} from "./action";
import {
  hideLoadingActionCreator,
  showLoadingActionCreator,
} from "../loading/action";
import { addTempThreadActionCreator } from "../tempThreads/action";
import { addCategoriesActionCreator } from "../categories/action";

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

const fakeAddThreadResponse = {
  thread: {
    id: "thread-1",
    title: "Thread Pertama",
    body: "Ini adalah thread pertama",
    category: "General",
    createdAt: "2021-06-21T07:00:00.000Z",
    ownerId: "users-1",
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
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

const fakeErrorResponse = new Error("Something went wrong");

describe("asyncAddThread thunk", () => {
  beforeEach(() => {
    // backup original implementation
    api._createThread = api.createThread;
  });

  afterEach(() => {
    // restore original implementation
    api.createThread = api._createThread;

    // delete backup
    delete api._createThread;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    // stub implementation
    api.createThread = () => Promise.resolve(fakeAddThreadResponse);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncAddThread({
      title: "title",
      body: "body",
      category: "category",
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(dispatch).toHaveBeenCalledWith(
      addThreadActionCreator(fakeAddThreadResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(
      addTempThreadActionCreator(fakeAddThreadResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(
      addCategoriesActionCreator(fakeAddThreadResponse.category),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });

  it("should throw message correctly when data fetching failed", async () => {
    // arrange
    // stub implementation
    api.createThread = () => Promise.resolve(fakeAddThreadResponse);
    // mock dispatch
    const dispatch = jest.fn();

    try {
      // action
      await asyncAddThread({
        title: "title",
        body: "body",
        category: "category",
      })(dispatch);
    } catch (e) {
      // assert
      expect(e).toEqual(fakeErrorResponse.message);
    }
  });
});

describe("asyncToggleVoteThread thunk", () => {
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
    await asyncToggleVoteThread({ threadId: "thread-1", isUpVote: true })(
      dispatch,
      getState,
    );

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      toggleVoteThreadActionCreator({
        userId: "john_doe",
        threadId: "thread-1",
        isUpVote: true,
      }),
    );
  });

  it("should dispatch action and throw message correctly when data fetching failed", async () => {
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

    try {
      // action
      await asyncToggleVoteThread({ threadId: "thread-1", isUpVote: true })(
        dispatch,
        getState,
      );
    } catch (e) {
      // assert
      expect(dispatch).toHaveBeenCalledWith(
        toggleVoteThreadActionCreator({
          userId: "john_doe",
          threadId: "thread-1",
          isUpVote: true,
        }),
      );
      expect(e).toEqual(fakeErrorResponse.message);
    }
  });
});
