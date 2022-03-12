import { StoreState } from "../type";

abstract class AuthSelectors {
    private static getState = (state: StoreState) => state.auth;

    static getLoginState = (state: StoreState) => AuthSelectors.getState(state).loginState;

    static getUser = (state: StoreState) => AuthSelectors.getState(state).user;
}

export default AuthSelectors;
