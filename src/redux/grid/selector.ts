import { StoreState } from "../type";

abstract class GridSelectors {
    private static getState = (state: StoreState) => state.grid;

    static getRows = (state: StoreState) => GridSelectors.getState(state).rows;
}

export default GridSelectors;
