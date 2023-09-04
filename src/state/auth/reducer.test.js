/**
 * test scenario for authReducer
 *
 * - authReducers function
 *  - should return the initial state when given by unknown action
 *  - should return authUser when given by SET_AUTH_USER action
 *  - should return null when given by UNSET_AUTH_USER action
 *
 */

import authReducer from "./reducer";

describe("authReducers function", () => {
  it("should return the initial state when given by unknown action", () => {
    // arrange
    const initialState = null;
    const action = { type: "UNKNOWN" };

    // action
    const nextState = authReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should return the authUser when given by SET_AUTH_USER action", () => {
    // arrange
    const initialState = null;
    const action = {
      type: "SET_AUTH_USER",
      payload: {
        authUser: {
          id: "john_doe",
          name: "John Doe",
          email: "john@example.com",
          avatar: "https://generated-image-url.jpg",
        },
      },
    };

    // action
    const nextState = authReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });

  it("should return null when given by UNSET_AUTH_USER action", () => {
    // arrange
    const initialState = null;
    const action = { type: "UNSET_AUTH_USER" };

    // action
    const nextState = authReducer(initialState, action);

    // assert
    expect(nextState).toEqual(null);
  });
});
