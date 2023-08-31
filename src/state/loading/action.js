const LoadingActionType = {
  SHOW_LOADING: "SHOW_LOADING",
  HIDE_LOADING: "HIDE_LOADING",
};

function showLoadingActionCreator() {
  return {
    type: LoadingActionType.SHOW_LOADING,
  };
}

function hideLoadingActionCreator() {
  return {
    type: LoadingActionType.HIDE_LOADING,
  };
}

export {
  LoadingActionType,
  showLoadingActionCreator,
  hideLoadingActionCreator,
};
