import { combineReducers } from "redux";
//
import appSlice from "./app/slice";
import authSlice from "./auth/slice";
import { StoreState } from "./type";

const rootReducer = combineReducers<StoreState>({
    app: appSlice.reducer,
    auth: authSlice.reducer
});

export default rootReducer;
