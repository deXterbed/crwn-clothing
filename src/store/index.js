import { compose, legacy_createStore as createStore, applyMiddleware  } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import logger from "redux-logger";
import createSagaMiddleware from 'redux-saga'
// import thunk from "redux-thunk";
// import loggerMiddleware from "../middlewares/logger";
import rootReducer from "./reducers/root-reducer";
import rootSaga from './sagas/root-saga'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware].filter(Boolean);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancer = (
  process.env.NODE_ENV !== 'production' &&
  window &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

export const store = createStore(
  persistedReducer,
  undefined,
  composeEnhancer(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)