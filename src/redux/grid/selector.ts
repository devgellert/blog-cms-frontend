import { StoreState } from "../type";

abstract class GridSelectors {
    private static getState = (state: StoreState) => state.grid;

    static getRows = (state: StoreState) => GridSelectors.getState(state).rows;

    static getPagination = (state: StoreState) => GridSelectors.getState(state).pagination;
}

export default GridSelectors;
