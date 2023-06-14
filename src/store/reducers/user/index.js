export const USER_ACTION_TYPES = {
  CHECK_USER_SESSION: "CHECK_USER_SESSION",
  GOOGLE_SIGN_IN_START: "GOOGLE_SIGN_IN_START",
  EMAIL_SIGN_IN_START: "EMAIL_SIGN_IN_START",
  EMAIL_SIGN_UP_START: "EMAIL_SIGN_UP_START",
  SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
  SIGN_IN_FAILED: "SIGN_IN_FAILED",
  SIGN_OUT_START: "SIGN_OUT_START",
  SIGN_OUT_SUCCESS: "SIGN_OUT_SUCCESS",
  SIGN_OUT_FAILED: "SIGN_OUT_FAILED",
};

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.CHECK_USER_SESSION:
    case USER_ACTION_TYPES.GOOGLE_SIGN_IN_START:
    case USER_ACTION_TYPES.EMAIL_SIGN_IN_START:
    case USER_ACTION_TYPES.EMAIL_SIGN_UP_START:
    case USER_ACTION_TYPES.SIGN_OUT_START:
      return { ...state, isLoading: true };
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
      return { ...state, isLoading: false, error: payload };
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return { ...state, currentUser: payload, isLoading: false, error: null };
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return { ...state, currentUser: null, isLoading: false, error: null };
    default:
      return state;
  }
};

export const signInSuccess = (user) => {
  return {
    type: USER_ACTION_TYPES.SIGN_IN_SUCCESS,
    payload: user
  }
};

export const signInFailed = (error) => {
  return {
    type: USER_ACTION_TYPES.SIGN_IN_FAILED,
    payload: error
  }
}

export const googleSignInStart = () => {
  return {
    type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START
  }
}

export const emailSignInStart = (email, password) => {
  return {
    type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    payload: { email, password }
  }
}

export const emailSignUpStart = (email, password, displayName) => {
  return {
    type: USER_ACTION_TYPES.EMAIL_SIGN_UP_START,
    payload: { email, password, displayName }
  }
}

export const checkUserSession = () => {
  return {
    type: USER_ACTION_TYPES.CHECK_USER_SESSION
  }
}

export const signOutStart = () => {
  return {
    type: USER_ACTION_TYPES.SIGN_OUT_START
  }
}

export const signOutSuccess = () => {
  return {
    type: USER_ACTION_TYPES.SIGN_OUT_SUCCESS
  }
}

export const signOutFailed = (error) => {
  return {
    type: USER_ACTION_TYPES.SIGN_OUT_FAILED,
    payload: error
  }
}
