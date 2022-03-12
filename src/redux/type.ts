import { AppState } from "./app/types";
import { AuthState } from "./auth/types";
import { GridState } from "./grid/types";

export type StoreState = {
    app: AppState;
    auth: AuthState;
    grid: GridState;
};
