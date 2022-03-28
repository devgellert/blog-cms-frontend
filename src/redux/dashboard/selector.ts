import { StoreState } from "../type";

abstract class DashboardSelectors {
    private static getState = (state: StoreState) => state.dashboard;
    public static isLoading = (state: StoreState) => DashboardSelectors.getState(state).isLoading;
    public static getNumbers = (state: StoreState) => DashboardSelectors.getState(state).statistics.numbers;
    public static getErrors = (state: StoreState) => DashboardSelectors.getState(state).statistics.errors;
}

export default DashboardSelectors;
