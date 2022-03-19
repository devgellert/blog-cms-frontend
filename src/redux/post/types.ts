import { ApiPost, ApiPostTranslation } from "../../types/api";

export type PostState = {
    post: ApiPost | null;
    postTranslations: ApiPostTranslation[] | null;
    //
    isPostDetailsPageLoading: boolean;
    isPostCreatePageLoading: boolean;
    isPostEditPageLoading: boolean;
    //
    isPostTranslationCreatePageLoading: boolean;
};
