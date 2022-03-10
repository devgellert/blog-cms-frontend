import { StoreState } from "../type";

abstract class AuthSelectors {
    private static getState = (state: StoreState) => state.auth;

    static isLoginInProgress = (state: StoreState) => AuthSelectors.getState(state).isLoginInProgress;
}

export default AuthSelectors;
