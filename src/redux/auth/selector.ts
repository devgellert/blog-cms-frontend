import { StoreState } from "../type";

abstract class AuthSelectors {
    private static getState = (state: StoreState) => state.auth;

    static isLoginInProgress = (state: StoreState) => AuthSelectors.getState(state).isLoginInProgress;

    static getUser = (state: StoreState) => AuthSelectors.getState(state).user;
}

export default AuthSelectors;
