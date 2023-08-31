const TempThreadActionType = {
  RECEIVE_TEMP_THREADS: "RECEIVE_TEMP_THREADS",
  ADD_TEMP_THREAD: "ADD_TEMP_THREAD",
};

function addTempThreadActionCreator(thread) {
  return {
    type: TempThreadActionType.ADD_TEMP_THREAD,
    payload: {
      thread,
    },
  };
}

function receiveTempThreadsActionCreator(threads) {
  return {
    type: TempThreadActionType.RECEIVE_TEMP_THREADS,
    payload: {
      threads,
    },
  };
}

export {
  TempThreadActionType,
  addTempThreadActionCreator,
  receiveTempThreadsActionCreator,
};
