export const CATEGORIES_ACTION_TYPES = {
  SET_CATEGORIES: 'SET_CATEGORIES',
};

const INITIAL_STATE = {
  categories: []
};

export const categoriesReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
      return { ...state, categories: payload };
    default:
      return state;
  }
}

export const setCategories = (categories) => ({
  type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
  payload: categories
});