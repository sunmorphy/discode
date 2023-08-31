const CategoriesActionType = {
  RECEIVE_CATEGORIES: "RECEIVE_CATEGORIES",
  ADD_CATEGORIES: "ADD_CATEGORIES",
};

function receiveCategoriesActionCreator(threads) {
  return {
    type: CategoriesActionType.RECEIVE_CATEGORIES,
    payload: {
      threads,
    },
  };
}

function addCategoriesActionCreator(category) {
  return {
    type: CategoriesActionType.ADD_CATEGORIES,
    payload: {
      category,
    },
  };
}

export {
  CategoriesActionType,
  receiveCategoriesActionCreator,
  addCategoriesActionCreator,
};
