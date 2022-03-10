import { AppState } from "./app/types";
import { AuthState } from "./auth/types";

export type StoreState = {
    app: AppState;
    auth: AuthState;
};
