import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/reducer";
import preloadReducer from "./preload/reducer";
import usersReducer from "./users/reducer";
import threadsReducer from "./threads/reducer";
import threadDetailReducer from "./threadDetail/reducer";
import leaderboardsReducer from "./leaderboards/reducer";
import categoriesReducer from "./categories/reducer";
import tempThreadsReducer from "./tempThreads/reducer";
import loadingReducer from "./loading/reducer";

const store = configureStore({
  reducer: {
    authUser: authReducer,
    isPreload: preloadReducer,
    users: usersReducer,
    threads: threadsReducer,
    tempThreads: tempThreadsReducer,
    categories: categoriesReducer,
    detailThread: threadDetailReducer,
    leaderboards: leaderboardsReducer,
    loading: loadingReducer,
  },
});

export default store;
