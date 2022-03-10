import { combineReducers } from "redux";
//
import appSlice from "../app/redux/slice";
import { StoreState } from "./type";

const rootReducer = combineReducers<StoreState>({
    app: appSlice.reducer
});

export default rootReducer;
