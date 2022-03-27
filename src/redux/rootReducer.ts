import { combineReducers } from "redux";
//
import appSlice from "./app/slice";
import { authReducer } from "./auth/slice";
import { StoreState } from "./type";
import { gridReducer } from "./grid/slice";
import { categoryReducer } from "./category/slice";
import { uiReducer } from "./ui/slice";
import { postReducer } from "./post/slice";
import { dashboardReducer } from "./dashboard/slice";

const rootReducer = combineReducers<StoreState>({
    app: appSlice.reducer,
    auth: authReducer,
    grid: gridReducer,
    category: categoryReducer,
    post: postReducer,
    ui: uiReducer,
    dashboard: dashboardReducer
});

export default rootReducer;
