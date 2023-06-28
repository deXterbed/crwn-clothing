import { all, call } from 'typed-redux-saga';
import categoriesSagas from './categories';
import userSaga from './user';

export default function* rootSaga() {
  yield* all([
    call(categoriesSagas),
    call(userSaga)
  ]);
}