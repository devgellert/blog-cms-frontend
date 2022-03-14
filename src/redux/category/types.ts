import { ApiCategory, ApiCategoryTranslation } from "../../types/api";

export type CategoryState = {
    isCategoryCreatePageLoading: boolean;
    parentCategories: null | ApiCategory[];
    category: null | ApiCategory;
    isCategoryDetailsLoading: boolean;
    translations: null | ApiCategoryTranslation[];
};

export type CreateNewCategoryPayload = { name: string; slug: string; parent: number | null };
