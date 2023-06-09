import { createContext, useEffect, useReducer } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase";

export const UserContext = createContext({
  setCurrentUser: () => { },
  currentUser: null
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER"
};

const INITIAL_STATE = {
  currentUser: null
};

const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribeFromAuth = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribeFromAuth
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
