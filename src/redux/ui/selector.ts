import { StoreState } from "../type";

abstract class UISelectors {
    private static getState = (state: StoreState) => state.ui;

    public static getSnackbarConfig = (state: StoreState) => UISelectors.getState(state).snackbarConfig;
}

export default UISelectors;
