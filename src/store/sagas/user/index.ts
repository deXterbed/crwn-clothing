import { takeLatest, all, call, put } from 'typed-redux-saga/macro';
import {
  USER_ACTION_TYPES
} from '../../reducers/user/types';
import {
  signInFailed,
  signInSuccess,
  signOutSuccess,
  signOutFailed,
  EmailSignUpStart,
  EmailSignInStart
} from '../../reducers/user/actions';
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
  signOutAuthUser,
  signInWithGooglePopup,
  AdditionalData
 } from '../../../utils/firebase';
import { User } from 'firebase/auth';

function* getSnapshotFromUserAuth(userAuth: User, additionalData?: AdditionalData) {
  try {
    const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalData);
    if (!userSnapshot) return;
    yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

function* authenticateUser() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

function* signUpWithEmailAndPassword({ payload: { email, password, displayName } }: EmailSignUpStart) {
  try {
    const user = yield* call(createAuthUserWithEmailAndPassword, email, password);
    if (!user) return;
    yield* call(getSnapshotFromUserAuth, user, { displayName });
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

function* signInWithEmailAndPassword({ payload: { email, password } }: EmailSignInStart) {
  try {
    const user = yield* call(signInAuthUserWithEmailAndPassword, email, password);
    if (!user) return;
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

function* signOut() {
  try {
    yield* call(signOutAuthUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}

function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, authenticateUser);
}

function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmailAndPassword);
}

function* onEmailSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_UP_START, signUpWithEmailAndPassword);
}

function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export default function* userSaga() {
  yield* all([
    call(onCheckUserSession),
    call(onEmailSignInStart),
    call(onEmailSignUpStart),
    call(onGoogleSignInStart),
    call(onSignOutStart)
  ]);
}