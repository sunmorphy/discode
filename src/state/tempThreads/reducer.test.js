/**
 * test scenario for tempThreadsReducer
 *
 * - tempThreadsReducers function
 *  - should return the initial state when given by unknown action
 *  - should return threads when given by RECEIVE_TEMP_THREADS action
 *  - should return threads when given by ADD_TEMP_THREAD action
 *
 */

import tempThreadsReducer from "./reducer";

describe("tempThreadsReducers function", () => {
  it("should return the initial state when given by unknown action", () => {
    // arrange
    const initialState = [];
    const action = { type: "UNKNOWN" };

    // action
    const nextState = tempThreadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should return threads when given by RECEIVE_TEMP_THREADS action", () => {
    // arrange
    const initialState = [];
    const action = {
      type: "RECEIVE_TEMP_THREADS",
      payload: {
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
      },
    };

    // action
    const nextState = tempThreadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it("should return threads when given by ADD_TEMP_THREAD action", () => {
    // arrange
    const initialState = [];
    const action = {
      type: "ADD_TEMP_THREAD",
      payload: {
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
      },
    };

    // action
    const nextState = tempThreadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });
});
