/**
 * test scenario for threadDetailReducer
 *
 * - threadDetailReducers function
 *  - should return the initial state when given by unknown action
 *  - should return detailThread when given by RECEIVE_THREAD_DETAIL action
 *  - should return null when given by CLEAR_THREAD_DETAIL action
 *  - should return detailThread when given by TOGGLE_VOTE_THREAD_DETAIL action
 *  - should return detailThread when given by TOGGLE_VOTE_COMMENT_THREAD_DETAIL action
 *  - should return detailThread when given by ADD_COMMENT_THREAD_DETAIL action
 *
 */

import threadDetailReducer from "./reducer";

describe("detailThreadsReducers function", () => {
  it("should return the initial state when given by unknown action", () => {
    // arrange
    const initialState = null;
    const action = { type: "UNKNOWN" };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should return detailThread when given by RECEIVE_THREAD_DETAIL action", () => {
    // arrange
    const initialState = null;
    const action = {
      type: "RECEIVE_THREAD_DETAIL",
      payload: {
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
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.detailThread);
  });

  it("should return null when given by CLEAR_THREAD_DETAIL action", () => {
    // arrange
    const initialState = {
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
    };
    const action = { type: "CLEAR_THREAD_DETAIL" };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(null);
  });

  it("should return detailThread when given by TOGGLE_VOTE_THREAD_DETAIL action", () => {
    // arrange
    const initialState = {
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
    };
    const action = {
      type: "TOGGLE_VOTE_THREAD_DETAIL",
      payload: {
        userId: "users-1",
        isUpVote: true,
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: initialState.upVotesBy.includes(action.payload.userId)
        ? initialState.upVotesBy
        : initialState.upVotesBy.concat([action.payload.userId]),
      downVotesBy: initialState.downVotesBy.includes(action.payload.userId)
        ? initialState.downVotesBy.filter((id) => id !== action.payload.userId)
        : initialState.downVotesBy,
    });
  });

  it("should return detailThread when given by TOGGLE_VOTE_COMMENT_THREAD_DETAIL action", () => {
    // arrange
    const initialState = {
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
    };
    const action = {
      type: "TOGGLE_VOTE_COMMENT_THREAD_DETAIL",
      payload: {
        userId: "users-1",
        commentId: "comment-1",
        isUpVote: true,
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: initialState.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.includes(action.payload.userId)
              ? comment.upVotesBy
              : comment.upVotesBy.concat([action.payload.userId]),
            downVotesBy: comment.downVotesBy.includes(action.payload.userId)
              ? comment.downVotesBy.filter((id) => id !== action.payload.userId)
              : comment.downVotesBy,
          };
        }
      }),
    });
  });

  it("should return detailThread when given by ADD_COMMENT_THREAD_DETAIL action", () => {
    // arrange
    const initialState = {
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
    };
    const action = {
      type: "ADD_COMMENT_THREAD_DETAIL",
      payload: {
        comment: {
          id: "comment-2",
          content: "Ini adalah komentar kedua",
          createdAt: "2021-06-21T07:00:00.000Z",
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: "users-1",
            name: "John Doe",
            email: "john@example.com",
          },
        },
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [action.payload.comment, ...initialState.comments],
    });
  });
});
