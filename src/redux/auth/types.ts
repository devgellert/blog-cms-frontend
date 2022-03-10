import { ApiUser } from "../../types/api";

export type AuthState = {
    user: ApiUser | null;
    isLoginInProgress: boolean;
};
