import { AnyAction, applyMiddleware, compose, createStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
//
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import { StoreState } from "./type";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
    (typeof window !== "undefined" && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore<StoreState, AnyAction, any, any>(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

(store as any).sagaTask = sagaMiddleware.run(rootSaga);

export default store;
