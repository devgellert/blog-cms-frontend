import { StoreState } from "../type";

abstract class CategorySelectors {
    private static getState = (state: StoreState) => state.category;

    static isCategoryCreatePageLoading = (state: StoreState) =>
        CategorySelectors.getState(state).isCategoryCreatePageLoading;

    static getParentCategories = (state: StoreState) => CategorySelectors.getState(state).parentCategories;

    static isCategoryDetailsLoading = (state: StoreState) => CategorySelectors.getState(state).isCategoryDetailsLoading;

    static getCategory = (state: StoreState) => CategorySelectors.getState(state).category;

    static getTranslations = (state: StoreState) => CategorySelectors.getState(state).translations;
}

export default CategorySelectors;
