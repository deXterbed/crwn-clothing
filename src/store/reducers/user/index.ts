import { AnyAction } from "redux";
import { UserDocument } from "../../../utils/firebase";
import {
  checkUserSession,
  googleSignInStart,
  emailSignInStart,
  emailSignUpStart,
  signOutStart,
  signInSuccess,
  signInFailed,
  signOutSuccess,
  signOutFailed
} from "./actions";

export type UserState = {
  readonly currentUser: UserDocument | null,
  readonly isLoading: boolean,
  readonly error: Error | null
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction): UserState => {
  if (checkUserSession.match(action) || googleSignInStart.match(action) || emailSignInStart.match(action) || emailSignUpStart.match(action) || signOutStart.match(action)) {
    return { ...state, isLoading: true };
  }
  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload, isLoading: false, error: null };
  }
  if (signInFailed.match(action) || signOutFailed.match(action)) {
    return { ...state, isLoading: false, error: action.payload };
  }
  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null, isLoading: false, error: null };
  }

  return state;
};
