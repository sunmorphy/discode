/**
 * test scenario
 *
 * - asyncSetAuthUser thunk
 *  - should dispatch action correctly when data fetching success
 *  - should throw message correctly when data fetching failed
 */

import api from "../../utils/api";
import { asyncSetAuthUser, setAuthUserActionCreator } from "./action";
import {
  hideLoadingActionCreator,
  showLoadingActionCreator,
} from "../loading/action";

const fakeLoginResponse = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRpbWFzMiIsIm5hbWUiOiJEaW1hcyBTYXB1dHJhIiwicGhvdG8iOiJodHRwczovL3VpLWF2YXRhcnMuY29tL2FwaS8_bmFtZT1EaW1hcyBTYXB1dHJhJmJhY2tncm91bmQ9cmFuZG9tIiwiaXNfcGVybWFuZW50IjpmYWxzZSwiaWF0IjoxNjYzODQwNzY0fQ._HrzpinFYX_m9WfvM-lGCdVrnhnaGHhzt1e6eATE1Iw",
};

const fakeProfileResponse = {
  user: {
    id: "john_doe",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://generated-image-url.jpg",
  },
};

const fakeErrorResponse = new Error("Something went wrong");

describe("asyncSetAuthUser thunk", () => {
  beforeEach(() => {
    // backup original implementation
    api._login = api.login;
    api._putAccessToken = api.putAccessToken;
    api._getProfile = api.getProfile;
  });

  afterEach(() => {
    // restore original implementation
    api.login = api._login;
    api.putAccessToken = api._putAccessToken;
    api.getProfile = api._getProfile;

    // delete backup
    delete api._login;
    delete api._putAccessToken;
    delete api._getProfile;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.resolve(fakeLoginResponse);
    api.putAccessToken = () => Promise.resolve();
    api.getProfile = () => Promise.resolve(fakeProfileResponse);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncSetAuthUser({ email: "john@mail.com", password: "john123" })(
      dispatch,
    );

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeProfileResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });

  it("should throw message correctly when data fetching failed", async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.reject(fakeErrorResponse);
    api.putAccessToken = () => Promise.reject(fakeErrorResponse);
    api.getProfile = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();

    try {
      // action
      await asyncSetAuthUser({ email: "john@mail.com", password: "john123" })(
        dispatch,
      );
    } catch (e) {
      // assert
      expect(e).toEqual(fakeErrorResponse.message);
    }
  });
});
