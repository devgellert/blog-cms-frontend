import { ApiUser } from "../../types/api";

export enum LoginState {
    IN_PROGRESS,
    REFRESHING,
    LOGGED_IN,
    LOGGED_OUT
}

export type AuthState = {
    user: ApiUser | null;
    loginState: LoginState;
};
