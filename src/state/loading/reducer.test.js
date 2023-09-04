/**
 * test scenario for loadingReducer
 *
 * - loadingReducers function
 *  - should return the initial state when given by unknown action
 *  - should return true when given by SHOW_LOADING action
 *  - should return false when given by HIDE_LOADING action
 *
 */

import loadingReducer from "./reducer";

describe("loadingReducers function", () => {
  it("should return the initial state when given by unknown action", () => {
    // arrange
    const initialState = false;
    const action = { type: "UNKNOWN" };

    //action
    const nextState = loadingReducer(initialState, action);

    //assert
    expect(nextState).toEqual(initialState);
  });

  it("should return true when given by SHOW_LOADING action", () => {
    // arrange
    const initialState = false;
    const action = { type: "SHOW_LOADING" };

    //action
    const nextState = loadingReducer(initialState, action);

    //assert
    expect(nextState).toEqual(true);
  });

  it("should return false when given by HIDE_LOADING action", () => {
    // arrange
    const initialState = false;
    const action = { type: "HIDE_LOADING" };

    //action
    const nextState = loadingReducer(initialState, action);

    //assert
    expect(nextState).toEqual(false);
  });
});
