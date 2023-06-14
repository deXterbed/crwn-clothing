import { takeLatest, all, call, put } from 'redux-saga/effects';
import { getCollectionAndDocuments } from '../../../utils/firebase';
import { CATEGORIES_ACTION_TYPES } from '../../reducers/categories';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from '../../reducers/categories';

export function* fetchCategories() {
  try {
    const categories = yield call(getCollectionAndDocuments, 'categories');
    yield put(fetchCategoriesSuccess(categories));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategories
  );
}

export default function* categoriesSagas() {
  yield all([call(onFetchCategories)]);
}