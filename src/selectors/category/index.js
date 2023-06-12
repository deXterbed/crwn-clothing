import { createSelector } from 'reselect';

export const selectCategories = (state) => state.categories.categories;

export const selectCategoryMap = createSelector(
  [selectCategories],
  (categories) => {
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
  }
);