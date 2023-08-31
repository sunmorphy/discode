import { LoadingActionType } from "./action";

function loadingReducer(loading = false, action = {}) {
  switch (action.type) {
    case LoadingActionType.SHOW_LOADING:
      return true;
    case LoadingActionType.HIDE_LOADING:
      return false;
    default:
      return loading;
  }
}

export default loadingReducer;
