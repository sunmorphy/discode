/**
 * test scenario
 *
 * - asyncPopulateUsersThreadsAndLeaderboards thunk
 *  - should dispatch action correctly when data fetching success
 *  - should throw message correctly when data fetching failed
 */

import api from "../../utils/api";
import { asyncPopulateUsersThreadsAndLeaderboards } from "./action";
import { receiveUsersActionCreator } from "../users/action";
import { receiveThreadsActionCreator } from "../threads/action";
import { receiveTempThreadsActionCreator } from "../tempThreads/action";
import { receiveCategoriesActionCreator } from "../categories/action";
import { receiveLeaderboardsActionCreator } from "../leaderboards/action";

const fakeUsersResponse = {
  users: [
    {
      id: "john_doe",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://generated-image-url.jpg",
    },
    {
      id: "jane_doe",
      name: "Jane Doe",
      email: "jane@example.com",
      avatar: "https://generated-image-url.jpg",
    },
    {
      id: "fulan",
      name: "Si Fulan",
      email: "fulan@example.com",
      avatar: "https://generated-image-url.jpg",
    },
  ],
};

const fakeThreadsResponse = {
  threads: [
    {
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
    {
      id: "thread-2",
      title: "Thread Kedua",
      body: "Ini adalah thread kedua",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      ownerId: "users-2",
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    },
  ],
};

const fakeLeaderboardsResponse = {
  leaderboards: [
    {
      user: {
        id: "users-1",
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://generated-image-url.jpg",
      },
      score: 10,
    },
    {
      user: {
        id: "users-2",
        name: "Jane Doe",
        email: "jane@example.com",
        avatar: "https://generated-image-url.jpg",
      },
      score: 5,
    },
  ],
};

const fakeErrorResponse = new Error("Something went wrong");

describe("asyncPopulateUsersThreadsAndLeaderboards thunk", () => {
  beforeEach(() => {
    // backup original implementation
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;
    api._getLeaderboards = api.getLeaderboards;
  });

  afterEach(() => {
    // restore original implementation
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;
    api.getLeaderboards = api._getLeaderboards;

    // delete backup
    delete api._getAllUsers;
    delete api._getAllThreads;
    delete api._getLeaderboards;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncPopulateUsersThreadsAndLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      receiveUsersActionCreator(fakeUsersResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadsActionCreator(fakeThreadsResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(
      receiveTempThreadsActionCreator(fakeThreadsResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(
      receiveCategoriesActionCreator(fakeThreadsResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator(fakeLeaderboardsResponse),
    );
  });

  it("should throw message correctly when data fetching failed", async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();

    try {
      // action
      await asyncPopulateUsersThreadsAndLeaderboards()(dispatch);
    } catch (e) {
      // assert
      expect(e).toEqual(fakeErrorResponse.message);
    }
  });
});
