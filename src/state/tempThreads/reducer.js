import { TempThreadActionType } from "./action";

function tempThreadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case TempThreadActionType.RECEIVE_TEMP_THREADS:
      return action.payload.threads;
    case TempThreadActionType.ADD_TEMP_THREAD:
      return [action.payload.thread, ...threads];
    default:
      return threads;
  }
}

export default tempThreadsReducer;
