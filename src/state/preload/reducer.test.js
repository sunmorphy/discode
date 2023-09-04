/**
 * test scenario for preloadReducer
 *
 * - preloadReducers function
 *  - should return the initial state when given by unknown action
 *  - should return false when given by SET_IS_PRELOAD action
 *
 */

import preloadReducer from "./reducer";

describe("preloadReducers function", () => {
  it("should return the initial state when given by unknown action", () => {
    // arrange
    const initialState = true;
    const action = { type: "UNKNOWN" };

    // action
    const nextState = preloadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should return false when given by SET_IS_PRELOAD action", () => {
    // arrange
    const initialState = true;
    const action = {
      type: "SET_IS_PRELOAD",
      payload: {
        isPreload: false,
      },
    };

    // action
    const nextState = preloadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(false);
  });
});
