import { CategoriesActionType } from "./action";

function categoriesReducer(categories = [], action = {}) {
  switch (action.type) {
    case CategoriesActionType.RECEIVE_CATEGORIES:
      return [
        ...new Set(action.payload.threads.map((thread) => thread.category)),
      ];
    case CategoriesActionType.ADD_CATEGORIES:
      return [action.payload.category, ...categories];
    default:
      return categories;
  }
}

export default categoriesReducer;
