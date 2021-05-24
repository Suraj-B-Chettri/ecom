import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import { persistStore } from "redux-persist";

const sagaMiddleware = createSagaMiddleware();

export const middleWares = [thunk, sagaMiddleware, logger];

export const store = createStore(rootReducer, applyMiddleware(...middleWares));

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);

export default { store, persistor };
