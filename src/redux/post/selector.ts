import { StoreState } from "../type";

abstract class PostSelectors {
    private static getState = (state: StoreState) => state.post;

    public static getPost = (state: StoreState) => PostSelectors.getState(state).post;

    public static getPostTranslations = (state: StoreState) => PostSelectors.getState(state).postTranslations;

    public static isPostDetailsPageLoading = (state: StoreState) =>
        PostSelectors.getState(state).isPostDetailsPageLoading;
}

export default PostSelectors;
