import { combineReducers } from "redux";
//
import appSlice from "./app/slice";
import { authReducer } from "./auth/slice";
import { StoreState } from "./type";
import { gridReducer } from "./grid/slice";

const rootReducer = combineReducers<StoreState>({
    app: appSlice.reducer,
    auth: authReducer,
    grid: gridReducer
});

export default rootReducer;
