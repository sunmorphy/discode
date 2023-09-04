/**
 * test scenario
 *
 * - asyncRegisterUser thunk
 *  - should dispatch action correctly when data fetching success
 *  - should throw message correctly when data fetching failed
 */

import api from "../../utils/api";
import { asyncRegisterUser } from "./action";
import {
  hideLoadingActionCreator,
  showLoadingActionCreator,
} from "../loading/action";

const fakeRegisterResponse = {
  user: {
    id: "user-123",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://generated-image-url.jpg",
  },
};

const fakeErrorResponse = new Error("Something went wrong");

describe("asyncRegisterUser thunk", () => {
  beforeEach(() => {
    // backup original implementation
    api._register = api.register;
  });

  afterEach(() => {
    // restore original implementation
    api.register = api._register;

    // delete backup
    delete api._register;
  });

  it("should dispatch action correctly when data fetching success", async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.resolve(fakeRegisterResponse);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncRegisterUser({
      name: "john",
      email: "john@mail.com",
      password: "john123",
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });

  it("should throw message correctly when data fetching failed", async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();

    try {
      // action
      await asyncRegisterUser({
        name: "john",
        email: "john@mail.com",
        password: "john123",
      })(dispatch);
    } catch (e) {
      expect(e).toEqual(fakeErrorResponse.message);
    }
  });
});
