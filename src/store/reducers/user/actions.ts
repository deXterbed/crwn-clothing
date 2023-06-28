import { USER_ACTION_TYPES } from "./types";
import { UserDocument } from "../../../utils/firebase";
import { createAction, Action, ActionWithPayload, withMatcher } from "../../utils/action";

type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, UserDocument>;
type SignInFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILED, Error>;
type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;
export type EmailSignInStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email: string, password: string }>;
export type EmailSignUpStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_UP_START, { email: string, password: string, displayName: string }>;
type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;
type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;
type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;
type SignOutFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAILED, Error>;

export const signInSuccess = withMatcher((user: UserDocument & {id: string}): SignInSuccess => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user));

export const signInFailed = withMatcher((error: Error): SignInFailed => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error));

export const googleSignInStart = withMatcher((): GoogleSignInStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START));

export const emailSignInStart = withMatcher((email: string, password: string): EmailSignInStart => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password }));

export const emailSignUpStart = withMatcher((email: string, password: string, displayName: string): EmailSignUpStart => createAction(USER_ACTION_TYPES.EMAIL_SIGN_UP_START, { email, password, displayName }));

export const checkUserSession = withMatcher((): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION));

export const signOutStart = withMatcher((): SignOutStart => createAction(USER_ACTION_TYPES.SIGN_OUT_START));

export const signOutSuccess = withMatcher((): SignOutSuccess => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS));

export const signOutFailed = withMatcher((error: Error): SignOutFailed => createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error));