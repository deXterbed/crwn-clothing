import { takeLatest, all, call, put } from 'redux-saga/effects';
import {
  USER_ACTION_TYPES,
  signInFailed,
  signInSuccess,
  signOutSuccess,
  signOutFailed
} from '../../reducers/user';
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
  signOutAuthUser,
  signInWithGooglePopup
 } from '../../../utils/firebase';

function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalData);
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* authenticateUser() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* signUpWithEmailAndPassword({ payload: { email, password, displayName } }) {
  try {
    const user = yield call(createAuthUserWithEmailAndPassword, email, password);
    yield call(getSnapshotFromUserAuth, user, { displayName });
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* signInWithEmailAndPassword({ payload: { email, password } }) {
  try {
    const user = yield call(signInAuthUserWithEmailAndPassword, email, password);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* signOut() {
  try {
    yield call(signOutAuthUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, authenticateUser);
}

function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmailAndPassword);
}

function* onEmailSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_UP_START, signUpWithEmailAndPassword);
}

function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export default function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onEmailSignInStart),
    call(onEmailSignUpStart),
    call(onGoogleSignInStart),
    call(onSignOutStart)
  ]);
}