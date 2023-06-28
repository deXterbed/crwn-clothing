import { combineReducers } from "redux";
import { userReducer } from "./user";
import { cartReducer } from "./cart";
import { categoriesReducer } from "./categories";

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;