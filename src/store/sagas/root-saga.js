import { all, call } from 'redux-saga/effects';
import categoriesSagas from './categories';
import userSaga from './user';

export default function* rootSaga() {
  yield all([
    call(categoriesSagas),
    call(userSaga)
  ]);
}