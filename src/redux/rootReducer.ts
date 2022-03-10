import { combineReducers } from "redux";
//
import appSlice from "./app/slice";
import { authReducer } from "./auth/slice";
import { StoreState } from "./type";

const rootReducer = combineReducers<StoreState>({
    app: appSlice.reducer,
    auth: authReducer
});

export default rootReducer;
