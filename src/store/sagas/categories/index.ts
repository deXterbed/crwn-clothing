import { takeLatest, all, call, put } from 'typed-redux-saga';
import { getCollectionAndDocuments } from '../../../utils/firebase';
import { CATEGORIES_ACTION_TYPES } from '../../reducers/categories/types';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from '../../reducers/categories/actions';

export function* fetchCategories() {
  try {
    const categories = yield* call(getCollectionAndDocuments, 'categories');
    yield* put(fetchCategoriesSuccess(categories));
  } catch (error) {
    yield* put(fetchCategoriesFailed(error as Error));
  }
}

export function* onFetchCategories() {
  yield* takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategories
  );
}

export default function* categoriesSagas() {
  yield* all([call(onFetchCategories)]);
}