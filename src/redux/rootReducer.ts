import appSlice from "../app/redux/slice";
import {combineReducers} from "redux";
import {StoreState} from "./type";


const rootReducer = combineReducers<StoreState>({
    app: appSlice.reducer
})


export default rootReducer;