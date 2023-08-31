import { getProfile } from "../../utils/api";
import { setAuthUserActionCreator } from "../auth/action";

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
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      dispatch(setAuthUserActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }
  };
}

export { PreloadActionType, setIsPreloadActionCreator, asyncPreloadProcess };
