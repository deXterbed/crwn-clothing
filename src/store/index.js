import { compose, legacy_createStore as createStore, applyMiddleware  } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import logger from "redux-logger";
import rootReducer from "./root-reducer";

const middlewares = [logger];

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,
  undefined,
  compose(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store)