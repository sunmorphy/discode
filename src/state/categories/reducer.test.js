/**
 * test scenario for categoriesReducer
 *
 * - categoriesReducers function
 *  - should return the initial state when given by unknown action
 *  - should return categories when given by RECEIVE_CATEGORIES action
 *  - should return categories when given by ADD_CATEGORIES action
 *
 */

import categoriesReducer from "./reducer";

describe("categoriesReducers function", () => {
  it("should return the initial state when given by unknown action", () => {
    // arrange
    const initialState = [];
    const action = { type: "UNKNOWN" };

    //action
    const nextState = categoriesReducer(initialState, action);

    //assert
    expect(nextState).toEqual(initialState);
  });

  it("should return categories when given by RECEIVE_CATEGORIES action", () => {
    // arrange
    const initialState = [];
    const action = {
      type: "RECEIVE_CATEGORIES",
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

    //action
    const nextState = categoriesReducer(initialState, action);

    //assert
    expect(nextState).toEqual([
      ...new Set(action.payload.threads.map((thread) => thread.category)),
    ]);
  });

  it("should return categories when given by ADD_CATEGORIES action", () => {
    // arrange
    const initialState = [];
    const action = {
      type: "ADD_CATEGORIES",
      payload: {
        category: "General",
      },
    };

    //action
    const nextState = categoriesReducer(initialState, action);

    //assert
    expect(nextState).toEqual([action.payload.category, ...initialState]);
  });
});
