import { getProfile } from "../../utils/api";
import { setAuthActionCreator } from "../auth/action";

const PreloadActionType = {
  SET_IS_PRELOAD: "SET_IS_PRELOAD",
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: PreloadActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    try {
      const authUser = await getProfile();
      dispatch(setAuthActionCreator(authUser));
    } catch (error) {
      dispatch(setAuthActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }
  };
}

export { PreloadActionType, setIsPreloadActionCreator, asyncPreloadProcess };
