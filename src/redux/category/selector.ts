import { StoreState } from "../type";

abstract class CategorySelectors {
    private static getState = (state: StoreState) => state.category;

    static isCategoryCreatePageLoading = (state: StoreState) =>
        CategorySelectors.getState(state).isCategoryCreatePageLoading;

    static getParentCategories = (state: StoreState) => CategorySelectors.getState(state).parentCategories;
}

export default CategorySelectors;
