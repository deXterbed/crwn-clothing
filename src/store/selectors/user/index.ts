import { createSelector } from "reselect";
import { RootState } from "../../reducers/root-reducer";
import { UserState } from "../../reducers/user";

const selectUser = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);