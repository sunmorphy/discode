/**
 * test scenario
 *
 * - asyncPreloadProcess thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action correctly when data fetching failed
 */

import api from "../../utils/api";
import { asyncPreloadProcess, setIsPreloadActionCreator } from "./action";
import { setAuthUserActionCreator } from "../auth/action";

const fakeProfileResponse = {
  user: {
    id: "john_doe",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://generated-image-url.jpg",
  },
};

const fakeErrorResponse = new Error("Something went wrong");

describe("asyncPreloadProcess thunk", () => {
  beforeEach(() => {
    // backup original implementation
    api._getProfile = api.getProfile;
  });

  afterEach(() => {
    // restore original implementation
    api.getProfile = api._getProfile;

    // delete backup
    delete api._getProfile;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    // stub implementation
    api.getProfile = () => Promise.resolve(fakeProfileResponse);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeProfileResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
  });

  it("should dispatch action correctly when data fetching failed", async () => {
    // arrange
    // stub implementation
    api.getProfile = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
  });
});
