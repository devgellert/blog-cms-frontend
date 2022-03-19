import { StoreState } from "../type";

abstract class CategorySelectors {
    private static getState = (state: StoreState) => state.category;

    static getCategoryOptions = (state: StoreState) => CategorySelectors.getState(state).categoryOptions;

    static getCategory = (state: StoreState) => CategorySelectors.getState(state).category;

    static getTranslations = (state: StoreState) => CategorySelectors.getState(state).translations;

    //

    static isCategoryDetailsLoading = (state: StoreState) => CategorySelectors.getState(state).isCategoryDetailsLoading;

    static isCategoryCreatePageLoading = (state: StoreState) =>
        CategorySelectors.getState(state).isCategoryCreatePageLoading;

    static isCategoryEditPageLoading = (state: StoreState) =>
        CategorySelectors.getState(state).isCategoryEditPageLoading;

    static isCategoryTranslationCreatePageLoading = (state: StoreState) =>
        CategorySelectors.getState(state).isCategoryTranslationCreatePageLoading;
}

export default CategorySelectors;
